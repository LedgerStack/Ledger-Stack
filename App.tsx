import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";

import Home from "@/pages/home";
import Product from "@/pages/product";
import HowItWorks from "@/pages/how-it-works";
import Docs from "@/pages/docs";
import Status from "@/pages/status";
import About from "@/pages/about";
import AppCheck from "@/pages/app";
import Report from "@/pages/report";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/product" component={Product} />
        <Route path="/how-it-works" component={HowItWorks} />
        <Route path="/docs" component={Docs} />
        <Route path="/docs/:subpage" component={Docs} />
        <Route path="/status" component={Status} />
        <Route path="/about" component={About} />
        <Route path="/app" component={AppCheck} />
        <Route path="/report/:id" component={Report} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
