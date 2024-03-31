import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const currentAdmin = cookieStore.get("adminToken")?.value;
  const currentLearner = cookieStore.get("learnerToken")?.value;
  const currentMentor = cookieStore.get("mentorToken")?.value;
  const { nextUrl } = request;

  if (nextUrl.pathname.startsWith("/admin")) {
    if (!currentAdmin && nextUrl.pathname !== "/admin/login") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    if (nextUrl.pathname === "/admin/login" && currentAdmin) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  } else if (nextUrl.pathname.startsWith("/learner")) {
    if (!currentLearner && nextUrl.pathname !== "/learner/login") {
      return NextResponse.redirect(new URL("/learner/login", request.url));
    }
    if (nextUrl.pathname === "/learner/login" && currentLearner) {
      return NextResponse.redirect(new URL("/learner", request.url));
    }
  } else if (nextUrl.pathname.startsWith("/mentor")) {
    if (!currentMentor && nextUrl.pathname !== "/mentor/login") {
      return NextResponse.redirect(new URL("/mentor/login", request.url));
    }
    if (nextUrl.pathname === "/mentor/login" && currentMentor) {
      return NextResponse.redirect(new URL("/mentor", request.url));
    }
  }

  return NextResponse.next();
}
