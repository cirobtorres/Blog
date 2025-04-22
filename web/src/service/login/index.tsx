"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_IP ?? "http://127.0.0.1:1337";
const path = "/api/auth/local";

const url = new URL(path, baseUrl);

const schema = z.object({
  email: z.string({
    invalid_type_error: "E-mail inválido",
  }),
  password: z.string({
    invalid_type_error: "Senha inválida",
  }),
});

interface PrevState {
  errors: {
    email?: string[] | undefined;
    password?: string[] | undefined;
    login?: string | undefined;
  };
}

const loginEmail = async (prevState: PrevState, formData: FormData) => {
  try {
    const identifier = formData.get("login-email");
    const password = formData.get("login-password");

    const validatedFields = schema.safeParse({
      email: identifier,
      password,
    });

    if (!validatedFields.success) {
      return {
        errors: {
          ...validatedFields.error.flatten().fieldErrors,
          login: undefined,
        },
      };
    }

    const login = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { jwt, user } = await login.json();

    const redirectParam = formData.get("redirectTo")?.toString() ?? "/";
    const redirectUrl = `/connect/local/redirect?jwt=${jwt}&redirect=${encodeURIComponent(
      redirectParam
    )}`;

    redirect(redirectUrl);
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "digest" in error &&
      typeof error.digest === "string" &&
      error.digest.startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }
    console.error("Failed to fetch e-mail login:", error);
    return {
      errors: {
        email: undefined,
        password: undefined,
        login: "Erro no servidor. Tente mais tarde",
      },
    };
    // throw new Error("Failed to fetch e-mail login");
  }
};

export { loginEmail };
