import { type NextRequest, NextResponse } from "next/server";
import { getSession } from "next-auth/react";
import { BASE_URL } from "@/lib/constants";

export const config = {
    matcher: [
        /*
         * Match all paths except for:
         * 1. /api routes
         * 2. /_next (Next.js internals)
         * 3. /_static (inside /public)
         * 4. all root files inside /public (e.g. /favicon.ico)
         */
        "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
    ],
};

export default async function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const baseUrl = new URL(BASE_URL || '')

    // Get hostname of request (e.g. app.sturrd.com, app.localhost:3000)
    let hostname = req.headers
        .get("host")!
        .replace(".localhost:3000", `.${baseUrl.host}`);

    // special case for Vercel preview deployment URLs
    if (
        hostname.includes("---") &&
        hostname.endsWith(`.${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)
    ) {
        hostname = `${hostname.split("---")[0]}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN
            }`;
    }

    const searchParams = req.nextUrl.searchParams.toString();
    // Get the pathname of the request (e.g. /, /about, /blog/first-post)
    const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""
        }`;


    // rewrites for app pages
    if (hostname == `app.${baseUrl.host}`) {

        // if (!session && !path.includes("/auth/signin")) {
        //     return NextResponse.redirect(new URL("/auth/signin", req.url));
        // } else if (session && path.includes("/auth/signin")) {
        //     return NextResponse.redirect(new URL("/", req.url));
        // } else if (!session && path.includes('/auth/signin')) {
        //     return
        // }

        return NextResponse.rewrite(
            new URL(`/app${path === "/" ? "" : path}`, req.url),
        );
    }

    // rewrite root application to `/website` folder
    if (
        hostname === "localhost:3000" ||
        hostname === baseUrl.host
    ) {
        return NextResponse.rewrite(
            new URL(`/website${path === "/" ? "" : path}`, req.url),
        );
    }

    const domain = hostname.split(`.${baseUrl.host}`)[0]

    // rewrite everything else to `/[domain]/[slug] dynamic route
    return NextResponse.rewrite(new URL(`/${domain}${path === "/" ? "" : path}`, req.url));
}