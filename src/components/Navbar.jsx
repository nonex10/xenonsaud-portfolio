import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAnchor = (e, href) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      setOpen(false);
      if (location.pathname !== "/") {
        navigate("/" + href);
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      setOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3 bg-paper/90 backdrop-blur-md border-b border-line" : "py-6 bg-transparent"
      }`}
    >
      <nav className="max-w-canvas mx-auto px-6 md:px-10 flex items-center justify-between">
        <Link
          to="/"
          className="font-display font-extrabold tracking-tightest2 text-lg text-ink"
          onClick={() => setOpen(false)}
        >
          XENON
        </Link>

        <div className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={(e) => handleAnchor(e, l.href)}
              className="text-sm text-ink/80 hover:text-plum transition-colors duration-200 relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-plum transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
          <Link
            to="/contact"
            className="text-sm font-medium bg-plum text-paper px-5 py-2.5 rounded-sm hover:bg-plum-light transition-colors duration-200"
          >
            Let's Talk
          </Link>
        </div>

        <button
          className="md:hidden text-ink"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden mt-4 px-6 pb-6 flex flex-col gap-5 bg-paper border-b border-line">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={(e) => handleAnchor(e, l.href)}
              className="text-base text-ink py-1"
            >
              {l.label}
            </a>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="text-sm font-medium bg-plum text-paper px-5 py-3 rounded-sm text-center"
          >
            Let's Talk
          </Link>
        </div>
      )}
    </header>
  );
}
