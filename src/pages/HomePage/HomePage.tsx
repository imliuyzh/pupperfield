import useUserStore from "@/stores/UserStore/UserStore";
import { Redirect } from "wouter";

export default function HomePage() {
  const email = useUserStore(state => state.email), name = useUserStore(state => state.name);
  if (email === null || name === null) {
    return <Redirect replace to="/login" />
  }
  return (
    <h1>Home</h1>
  );
}