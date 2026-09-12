import { List, X } from "@phosphor-icons/react";
import { useState } from "react";

const LINKS = [
  { href: "#collections", label: "Collections" },
  { href: "#atelier", label: "Atelier" },
  { href: "#visit", label: "Visit" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav-wrap">
      <nav className="nav-island" aria-label="Primary">
        <a href="#top" className="nav-mark">
          Rubis
        </a>
        <div className="nav-links">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
        <button
          type="button"
          className="nav-burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`burger-icon ${open ? "is-open" : ""}`}>
            {open ? <X size={20} weight="light" /> : <List size={20} weight="light" />}
          </span>
        </button>
      </nav>

      <div className={`nav-overlay ${open ? "is-open" : ""}`} role="dialog" aria-modal={open}>
        <div className="nav-overlay-inner">
          {LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              style={{ transitionDelay: `${100 + i * 80}ms` }}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
