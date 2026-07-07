import { useListRentals, useListCars } from "@workspace/api-client-react";
import type { Rental } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Phone, Clock, Car as CarIcon, User } from "lucide-react";
import { useWebCarPhotos } from "@/hooks/use-car-photos";
import { useLocation } from "wouter";

const GRACE_MS = 3 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;
const HOUR_MS = 60 * 60 * 1000;

function getRentalStatus(rental: Rental): {
  status: "overdue" | "critical" | "due-soon" | "ok";
  remainingHours: number;
  overdueHours: number;
  overdueDays: number;
} {
  if (!rental.plannedDays || rental.plannedDays <= 0) {
    return { status: "ok", remainingHours: 0, overdueHours: 0, overdueDays: 0 };
  }
  const dueMs = GRACE_MS + rental.plannedDays * DAY_MS;
  const elapsed = Date.now() - new Date(rental.startedAt).getTime();
  const remaining = dueMs - elapsed;

  if (remaining <= 0) {
    const overdueMs = Math.abs(remaining);
    return {
      status: "overdue",
      remainingHours: 0,
      overdueDays: Math.floor(overdueMs / DAY_MS),
      overdueHours: Math.floor((overdueMs % DAY_MS) / HOUR_MS),
    };
  }
  if (remaining <= 3 * HOUR_MS) return { status: "critical", remainingHours: Math.ceil(remaining / HOUR_MS), overdueHours: 0, overdueDays: 0 };
  if (remaining <= 12 * HOUR_MS) return { status: "due-soon", remainingHours: Math.ceil(remaining / HOUR_MS), overdueHours: 0, overdueDays: 0 };
  return { status: "ok", remainingHours: Math.ceil(remaining / HOUR_MS), overdueHours: 0, overdueDays: 0 };
}

function CarPhotoThumb({ carId }: { carId: number }) {
  const photos = useWebCarPhotos(carId);
  if (!photos.length) {
    return (
      <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center shrink-0">
        <CarIcon className="h-6 w-6 text-muted-foreground" />
      </div>
    );
  }
  return (
    <img src={photos[0]} alt="" className="w-16 h-16 rounded-lg object-cover shrink-0" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
  );
}

export default function AlertsPage() {
  const { data: rentals, isLoading } = useListRentals({ status: "active" });
  const [, navigate] = useLocation();

  const alertRentals = (rentals ?? [])
    .map(r => ({ rental: r, info: getRentalStatus(r) }))
    .filter(({ info }) => info.status !== "ok")
    .sort((a, b) => {
      const priority = { overdue: 0, critical: 1, "due-soon": 2, ok: 3 };
      return priority[a.info.status] - priority[b.info.status];
    });

  const overdue = alertRentals.filter(x => x.info.status === "overdue");
  const critical = alertRentals.filter(x => x.info.status === "critical");
  const soon = alertRentals.filter(x => x.info.status === "due-soon");

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">الأنشطة المنتهية</h2>
        <p className="text-muted-foreground mt-1">تنبيهات السيارات التي تقترب من موعد التسليم أو تجاوزته</p>
      </div>

      {isLoading ? (
        <div className="space-y-3">{[1,2,3].map(i=><Skeleton key={i} className="h-28"/>)}</div>
      ) : alertRentals.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-muted-foreground">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <AlertCircle className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-center font-medium">لا توجد تنبيهات حالياً</p>
          <p className="text-sm text-center">جميع التأجيرات النشطة في الوقت المحدد</p>
        </div>
      ) : (
        <div className="space-y-6">
          {overdue.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-destructive animate-pulse" />
                <h3 className="font-bold text-destructive text-lg">عقود متأخرة ({overdue.length})</h3>
              </div>
              {overdue.map(({ rental, info }) => (
                <AlertCard key={rental.id} rental={rental} info={info} onNavigate={() => navigate("/rentals")} />
              ))}
            </div>
          )}
          {critical.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-600 animate-pulse" />
                <h3 className="font-bold text-orange-600 text-lg">تسليم خلال 3 ساعات ({critical.length})</h3>
              </div>
              {critical.map(({ rental, info }) => (
                <AlertCard key={rental.id} rental={rental} info={info} onNavigate={() => navigate("/rentals")} />
              ))}
            </div>
          )}
          {soon.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-600" />
                <h3 className="font-bold text-yellow-700 text-lg">تسليم خلال 12 ساعة ({soon.length})</h3>
              </div>
              {soon.map(({ rental, info }) => (
                <AlertCard key={rental.id} rental={rental} info={info} onNavigate={() => navigate("/rentals")} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function AlertCard({ rental, info, onNavigate }: {
  rental: Rental;
  info: ReturnType<typeof getRentalStatus>;
  onNavigate: () => void;
}) {
  const borderClass = info.status === "overdue" ? "border-destructive ring-1 ring-destructive/30" :
    info.status === "critical" ? "border-orange-500 ring-1 ring-orange-500/30" : "border-yellow-400";

  const bannerClass = info.status === "overdue" ? "bg-destructive text-white" :
    info.status === "critical" ? "bg-orange-500 text-white" : "bg-yellow-400 text-yellow-900";

  return (
    <Card className={`overflow-hidden border-2 ${borderClass} shadow-md`}>
      <div className={`flex items-center gap-2 px-4 py-2 text-sm font-bold ${bannerClass}`}>
        <AlertCircle className="h-4 w-4 shrink-0 animate-pulse" />
        {info.status === "overdue" && (
          <span>⚠ متأخر{info.overdueDays > 0 && ` ${info.overdueDays} يوم`}{info.overdueHours > 0 && ` و${info.overdueHours} ساعة`} — يرجى المتابعة فوراً</span>
        )}
        {info.status === "critical" && <span>⚠ موعد التسليم خلال {info.remainingHours} ساعة فقط!</span>}
        {info.status === "due-soon" && <span>موعد التسليم خلال {info.remainingHours} ساعة</span>}
      </div>
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <CarPhotoThumb carId={rental.carId} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-lg">{rental.carModel}</span>
              <Badge variant="outline" className="text-xs">{rental.carPlate}</Badge>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <User className="h-3.5 w-3.5" />
              <span>{rental.customerName || "غير محدد"}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 shrink-0">
            {rental.customerPhone && (
              <a href={`tel:${rental.customerPhone}`}>
                <Button size="sm" className="gap-2 bg-green-600 hover:bg-green-700 text-white">
                  <Phone className="h-4 w-4" />
                  اتصال
                </Button>
              </a>
            )}
            <Button size="sm" variant="outline" onClick={onNavigate}>
              فتح التأجير
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
