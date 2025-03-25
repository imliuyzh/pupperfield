import logo from "@assets/images/logo.svg";
import { Link } from "wouter";

export default function ErrorPage() {
  return (
    <main className="bg-[#300d38] flex flex-col min-h-[100vh] justify-between min-w-full relative">
      <h1 className="pb-0 pt-0 tagline text-white">
        <span className="block">Sorry, there is</span>
        <span className="block">something going</span>
        <span className="block">on. Do you want to</span>
        <span className="font-bold text-[var(--background)] tracking-[-20px] uppercase">
          <Link to="/">go back?</Link>
        </span>
      </h1>
      <div className="flex items-end size-[10rem]">
        <Link to="/">
          <img alt="Logo" src={logo} />
        </Link>
      </div>
    </main>
  );
}