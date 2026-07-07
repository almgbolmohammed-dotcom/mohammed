import { ReactNode, useEffect, useCallback } from "react";
import { Link, useLocation, useRouter } from "wouter";
import { Car, LayoutDashboard, Wallet, Receipt, Menu, Timer, AlertCircle, FileText, BarChart3, Settings, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Kbd } from "@/components/ui/kbd";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function MainLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const { navigate } = useRouter();

  const base = (p: string) => `${import.meta.env.BASE_URL}/${p}`.replace("//", "/");

  const navigation = [
    { name: "الرئيسية",            href: import.meta.env.BASE_URL, icon: LayoutDashboard, shortcut: "H" },
    { name: "السيارات",            href: base("cars"),      icon: Car,         shortcut: "C" },
    { name: "التأجيرات النشطة",    href: base("rentals"),   icon: Timer,        shortcut: "R" },
    { name: "الأنشطة المنتهية",    href: base("alerts"),    icon: AlertCircle,  shortcut: "A" },
    { name: "العقود",              href: base("contracts"), icon: FileText,     shortcut: "K" },
    { name: "الحسابات والمصروفات", href: base("accounts"),  icon: BarChart3,    shortcut: "E" },
    { name: "الدخل",               href: base("income"),    icon: Wallet,       shortcut: "I" },
    { name: "المديونية",           href: base("debts"),     icon: Receipt,      shortcut: "D" },
    { name: "التقارير",            href: base("reports"),   icon: TrendingUp,   shortcut: "P" },
    { name: "الإعدادات",          href: base("settings"),  icon: Settings,     shortcut: "S" },
  ];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!e.altKey) return;
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      const key = e.key.toUpperCase();
      const match = navigation.find((item) => item.shortcut === key);
      if (match) {
        e.preventDefault();
        navigate(match.href);
      }
    },
    [navigate]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const NavLinks = ({ onNavigate }: { onNavigate?: () => void }) => (
    <>
      {navigation.map((item) => {
        const isActive = location === item.href;
        return (
          <Tooltip key={item.name} delayDuration={400}>
            <TooltipTrigger asChild>
              <Link
                href={item.href}
                onClick={onNavigate}
                className={`flex items-center justify-between gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-secondary text-secondary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <span className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 shrink-0" />
                  {item.name}
                </span>
                <Kbd className="text-[10px] opacity-50 shrink-0 hidden md:inline-flex">
                  Alt+{item.shortcut}
                </Kbd>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="left" className="text-xs">
              اختصار: Alt+{item.shortcut}
            </TooltipContent>
          </Tooltip>
        );
      })}
    </>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row rtl text-right">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 bg-card border-b sticky top-0 z-10">
        <h1 className="text-xl font-bold text-primary tracking-tight">نظام التأجير</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 p-4 rtl">
            <h2 className="text-xl font-bold text-primary mb-1 mt-4">القائمة</h2>
            <p className="text-xs text-muted-foreground mb-4">Alt+حرف للتنقل السريع</p>
            <nav className="flex flex-col gap-2">
              <NavLinks />
            </nav>
          </SheetContent>
        </Sheet>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-card border-l sticky top-0 h-screen overflow-y-auto">
        <div className="p-6 pb-3">
          <h1 className="text-2xl font-bold text-primary tracking-tight">نظام التأجير</h1>
          <p className="text-xs text-muted-foreground mt-1">Alt+حرف للتنقل السريع</p>
        </div>
        <nav className="flex-1 px-4 pb-4 flex flex-col gap-1">
          <NavLinks />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
