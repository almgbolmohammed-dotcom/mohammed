import { useState, useEffect } from "react";
import {
  useListIncome, useListRentals, useListExpenses, useListCars,
  useListContracts, useListMonthlyReports, useCreateMonthlyReport, useDeleteMonthlyReport,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BarChart3, TrendingUp, TrendingDown, Car, Trophy, RefreshCw, FileText, CalendarDays, Share2, Trash2, Copy, Check } from "lucide-react";
import { format, startOfMonth, endOfMonth, isWithinInterval } from "date-fns";
import { ar } from "date-fns/locale";

interface CarStat { plate: string; model: string; income: number; rentals: number; }

interface MonthlyReport {
  id: string;
  label: string;
  year: number;
  month: number;
  generatedAt: string;
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
  totalRentals: number;
  completedRentals: number;
  totalDebt: number;
  topCars: CarStat[];
  contractsCount: number;
}

function fmt(n: number) { return new Intl.NumberFormat("en-US").format(n); }

function MonthName(y: number, m: number) {
  return format(new Date(y, m, 1), "MMMM yyyy", { locale: ar });
}

export default function ReportsPage() {
  const queryClient = useQueryClient();
  const { data: incomeList = [] } = useListIncome();
  const { data: rentals = [] } = useListRentals();
  const { data: expenses = [] } = useListExpenses();
  const { data: cars = [] } = useListCars();
  const { data: apiContracts = [] } = useListContracts();
  const { data: apiReports = [], isLoading: reportsLoading } = useListMonthlyReports();
  const createMonthlyReport = useCreateMonthlyReport();
  const deleteMonthlyReport = useDeleteMonthlyReport();

  const reports = (apiReports as MonthlyReport[]).map(r => ({
    ...r,
    generatedAt: typeof r.generatedAt === "string" ? r.generatedAt : new Date(r.generatedAt).toISOString(),
    topCars: (r.topCars ?? []) as CarStat[],
  }));

  const [generating, setGenerating] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // One-time migration: move localStorage reports to API
  useEffect(() => {
    const migrated = localStorage.getItem("@reports_migrated_v1");
    if (migrated) return;
    try {
      const raw = localStorage.getItem("@car_rental_monthly_reports");
      if (!raw) { localStorage.setItem("@reports_migrated_v1", "1"); return; }
      const local: MonthlyReport[] = JSON.parse(raw);
      if (!local.length) { localStorage.setItem("@reports_migrated_v1", "1"); return; }
      (async () => {
        for (const r of local) {
          await fetch("/api/monthly-reports", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(r),
          });
        }
        await queryClient.invalidateQueries({ queryKey: ["/api/monthly-reports"] });
        localStorage.setItem("@reports_migrated_v1", "1");
      })();
    } catch { localStorage.setItem("@reports_migrated_v1", "1"); }
  }, [queryClient]);

  async function generateReport(year: number, month: number) {
    setGenerating(true);
    try {
      const start = startOfMonth(new Date(year, month));
      const end = endOfMonth(new Date(year, month));
      const inRange = (d: string | Date) => isWithinInterval(new Date(d), { start, end });

      const monthIncome = incomeList.filter(r => inRange(r.completedAt ?? r.createdAt ?? ""));
      const monthRentals = rentals.filter(r => inRange(r.startedAt));
      const monthCompleted = rentals.filter(r => r.status === "completed" && r.endedAt && inRange(r.endedAt));
      const monthExpenses = expenses.filter(e => inRange(e.date));

      const totalIncome = monthIncome.reduce((s, r) => s + r.totalAmount, 0);
      const totalExpenses = monthExpenses.reduce((s, e) => s + e.amount, 0);
      const netProfit = totalIncome - totalExpenses;

      const contractsCount = (apiContracts as { date: string }[]).filter(c => inRange(c.date)).length;

      const carMap = new Map<string, CarStat>();
      monthIncome.forEach(r => {
        const car = cars.find(c => c.plateNumber === r.carPlate);
        const existing = carMap.get(r.carPlate) || { plate: r.carPlate, model: car?.model || r.carModel || "", income: 0, rentals: 0 };
        existing.income += r.totalAmount;
        existing.rentals += 1;
        carMap.set(r.carPlate, existing);
      });
      const topCars = Array.from(carMap.values()).sort((a, b) => b.income - a.income).slice(0, 5);

      const id = `${year}-${String(month + 1).padStart(2, "0")}`;
      const report: MonthlyReport = {
        id,
        label: MonthName(year, month),
        year,
        month,
        generatedAt: new Date().toISOString(),
        totalIncome,
        totalExpenses,
        netProfit,
        totalRentals: monthRentals.length,
        completedRentals: monthCompleted.length,
        totalDebt: 0,
        topCars,
        contractsCount,
      };

      await createMonthlyReport.mutateAsync(report);
      setExpanded(id);
    } finally {
      setGenerating(false);
    }
  }

  function handleGenerate(year: number, month: number) {
    generateReport(year, month);
  }

  async function deleteReport(id: string) {
    await deleteMonthlyReport.mutateAsync({ id });
    if (expanded === id) setExpanded(null);
  }

  function buildReportText(report: MonthlyReport): string {
    const sign = report.netProfit >= 0 ? "+" : "";
    const lines = [
      `📊 تقرير شهر ${report.label}`,
      `━━━━━━━━━━━━━━━━━━━`,
      `💰 إجمالي الدخل:     ${fmt(report.totalIncome)} ر`,
      `💸 إجمالي المصروفات: ${fmt(report.totalExpenses)} ر`,
      `📈 صافي الربح:       ${sign}${fmt(report.netProfit)} ر`,
      `━━━━━━━━━━━━━━━━━━━`,
      `🚗 عدد التأجيرات:   ${report.totalRentals}`,
      `✅ مكتملة:          ${report.completedRentals}`,
      `📄 العقود:          ${report.contractsCount}`,
    ];
    if (report.topCars.length > 0) {
      lines.push(`━━━━━━━━━━━━━━━━━━━`);
      lines.push(`🏆 أكثر السيارات ربحاً:`);
      report.topCars.forEach((car, i) => {
        lines.push(`  ${i + 1}. ${car.model} (${car.plate}) — ${fmt(car.income)} ر`);
      });
    }
    lines.push(`━━━━━━━━━━━━━━━━━━━`);
    lines.push(`🕒 ${format(new Date(report.generatedAt), "dd/MM/yyyy HH:mm", { locale: ar })}`);
    return lines.join("\n");
  }

  async function shareReport(report: MonthlyReport) {
    const text = buildReportText(report);
    if (navigator.share) {
      try {
        await navigator.share({ title: `تقرير ${report.label}`, text });
        return;
      } catch { /* fall through */ }
    }
    // WhatsApp fallback
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encoded}`, "_blank");
  }

  async function copyReport(report: MonthlyReport) {
    const text = buildReportText(report);
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(report.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch { /* ignore */ }
  }

  const now = new Date();
  const thisYear = now.getFullYear();
  const thisMonth = now.getMonth();

  const [manualMonth, setManualMonth] = useState(String(thisMonth + 1));
  const [manualYear, setManualYear] = useState(String(thisYear));
  const manualMonthNum = Math.min(12, Math.max(1, parseInt(manualMonth) || 1)) - 1;
  const manualYearNum = parseInt(manualYear) || thisYear;

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">التقارير الشهرية</h2>
          <p className="text-muted-foreground mt-1">تقارير الأرباح والإحصائيات لكل شهر</p>
        </div>
        <Button onClick={() => handleGenerate(thisYear, thisMonth)} disabled={generating} className="gap-2">
          <RefreshCw className={`h-4 w-4 ${generating ? "animate-spin" : ""}`} />
          توليد تقرير هذا الشهر
        </Button>
      </div>

      {reports.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 border border-dashed rounded-xl text-muted-foreground">
          <FileText className="h-12 w-12" />
          <p className="text-lg">لا توجد تقارير محفوظة بعد</p>
          <p className="text-sm">اضغط "توليد تقرير هذا الشهر" لإنشاء أول تقرير</p>
          <Button onClick={() => handleGenerate(thisYear, thisMonth)} disabled={generating} className="gap-2 mt-2">
            <RefreshCw className={`h-4 w-4 ${generating ? "animate-spin" : ""}`} />
            توليد الآن
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {reports.map(report => (
            <Card key={report.id} className="border shadow-sm overflow-hidden">
              <CardHeader
                className="cursor-pointer hover:bg-muted/40 transition-colors"
                onClick={() => setExpanded(expanded === report.id ? null : report.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    <div>
                      <CardTitle className="text-lg">{report.label}</CardTitle>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        آخر تحديث: {format(new Date(report.generatedAt), "dd/MM/yyyy HH:mm", { locale: ar })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={report.netProfit >= 0 ? "default" : "destructive"} className="text-sm px-3 py-1">
                      {report.netProfit >= 0 ? "+" : ""}{fmt(report.netProfit)} ر
                    </Badge>
                    <Button
                      size="sm" variant="outline"
                      title="مشاركة عبر واتساب"
                      onClick={e => { e.stopPropagation(); shareReport(report); }}
                    >
                      <Share2 className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm" variant="outline"
                      title="نسخ التقرير"
                      onClick={e => { e.stopPropagation(); copyReport(report); }}
                    >
                      {copiedId === report.id
                        ? <Check className="h-3 w-3 text-green-600" />
                        : <Copy className="h-3 w-3" />}
                    </Button>
                    <Button
                      size="sm" variant="outline"
                      title="إعادة توليد"
                      onClick={e => { e.stopPropagation(); handleGenerate(report.year, report.month); }}
                      disabled={generating}
                    >
                      <RefreshCw className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm" variant="outline"
                      title="حذف التقرير"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/30"
                      onClick={e => { e.stopPropagation(); deleteReport(report.id); }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {expanded === report.id && (
                <CardContent className="pt-0 space-y-5">
                  <div className="h-px bg-border" />

                  {/* Summary numbers */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-3 border border-green-200 dark:border-green-800">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="text-xs text-muted-foreground">إجمالي الدخل</span>
                      </div>
                      <div className="text-2xl font-bold text-green-600">{fmt(report.totalIncome)}</div>
                      <div className="text-xs text-muted-foreground">ريال يمني</div>
                    </div>
                    <div className="bg-red-50 dark:bg-red-950/20 rounded-lg p-3 border border-red-200 dark:border-red-800">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingDown className="h-4 w-4 text-destructive" />
                        <span className="text-xs text-muted-foreground">إجمالي المصروفات</span>
                      </div>
                      <div className="text-2xl font-bold text-destructive">{fmt(report.totalExpenses)}</div>
                      <div className="text-xs text-muted-foreground">ريال يمني</div>
                    </div>
                    <div className={`rounded-lg p-3 border ${report.netProfit >= 0 ? "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800" : "bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800"}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className={`h-4 w-4 ${report.netProfit >= 0 ? "text-primary" : "text-orange-500"}`} />
                        <span className="text-xs text-muted-foreground">صافي الربح</span>
                      </div>
                      <div className={`text-2xl font-bold ${report.netProfit >= 0 ? "text-primary" : "text-orange-500"}`}>{fmt(report.netProfit)}</div>
                      <div className="text-xs text-muted-foreground">ريال يمني</div>
                    </div>
                    <div className="bg-muted/40 rounded-lg p-3 border">
                      <div className="flex items-center gap-2 mb-1">
                        <Car className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">عدد التأجيرات</span>
                      </div>
                      <div className="text-2xl font-bold">{report.totalRentals}</div>
                      <div className="text-xs text-muted-foreground">{report.completedRentals} مكتملة • {report.contractsCount} عقد</div>
                    </div>
                  </div>

                  {/* Top earning cars */}
                  {report.topCars.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-yellow-500" />
                        أكثر السيارات ربحاً
                      </h4>
                      <div className="space-y-2">
                        {report.topCars.map((car, i) => {
                          const maxIncome = report.topCars[0]?.income || 1;
                          const pct = Math.round((car.income / maxIncome) * 100);
                          return (
                            <div key={car.plate} className="flex items-center gap-3">
                              <div className={`text-sm font-bold w-6 text-center ${i === 0 ? "text-yellow-500" : i === 1 ? "text-gray-400" : i === 2 ? "text-amber-600" : "text-muted-foreground"}`}>
                                #{i + 1}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-medium truncate">{car.model} <span className="text-muted-foreground text-xs" dir="ltr">{car.plate}</span></span>
                                  <span className="text-sm font-bold text-green-600 shrink-0 mr-2">{fmt(car.income)} ر</span>
                                </div>
                                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                                  <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${pct}%` }} />
                                </div>
                              </div>
                              <div className="text-xs text-muted-foreground shrink-0">{car.rentals} تأجير</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {report.topCars.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">لا توجد بيانات دخل مسجلة لهذا الشهر</p>
                  )}
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Manual date entry */}
      <Card className="border-dashed">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-primary" />
            توليد تقرير لشهر محدد
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-3 flex-wrap">
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">الشهر (1–12)</label>
              <Input
                type="number" min="1" max="12"
                value={manualMonth}
                onChange={e => setManualMonth(e.target.value)}
                className="w-24 text-center"
                dir="ltr"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">السنة</label>
              <Input
                type="number" min="2020" max="2040"
                value={manualYear}
                onChange={e => setManualYear(e.target.value)}
                className="w-28 text-center"
                dir="ltr"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground opacity-0 select-none">توليد</label>
              <Button
                onClick={() => handleGenerate(manualYearNum, manualMonthNum)}
                disabled={generating || !manualYear || manualYear.length < 4}
                className="gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${generating ? "animate-spin" : ""}`} />
                توليد تقرير {MonthName(manualYearNum, manualMonthNum)}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
