import useUserStore from "@/stores/UserStore/UserStore";
import logo from "@assets/images/logo.svg";
import LoginForm from "@components/LoginForm/LoginForm";
import { GitHub } from "react-feather";
import { Link, Redirect } from "wouter";

export default function LoginPage() {
  const { email, name } = useUserStore(state => state);
  if (email !== null && name !== null) {
    return <Redirect replace to="/" />;
  }
  return (
    <div className="min-w-[1024px] min-h-[768px]">
      <main className="flex justify-between">
        <h1 className="border-b-30 border-black border-t-30 font-sans font-thin pb-8 pt-8 text-black text-[min(192px,16rem)]/[max(144px,6rem)] tracking-[-12px] uppercase">
          {"Find the Buddy of Your Life!"
            .split(" ")
            .map((token, index) => <span className="block" key={index}>{token}</span>)}
        </h1>
        <div className="relative right-12 top-16 w-sm">
          <LoginForm />
        </div>
      </main>

      <footer className="flex items-end justify-between md:lg:-mt-[18rem] xl:2xl:-mt-[32rem]">
        <div className="flex gap-3 items-center pb-4 pl-4 text-xs text-black">
          <a href="https://github.com/imliuyzh/fetch-frontend-takehome" rel="noreferrer" target="_blank">
            <GitHub color="black" size={28} />
          </a>
          <p>© 2025 Yizhen Liu</p>
        </div>
        <Link to="/login">
          <div className="bg-black flex mt-16 place-content-center relative right-0 size-[28vw]">
            <img alt="Logo" src={logo} />
          </div>
        </Link>
      </footer>
    </div>
  );
}