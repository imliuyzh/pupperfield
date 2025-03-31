import logo from "@/assets/images/logo.svg";
import Footer from "@/components/commons/Footer/Footer";
import LoginForm from "@/features/Auth/components/LoginForm/LoginForm";
import useUserStore from "@/stores/UserStore";
import { Link, Redirect } from "wouter";

export default function LoginPage() {
  const email = useUserStore(state => state.email),
    name = useUserStore(state => state.name);

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
        <div className="flex flex-col items-end justify-between">
          <div className="relative right-12 top-16 w-sm">
            <LoginForm />
          </div>
          <Link to="/">
            <div className="bg-black flex place-content-center relative right-0 size-[28vw]">
              <img alt="Logo" src={logo} />
            </div>
          </Link>
        </div>
      </main>
      <div className="mt-10 pl-4">
        <Footer />
      </div>
    </div>
  );
}