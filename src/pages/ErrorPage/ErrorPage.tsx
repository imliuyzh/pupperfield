import logo from "@assets/images/logo.svg";
import { Link } from "wouter";

export default function ErrorPage() {
  return (
    <main className="bg-[#300d38] flex flex-col min-h-[100vh] justify-between min-w-full relative">
      <h1 className="tagline text-white">
        <span className="block">We can't find</span>
        <span className="block">the page.</span>
        <span className="block">Do you want to</span>
        <span className="font-black text-[var(--background)] tracking-[-20px] uppercase">
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