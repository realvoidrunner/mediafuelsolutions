"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const links = [
  { href: "#services", label: "Services" },
  { href: "#who", label: "Who it's for" },
  { href: "#process", label: "How we work" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef(open);
  useEffect(() => {
    openRef.current = open;
  }, [open]);

  useEffect(() => {
    let lastY = window.scrollY;

    // Frosted once you leave the top; slides away while scrolling down, returns on scroll up
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      if (!openRef.current) {
        if (y > 320 && y > lastY + 4) setHidden(true);
        else if (y < lastY - 4 || y < 320) setHidden(false);
      }
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && openRef.current) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    // Close the mobile menu when the screen grows to desktop size
    const mq = window.matchMedia("(min-width: 761px)");
    const onMq = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onMq);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, []);

  const close = () => setOpen(false);

  const cls = ["site-header", scrolled && "is-scrolled", hidden && !open && "is-hidden", open && "is-open"]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={cls} id="top" onFocusCapture={() => setHidden(false)}>
      <div className="wrap header-inner">
        <a className="brand" href="#top" aria-label="Media Fuel Solutions, back to top" onClick={close}>
          <Image
            src="/media-fuel-logo.png"
            alt="Media Fuel Solutions"
            width={813}
            height={240}
            priority
            className="brand-logo"
          />
        </a>

        <button
          ref={toggleRef}
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="nav-toggle-bars" aria-hidden="true" />
          <span className="visually-hidden">Menu</span>
        </button>

        <nav className={`site-nav${open ? " is-open" : ""}`} id="site-nav" aria-label="Main">
          {links.map((l, i) => (
            <a key={l.href} href={l.href} onClick={close} style={{ "--i": i } as React.CSSProperties}>
              {l.label}
            </a>
          ))}
          <a className="btn btn-small" href="#contact" onClick={close} style={{ "--i": links.length } as React.CSSProperties}>
            Book a free call
          </a>
        </nav>
      </div>
    </header>
  );
}
