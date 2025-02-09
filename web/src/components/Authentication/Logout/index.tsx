import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  domain: process.env.HOST ?? "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

async function logoutAction() {
  "use server";
  (await cookies()).set("jwt", "", { ...config, maxAge: 0 });
  //   redirect("/");
}

export default function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="transition-colors duration-500 font-semibold text-blog-foreground-readable hover:text-blog-foreground-readable-hover"
      >
        Logout
      </button>
    </form>
  );
}
