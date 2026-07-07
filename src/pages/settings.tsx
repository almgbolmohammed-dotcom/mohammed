import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Settings as SettingsIcon, Building2, DollarSign, Bell, Shield, Moon, Sun, Save, Lock, Unlock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SETTINGS_KEY = "@car_rental_settings";
const PASSWORD_KEY = "@car_rental_password";

interface AppSettings {
  officeName: string;
  officePhone: string;
  officeAddress: string;
  currency: string;
  extraKmRate: number;
  lateHourRate: number;
  vatPercent: number;
  alertHours: number;
  dashboardWidget: string;
  darkMode: boolean;
  language: string;
}

const defaultSettings: AppSettings = {
  officeName: "مكتب تأجير السيارات",
  officePhone: "",
  officeAddress: "صنعاء، اليمن",
  currency: "ريال",
  extraKmRate: 1000,
  lateHourRate: 500,
  vatPercent: 0,
  alertHours: 12,
  dashboardWidget: "month",
  darkMode: false,
  language: "ar",
};

function loadSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? { ...defaultSettings, ...JSON.parse(raw) } : defaultSettings;
  } catch { return defaultSettings; }
}

function saveSettings(s: AppSettings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
}

function loadPassword(): string {
  return localStorage.getItem(PASSWORD_KEY) ?? "";
}

const EXPENSE_CATEGORIES: Record<string, string> = {
  salary: "رواتب",
  rent: "إيجار محل",
  utilities: "فواتير",
  parts: "قطع غيار",
  fuel: "وقود",
  insurance: "تأمين",
  other: "أخرى",
};

export default function SettingsPage() {
  const { toast } = useToast();
  const [settings, setSettings] = useState<AppSettings>(loadSettings);
  const [locked, setLocked] = useState(false);
  const [password, setPassword] = useState(loadPassword);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [unlockInput, setUnlockInput] = useState("");
  const [lockError, setLockError] = useState("");

  useEffect(() => {
    const savedPw = loadPassword();
    if (savedPw) setLocked(true);
  }, []);

  function unlock() {
    if (unlockInput === loadPassword()) {
      setLocked(false);
      setLockError("");
      setUnlockInput("");
    } else {
      setLockError("كلمة المرور غير صحيحة");
    }
  }

  function handleSave() {
    saveSettings(settings);
    toast({ title: "تم الحفظ", description: "تم حفظ الإعدادات بنجاح" });
  }

  function handleSetPassword() {
    if (!newPassword) {
      localStorage.removeItem(PASSWORD_KEY);
      setPassword("");
      toast({ title: "تم إزالة كلمة المرور" });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({ title: "خطأ", description: "كلمتا المرور لا تتطابقان", variant: "destructive" });
      return;
    }
    localStorage.setItem(PASSWORD_KEY, newPassword);
    setPassword(newPassword);
    setNewPassword("");
    setConfirmPassword("");
    toast({ title: "تم تعيين كلمة المرور" });
  }

  if (locked) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 animate-in fade-in">
        <div className="flex flex-col items-center gap-3 p-8 bg-card border rounded-2xl shadow-lg w-full max-w-sm">
          <Lock className="h-12 w-12 text-primary" />
          <h2 className="text-xl font-bold">الإعدادات محمية</h2>
          <p className="text-sm text-muted-foreground text-center">أدخل كلمة المرور للوصول</p>
          <Input
            type="password"
            placeholder="كلمة المرور"
            value={unlockInput}
            onChange={e => setUnlockInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && unlock()}
            className="text-center"
          />
          {lockError && <p className="text-destructive text-sm">{lockError}</p>}
          <Button className="w-full" onClick={unlock}>فتح الإعدادات</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">الإعدادات</h2>
          <p className="text-muted-foreground mt-1">ضبط تفضيلات المكتب والنظام</p>
        </div>
        <Button onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" />
          حفظ التغييرات
        </Button>
      </div>

      <Tabs defaultValue="general" dir="rtl">
        <TabsList className="flex flex-wrap gap-1 h-auto">
          <TabsTrigger value="general">المكتب والبيانات</TabsTrigger>
          <TabsTrigger value="pricing">التسعير والسياسات</TabsTrigger>
          <TabsTrigger value="notifications">التنبيهات</TabsTrigger>
          <TabsTrigger value="security">الأمان</TabsTrigger>
          <TabsTrigger value="interface">الواجهة</TabsTrigger>
        </TabsList>

        {/* General Info */}
        <TabsContent value="general" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Building2 className="h-4 w-4 text-primary" />
                بيانات المكتب
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">اسم المكتب</label>
                <Input value={settings.officeName} onChange={e => setSettings(s => ({ ...s, officeName: e.target.value }))} placeholder="مكتب تأجير السيارات" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">رقم التواصل</label>
                <Input value={settings.officePhone} onChange={e => setSettings(s => ({ ...s, officePhone: e.target.value }))} placeholder="+967..." dir="ltr" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">العنوان</label>
                <Input value={settings.officeAddress} onChange={e => setSettings(s => ({ ...s, officeAddress: e.target.value }))} placeholder="صنعاء، اليمن" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">العملة</label>
                <div className="flex gap-2 flex-wrap">
                  {["ريال", "دولار", "دينار", "درهم"].map(c => (
                    <Button key={c} variant={settings.currency === c ? "default" : "outline"} size="sm" onClick={() => setSettings(s => ({ ...s, currency: c }))}>{c}</Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pricing */}
        <TabsContent value="pricing" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <DollarSign className="h-4 w-4 text-primary" />
                التسعير والسياسات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">سعر كل 10 كيلو زائدة ({settings.currency})</label>
                <Input type="number" value={settings.extraKmRate} onChange={e => setSettings(s => ({ ...s, extraKmRate: parseInt(e.target.value) || 0 }))} dir="ltr" />
                <p className="text-xs text-muted-foreground mt-1">يُستخدم عند تجاوز الكيلومترات المسموح بها</p>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">رسوم التأخير بالساعة ({settings.currency})</label>
                <Input type="number" value={settings.lateHourRate} onChange={e => setSettings(s => ({ ...s, lateHourRate: parseInt(e.target.value) || 0 }))} dir="ltr" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">نسبة ضريبة القيمة المضافة (%)</label>
                <Input type="number" min="0" max="100" value={settings.vatPercent} onChange={e => setSettings(s => ({ ...s, vatPercent: parseFloat(e.target.value) || 0 }))} dir="ltr" />
                <p className="text-xs text-muted-foreground mt-1">اتركها 0 إذا لا تنطبق ضريبة</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Bell className="h-4 w-4 text-primary" />
                إعدادات التنبيهات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">نبّهني قبل انتهاء الإيجار بـ (ساعات)</label>
                <div className="flex gap-2 flex-wrap">
                  {[3, 6, 12, 24, 48].map(h => (
                    <Button key={h} variant={settings.alertHours === h ? "default" : "outline"} size="sm" onClick={() => setSettings(s => ({ ...s, alertHours: h }))}>{h} ساعة</Button>
                  ))}
                </div>
                <Input type="number" className="mt-2 w-32" value={settings.alertHours} onChange={e => setSettings(s => ({ ...s, alertHours: parseInt(e.target.value) || 12 }))} dir="ltr" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">عرض لوحة التحكم الرئيسية</label>
                <div className="flex gap-2 flex-wrap">
                  {[
                    { key: "today", label: "اليوم" },
                    { key: "yesterday", label: "أمس" },
                    { key: "week", label: "الأسبوع" },
                    { key: "month", label: "الشهر" },
                    { key: "year", label: "السنة" },
                  ].map(opt => (
                    <Button key={opt.key} variant={settings.dashboardWidget === opt.key ? "default" : "outline"} size="sm" onClick={() => setSettings(s => ({ ...s, dashboardWidget: opt.key }))}>{opt.label}</Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Shield className="h-4 w-4 text-primary" />
                كلمة المرور والأمان
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                {password ? <Lock className="h-4 w-4 text-green-600" /> : <Unlock className="h-4 w-4 text-muted-foreground" />}
                <span className="text-sm">{password ? "الإعدادات محمية بكلمة مرور" : "لا توجد كلمة مرور حالياً"}</span>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">كلمة المرور الجديدة</label>
                <Input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="اتركها فارغة لإزالة الحماية" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">تأكيد كلمة المرور</label>
                <Input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
              </div>
              <Button onClick={handleSetPassword} variant="outline" className="gap-2">
                <Lock className="h-4 w-4" />
                {password ? "تغيير كلمة المرور" : "تعيين كلمة المرور"}
              </Button>
              {password && (
                <Button variant="ghost" className="gap-2 text-destructive" onClick={() => { localStorage.removeItem(PASSWORD_KEY); setPassword(""); toast({ title: "تم إزالة كلمة المرور" }); }}>
                  <Unlock className="h-4 w-4" />
                  إزالة الحماية
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Interface */}
        <TabsContent value="interface" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Sun className="h-4 w-4 text-primary" />
                تخصيص الواجهة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">اللغة</label>
                <div className="flex gap-2">
                  <Button variant={settings.language === "ar" ? "default" : "outline"} size="sm" onClick={() => setSettings(s => ({ ...s, language: "ar" }))}>العربية</Button>
                  <Button variant={settings.language === "en" ? "default" : "outline"} size="sm" onClick={() => setSettings(s => ({ ...s, language: "en" }))}>English</Button>
                </div>
              </div>
              <div className="p-3 bg-muted rounded-lg text-sm text-muted-foreground">
                سيتم إضافة الوضع الليلي (Dark Mode) في تحديث قادم
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
