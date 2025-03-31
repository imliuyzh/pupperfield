import logo from "@/assets/images/logo.svg";
import { XOctagon } from "react-feather";
import { Link } from "wouter";

export default function ErrorPage() {
  return (
    <main className="bg-[#300d38] flex flex-col justify-between min-h-[100vh] min-w-full overflow-hidden relative">
      <h1 className="lowercase pb-0 pt-0 tagline text-white z-1">
        <span className="block text-[min(144px,8rem)]/[max(120px,5rem)] w-3/4">
          Sorry, something is wrong. Do you want to
        </span>
        <div className="font-bold text-[min(192px,18rem)]/[max(144px,12rem)] text-[var(--background)] tracking-[-20px]">
          <Link to="/">
            <span className="hover:bg-black hover:text-[var(--background)] transition-all uppercase">go back?</span>
          </Link>
        </div>
      </h1>
      <div className="flex items-end justify-between">
        <div className="flex items-end size-[10rem] z-1">
          <Link to="/">
            <img alt="Logo" src={logo} />
          </Link>
        </div>
        <XOctagon
          className="absolute z-0"
          color="rgba(34,9,40,0.8)"
          height="170vh"
          width="170vw"
        />
      </div>
    </main>
  );
}