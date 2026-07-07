import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { MainLayout } from "@/components/layout";
import Dashboard from "@/pages/dashboard";
import Cars from "@/pages/cars";
import Rentals from "@/pages/rentals";
import Income from "@/pages/income";
import Debts from "@/pages/debts";
import Accounts from "@/pages/accounts";
import Contracts from "@/pages/contracts";
import Alerts from "@/pages/alerts";
import Settings from "@/pages/settings";
import Reports from "@/pages/reports";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <MainLayout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/cars" component={Cars} />
        <Route path="/rentals" component={Rentals} />
        <Route path="/income" component={Income} />
        <Route path="/debts" component={Debts} />
        <Route path="/accounts" component={Accounts} />
        <Route path="/contracts" component={Contracts} />
        <Route path="/alerts" component={Alerts} />
        <Route path="/settings" component={Settings} />
        <Route path="/reports" component={Reports} />
        <Route component={NotFound} />
      </Switch>
    </MainLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
