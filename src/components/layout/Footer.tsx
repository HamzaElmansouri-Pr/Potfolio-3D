// src/components/layout/Footer.tsx
import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/youruser", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com/in/youruser", icon: Linkedin },
  { label: "Twitter", href: "https://twitter.com/youruser", icon: Twitter },
];

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-3">
            <Link
              href="/"
              className="font-display font-bold text-lg text-[var(--text-primary)]"
            >
              <span className="text-cobalt-500">&lt;</span>
              YourName
              <span className="text-cobalt-500">/&gt;</span>
            </Link>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-[220px]">
              Building scalable, enterprise-grade software solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Navigation
            </h3>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-secondary)] hover:text-cobalt-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Connect
            </h3>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center
                             bg-[var(--bg-secondary)] border border-[var(--border)]
                             text-[var(--text-secondary)] hover:text-cobalt-500
                             hover:border-cobalt-500/40 hover:shadow-glow
                             transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[var(--border)] pt-6 flex flex-col sm:flex-row
                        items-center justify-between gap-2">
          <p className="text-xs text-[var(--text-muted)]">
            © {year} YourName · All rights reserved
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            Built with{" "}
            <span className="text-cobalt-500 font-medium">Next.js 15</span>
            {" "}·{" "}
            <span className="text-cobalt-500 font-medium">Framer Motion</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
