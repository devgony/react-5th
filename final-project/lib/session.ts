import { getIronSession } from "iron-session";
const cookies = require("next/headers").cookies;

interface SessionContent {
  id?: number;
}

export default function getSession() {
  return getIronSession<SessionContent>(cookies(), {
    cookieName: "nweet",
    password: process.env.COOKIE_PASSWORD!,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  });
}
