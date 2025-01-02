"use server"

import { FormState, LoginForm, loginFormSchema, RegisterForm, signupFormSchema } from "types/form";
import { redirect } from "next/navigation";
import { createSession } from "./session";


export async function register(formData: RegisterForm): Promise<FormState> {
    const validationFields = signupFormSchema.safeParse({
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
    });

    if (!validationFields.success) {
        return {
            error: validationFields.error.flatten().fieldErrors,
        }
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(validationFields.data),
    });
    if (response.ok) {
        redirect("/")
    }
    else {
        return {
            message:
                response.status === 409 ? "کاربری با این ایمیل وجود دارد" : response.statusText,
        }

    }
}

export async function login(formData: LoginForm): Promise<FormState> {
    const validationFields = loginFormSchema.safeParse({
        email: formData.email,
        password: formData.password,
    });

    if (!validationFields.success) {
        return {
            error: validationFields.error.flatten().fieldErrors,
        }
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(validationFields.data),
    });
    if (response.ok) {
        const result = await response.json()
        await createSession({
            user: {
                id: result.id,
                email: result.email,
                role: result.role
            }
        })
        redirect("/")

    }
    else {
        return {
            message:
                response.status === 401 ? "ایمیل یا رمز عبور اشتباه است" : response.statusText,
        }
    }
}
