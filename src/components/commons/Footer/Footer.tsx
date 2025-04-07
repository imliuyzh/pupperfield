import { GitHub } from "react-feather";

export default function Footer() {
  return (
    <footer className="text-xs text-black">
      <div className="flex gap-4 items-center pb-4">
        <a
          aria-label="Link to project repository"
          href="https://github.com/imliuyzh/pupperfield"
          rel="noreferrer"
          target="_blank"
        >
          <GitHub color="black" size={28} />
        </a>
        <p>© 2025 Yizhen Liu</p>
      </div>
    </footer>
  );
}