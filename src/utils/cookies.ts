import { setCookie } from "nookies";

export const setCookieOnBackend = (res, key, value) => {
  setCookie({ res }, key, value, {
    maxAge: 31104000,
    path: "/",
    sameSite: "none",
    secure: true
  });
};
