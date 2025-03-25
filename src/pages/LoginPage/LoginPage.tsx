import useUserStore from "@/stores/UserStore/UserStore";
import Footer from "@/components/Footer/Footer";
import LoginForm from "@components/LoginForm/LoginForm";
import { Redirect } from "wouter";

export default function LoginPage() {
  const email = useUserStore(state => state.email), name = useUserStore(state => state.name);
  if (email !== null && name !== null) {
    return <Redirect replace to="/" />;
  }
  return (
    <div className="min-w-[1024px] min-h-[768px]">
      <main className="flex justify-between">
        <h1 className="border-b-30 border-black border-t-30 tagline text-black uppercase">
          {"Find the Buddy of Your Life!"
            .split(" ")
            .map((token, index) => <span className="block" key={index}>{token}</span>)}
        </h1>
        <div className="relative right-12 top-16 w-sm">
          <LoginForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}