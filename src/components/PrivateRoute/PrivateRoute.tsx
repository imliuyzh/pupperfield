import useUserStore from "@/stores/UserStore/UserStore";
import type { PropsWithChildren } from "react";
import { Redirect } from "wouter";

export default function PrivateRoute({ children }: PropsWithChildren) {
  const email = useUserStore(state => state.email),
    name = useUserStore(state => state.name);
  return (email === null || name === null) ? <Redirect replace to="/login" /> : children;
}