import { ThemeProvider } from "@components/ThemeProvider/ThemeProvider";
import LoginPage from "@pages/LoginPage/LoginPage";
import { lazy, Suspense } from "react";
import { Route, Router, Switch } from "wouter";
import { useBrowserLocation } from "wouter/use-browser-location";

const ErrorPage = lazy(() => import("@pages/ErrorPage/ErrorPage")),
  FavoritesPage = lazy(() => import("@pages/FavoritesPage/FavoritesPage")),
  HomePage = lazy(() => import("@pages/HomePage/HomePage"));

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router base={import.meta.env.BASE_URL} hook={useBrowserLocation}>
        <Suspense fallback={null}>
          <Switch>
            <Route component={FavoritesPage} path="/favorites" />
            <Route component={LoginPage} path="/login" />
            <Route component={HomePage} path="/" />
            <Route component={ErrorPage} path="*" />
          </Switch>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}