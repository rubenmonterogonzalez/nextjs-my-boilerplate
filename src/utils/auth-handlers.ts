import { getSession, signIn } from "next-auth/react";
import { AuthResult, User } from "@/types/auth-types";

export async function handleLogin(email: string, password: string): Promise<AuthResult> {
  const result = await signIn("credentials", {
    redirect: false,
    email,
    password,
  });

  const { ok, error } = result || {};

  if (ok) {
    const session = await getSession();
    const user = session?.user as User;

    if (user) {
      return {
        success: true,
        redirectUrl: `/platform?userId=${user.id}`,
        messageKey: "loginSuccess",
      };
    } else {
      return {
        success: false,
        error: "User not found",
      };
    }
  } else {
    return {
      success: false,
      error: error || "loginFailed",
    };
  }
}

export async function handleRegister(name: string, email: string, password: string): Promise<AuthResult> {
  const response = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  const responseData = await response.json();

  if (response.ok) {
    return {
      success: true,
      redirectUrl: "/login",
      messageKey: "accountCreated",
    };
  } else {
    return {
      success: false,
      error: responseData.message,
    };
  }
}
