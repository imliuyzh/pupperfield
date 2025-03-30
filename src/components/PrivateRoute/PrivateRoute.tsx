import useUserStore from "@/stores/UserStore/UserStore";
import type { RouteProps } from "wouter";
import { Redirect, Route } from "wouter";

export default function PrivateRoute({ component, path }: RouteProps) {
  const email = useUserStore(state => state.email),
    name = useUserStore(state => state.name);

  return (email === null || name === null)
    ? <Redirect replace to="/login" />
    : <Route component={component} path={path} />;
}