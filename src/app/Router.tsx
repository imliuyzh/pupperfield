import LoginPage from "@/app/pages/LoginPage";
import useUserStore from "@/stores/UserStore";
import { lazy, Suspense } from "react";
import type { RouteProps } from "wouter";
import {
  Redirect,
  Route,
  Switch,
  Router as Wouter
} from "wouter";
import { useHashLocation } from "wouter/use-hash-location";

const ErrorPage = lazy(() => import("@/app/pages/ErrorPage")),
  FavoritesPage = lazy(() => import("@/app/pages/FavoritesPage")),
  HomePage = lazy(() => import("@/app/pages/HomePage"));

function PrivateRoute({ component, path }: RouteProps) {
  const email = useUserStore(state => state.email),
    name = useUserStore(state => state.name);

  if (email === null || name === null) {
    return (
      <Route path={path}>
        <Redirect replace to="/login" />
      </Route>
    );
  }
  return <Route component={component} path={path} />;
}

export default function Router() {
  return (
    <Wouter hook={useHashLocation}>
      <Suspense fallback={null}>
        <Switch>
          <PrivateRoute component={FavoritesPage} path="/favorites" />
          <Route component={LoginPage} path="/login" />
          <PrivateRoute component={HomePage} path="/" />
          <Route component={ErrorPage} path="*" />
        </Switch>
      </Suspense>
    </Wouter>
  );
}