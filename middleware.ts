import { NextResponse } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /fonts (inside /public)
     * 4. /examples (inside /public)
     * 5. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api|_next|fonts|examples|[\\w-]+\\.\\w+).*)'
  ]
};

export function middleware(req: any) {
  const url = req.nextUrl.clone();
  const host = req.headers.get('host');

  const { pathname } = req.nextUrl;

  const trimmedHost = host
    .replace(/^www\./, '')
    .replace(`.blogfolio.io`, '')
    .replace(`.localhost:3000`, '');

  if (host === 'localhost:3000' || host === 'blogfolio.io') {
    url.pathname = `${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  if (trimmedHost.length > 0) {
    url.pathname = `/_sites/${trimmedHost}${pathname}`;
    console.log('trimmedHost', trimmedHost);
    console.log('pathname', pathname);
    console.log('tostring', url.toString());
    return NextResponse.rewrite(url);
  }
}
