import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import { MotionConfig } from "framer-motion";
import ErrorBoundary from "./components/ErrorBoundary";
import SiteSoundtrack from "./components/SiteSoundtrack";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Enosx from "./pages/Enosx";
import Posts from "./pages/Posts";
import PostDetail from "./pages/PostDetail";
import CaseStudyEditorialNoir from "./pages/CaseStudyEditorialNoir";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/enosx" component={Enosx} />
      <Route path="/enosx/case-studies/editorial-noir" component={CaseStudyEditorialNoir} />
      <Route path="/posts/:slug" component={PostDetail} />
      <Route path="/posts" component={Posts} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    document.documentElement.classList.add("lumora-theme");
    return () => document.documentElement.classList.remove("lumora-theme");
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <MotionConfig reducedMotion="user">
            <Toaster />
            <Router />
            <SiteSoundtrack />
          </MotionConfig>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
