import { NextResponse } from "next/server";

const bots = [
  "googlebot",
  "yahoo! slurp",
  "bingbot",
  "yandex",
  "baiduspider",
  "facebookexternalhit",
  "twitterbot",
  "rogerbot",
  "linkedinbot",
  "embedly",
  "quora link preview",
  "showyoubot",
  "outbrain",
  "pinterest/0.",
  "developers.google.com/+/web/snippet",
  "slackbot",
  "vkshare",
  "w3c_validator",
  "redditbot",
  "applebot",
  "whatsapp",
  "flipboard",
  "tumblr",
  "bitlybot",
  "skypeuripreview",
  "nuzzel",
  "discordbot",
  "google page speed",
  "qwantify",
  "pinterestbot",
  "bitrix link preview",
  "xing-contenttabreceiver",
  "chrome-lighthouse",
  "telegrambot",
];

const IGNORE_EXTENSIONS = [
  ".js",
  ".css",
  ".xml",
  ".less",
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".pdf",
  ".doc",
  ".txt",
  ".ico",
  ".rss",
  ".zip",
  ".mp3",
  ".rar",
  ".exe",
  ".wmv",
  ".doc",
  ".avi",
  ".ppt",
  ".mpg",
  ".mpeg",
  ".tif",
  ".wav",
  ".mov",
  ".psd",
  ".ai",
  ".xls",
  ".mp4",
  ".m4a",
  ".swf",
  ".dat",
  ".dmg",
  ".iso",
  ".flv",
  ".m4v",
  ".torrent",
  ".woff",
  ".ttf",
  ".svg",
  ".webmanifest",
];

export function middleware(request) {
  // Debug: Log the full request URL and headers
  console.log("Request URL:", request.url);
  console.log("Request headers:", Object.fromEntries(request.headers));

  const userAgent = request.headers.get("user-agent") || "";
  console.log("User Agent:", userAgent); // Debug: Log the user agent

  const isBot = bots.some((bot) => userAgent.toLowerCase().includes(bot));
  console.log("Is Bot:", isBot); // Debug: Log whether it's detected as a bot

  const isPrerender = request.headers.get("X-Prerender");
  const url = new URL(request.url);
  const pathname = url.pathname;
  const extension = pathname.split(".").pop() || "";

  console.log("Is Prerender:", isPrerender); // Debug: Log prerender header
  console.log("Pathname:", pathname); // Debug: Log the pathname
  console.log("Extension:", extension); // Debug: Log the file extension

  if (
    isPrerender ||
    !isBot ||
    (extension && IGNORE_EXTENSIONS.includes(`.${extension}`))
  ) {
    console.log("Passing through to Next.js"); // Debug: Log pass-through
    return NextResponse.next();
  } else if (isBot) {
    console.log("Bot detected, rewriting to Prerender.io"); // Debug: Log rewrite
    const prerenderUrl = new URL(`https://service.prerender.io/${request.url}`);

    const headers = new Headers(request.headers);
    headers.set("X-Prerender-Token", process.env.PRERENDER_TOKEN || "");
    headers.set("X-Prerender-Int-Type", "NextJS");
    headers.set("X-Original-Url", request.url);

    // Debug: Log the Prerender.io URL and headers
    console.log("Prerender URL:", prerenderUrl.toString());
    console.log("Prerender headers:", Object.fromEntries(headers));

    return NextResponse.rewrite(prerenderUrl, {
      headers: headers,
    });
  }

  console.log("Fallback: Passing through to Next.js"); // Debug: Log fallback
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
