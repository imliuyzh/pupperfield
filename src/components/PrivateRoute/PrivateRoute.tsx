import useUserStore from "@/stores/UserStore/UserStore";
import type { ComponentType, LazyExoticComponent } from "react";
import { Redirect, Route } from "wouter";

type Props = {
  component: LazyExoticComponent<ComponentType>;
  path: string;
};

export default function PrivateRoute({ component, path }: Props) {
  const email = useUserStore(state => state.email),
    name = useUserStore(state => state.name);

  return (email === null || name === null)
    ? <Redirect replace to="/login" />
    : <Route component={component} path={path} />;
}