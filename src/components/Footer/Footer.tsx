import logo from "@assets/images/logo.svg";
import { GitHub } from "react-feather";
import { Link } from "wouter";

type Prop = {
  showLogo?: boolean,
};

export default function Footer(prop: Prop) {
  return (
    <footer className="flex items-end justify-between">
      <div className="flex gap-4 items-center pb-4 text-xs text-black">
        <a
          href="https://github.com/imliuyzh/"
          rel="noreferrer"
          target="_blank"
        >
          <GitHub color="black" size={28} />
        </a>
        <p>© 2025 Yizhen Liu</p>
      </div>
      {prop.showLogo &&
        <Link to="/">
          <div className="bg-black flex mt-16 place-content-center relative right-0 size-[28vw]">
            <img alt="Logo" src={logo} />
          </div>
        </Link>
      }
    </footer>
  );
}