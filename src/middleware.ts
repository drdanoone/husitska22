import { NextRequest, NextResponse } from "next/server";

const LOCALE_COOKIE = "locale";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname !== "/") return NextResponse.next();

  const chosen = request.cookies.get(LOCALE_COOKIE)?.value;
  if (chosen === "cs") return NextResponse.next();
  if (chosen === "en") return NextResponse.redirect(new URL("/en", request.url));

  const acceptLanguage = request.headers.get("accept-language") ?? "";
  const firstLang = acceptLanguage
    .split(",")[0]
    .trim()
    .split("-")[0]
    .toLowerCase();

  if (firstLang === "en") {
    return NextResponse.redirect(new URL("/en", request.url));
  }

  return NextResponse.next();
}
