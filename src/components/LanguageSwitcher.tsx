"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { t } from "@/lib/i18n";

const LOCALE_COOKIE = "locale";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function setLocaleCookie(locale: "cs" | "en") {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const isEn = pathname.startsWith("/en");

  const alternatePath = isEn
    ? (pathname.replace(/^\/en/, "") || "/")
    : `/en${pathname === "/" ? "" : pathname}`;
  const label = isEn ? t("cs", "lang.switchToCs") : t("en", "lang.switchToEn");

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setLocaleCookie(isEn ? "cs" : "en");
    router.push(alternatePath);
  };

  return (
    <Link
      href={alternatePath}
      onClick={handleClick}
      className="text-xs tracking-widest text-cream-dim transition-colors hover:text-cream uppercase"
      aria-label={label}
    >
      {label}
    </Link>
  );
}
