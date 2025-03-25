import logo from "@assets/images/logo.svg";
import { XOctagon } from "react-feather";
import { Link } from "wouter";

export default function ErrorPage() {
  return (
    <main className="bg-[#300d38] flex flex-col min-h-[100vh] justify-between min-w-full overflow-hidden relative">
      <h1 className="pb-0 pt-0 tagline text-white z-1">
        <span className="block text-[min(144px,8rem)]/[max(120px,5rem)] w-3/4">
          Sorry, there is something going on. Do you want to
        </span>
        <span className="font-bold text-[min(192px,18rem)]/[max(144px,12rem)] text-[var(--background)] tracking-[-20px] uppercase">
          <Link to="/">go back?</Link>
        </span>
      </h1>
      <div className="flex items-end justify-between">
        <div className="flex items-end size-[10rem] z-1">
          <Link to="/">
            <img alt="Logo" src={logo} />
          </Link>
        </div>
        <XOctagon
          className="absolute z-0"
          color="rgba(130,109,135,0.3)"
          height="170vh"
          width="170vw"
        />
      </div>
    </main>
  );
}