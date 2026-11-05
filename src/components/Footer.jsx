import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const goSection = (e, href) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/" + href);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-line">
      <div className="max-w-canvas mx-auto px-6 md:px-10 py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div>
          <p className="font-display font-extrabold text-lg tracking-tightest2">XENON</p>
          <p className="text-sm text-mute mt-1">UI/UX Designer</p>
        </div>

        <div className="flex gap-8 text-sm text-ink/80">
          <a href="#work" onClick={(e) => goSection(e, "#work")} className="hover:text-plum transition-colors">
            Work
          </a>
          <a href="#about" onClick={(e) => goSection(e, "#about")} className="hover:text-plum transition-colors">
            About
          </a>
          <a href="#process" onClick={(e) => goSection(e, "#process")} className="hover:text-plum transition-colors">
            Process
          </a>
          <Link to="/contact" className="hover:text-plum transition-colors">
            Contact
          </Link>
        </div>

        <div className="flex gap-6 text-sm text-ink/80">
          <a
            href="https://www.linkedin.com/in/xenon-saud-645034289"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-plum transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/nonex10"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-plum transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
      <div className="max-w-canvas mx-auto px-6 md:px-10 pb-8">
        <p className="text-xs text-mute">© 2026 Xenon Saud</p>
      </div>
    </footer>
  );
}
