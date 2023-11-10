import cookie from "cookie";
import jwt from "jsonwebtoken";

export async function setSession(res:any, session:any,privileges:any) {
  const token = jwt.sign(session, process.env.TOKEN_SECRET || "");


  const cookieValue = cookie.serialize("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60*60*5,
    sameSite: "strict",
    path: "/",
  });
  res.setHeader("Set-Cookie", cookieValue);

  res.status(200).json({ session,privileges });
}

export async function getSession(req:any) {

  const cookies = cookie.parse(req.headers.cookie || "");
  const token = cookies.session || req?.query?.session;
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.TOKEN_SECRET|| "");
  } catch (err) {
    return null;
  }
}

export async function destroySession(res: any) {
  try {

  const cookieValue = cookie.serialize("session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: -1, // 1 week
    sameSite: "strict",
    path: "/",
  });
  res.setHeader("Set-Cookie", cookieValue);

    // res.setHeader(
    //   "Set-Cookie",
    //   cookie.serialize("sessfdfdion", "", {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === "production",
    //     expires: new Date(0),
    //     sameSite: "strict",
    //     path: "/",
    //   })
    // );

    res.redirect("/")
  } catch (error) {
    console.log(error);
  }
}
