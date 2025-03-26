import logo from "@assets/images/logo.svg";
import { GitHub } from "react-feather";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="flex items-end justify-between md:lg:-mt-[18rem] xl:2xl:-mt-[32rem]">
      <div className="flex gap-3 items-center pb-4 pl-4 text-xs text-black">
        <a
          href="https://github.com/imliuyzh/"
          rel="noreferrer"
          target="_blank"
        >
          <GitHub color="black" size={28} />
        </a>
        <p>© 2025 Yizhen Liu</p>
      </div>
      <Link to="/">
        <div className="bg-black flex mt-16 place-content-center relative right-0 size-[28vw]">
          <img alt="Logo" src={logo} />
        </div>
      </Link>
    </footer>
  );
}