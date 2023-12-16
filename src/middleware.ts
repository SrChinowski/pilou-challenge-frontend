import { NextRequest, NextResponse } from "next/server";
import { ResponseCookies, RequestCookies } from 'next/dist/server/web/spec-extension/cookies';

function applySetCookie(req: NextRequest, res: NextResponse) {
    // 1. Parse Set-Cookie header from the response
    const setCookies = new ResponseCookies(res.headers);
  
    // 2. Construct updated Cookie header for the request
    const newReqHeaders = new Headers(req.headers);
    const newReqCookies = new RequestCookies(newReqHeaders);
    setCookies.getAll().forEach((cookie) => newReqCookies.set(cookie));
  
    // 3. Set up the “request header overrides” (see https://github.com/vercel/next.js/pull/41380)
    //    on a dummy response
    // NextResponse.next will set x-middleware-override-headers / x-middleware-request-* headers
    const dummyRes = NextResponse.next({ request: { headers: newReqHeaders } });
  
    // 4. Copy the “request header overrides” headers from our dummy response to the real response
    dummyRes.headers.forEach((value, key) => {
      if (key === 'x-middleware-override-headers' || key.startsWith('x-middleware-request-')) {
        res.headers.set(key, value);
      }
    });
  }

export function middleware(req :  NextRequest) {
    // console.log(req.cookies.get("token")?.value)
    const res = NextResponse.next();
    res.cookies.set('token', req.cookies.get("token")?.value || "");
  
    // Apply those cookies to the request
    applySetCookie(req, res);
  
    return res;
}