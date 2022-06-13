import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function middleware(req: any) {
  // Get token after user login
  const token = await getToken({ req, secret: process.env.JWT_SECRET })

  const { pathname, origin } = req.nextUrl

  // Allow request if there is  a token
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next()
  }

  // Redirect to login if token is not valid
  if (!token && pathname !== "/login") {
    return NextResponse.redirect(`${origin}/login`)
  }
}
