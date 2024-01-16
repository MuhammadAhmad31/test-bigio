import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getDecodeToken } from "./utils/getToken";

export function middleware(request: NextRequest) {
  // get cookie from request
  const cookie = request.headers.get("cookie");

  // get token with name token in cookie
  const tokenValue = cookie
    ?.split(";")
    .find((c) => c.trim().startsWith("token="));

  // get value of token
  const user = tokenValue?.split("=")[1];

  // get decode token
  const decodeToken = getDecodeToken(user);

  if (!decodeToken) {
    if (request.nextUrl.pathname.startsWith("/story")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}
