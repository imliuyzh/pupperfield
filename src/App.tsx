import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import { ThemeProvider } from "@components/ThemeProvider/ThemeProvider";
import LoginPage from "@pages/LoginPage/LoginPage";
import { lazy, Suspense } from "react";
import { Route, Router, Switch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";

const ErrorPage = lazy(() => import("@pages/ErrorPage/ErrorPage")),
  FavoritesPage = lazy(() => import("@pages/FavoritesPage/FavoritesPage")),
  HomePage = lazy(() => import("@pages/HomePage/HomePage"));

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router hook={useHashLocation}>
        <Suspense fallback={null}>
          <Switch>
            <PrivateRoute component={FavoritesPage} path="/favorites" />
            <Route component={LoginPage} path="/login" />
            <PrivateRoute component={HomePage} path="/" />
            <Route component={ErrorPage} path="*" />
          </Switch>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}