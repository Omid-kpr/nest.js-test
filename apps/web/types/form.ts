import { z } from "zod";

export interface LoginForm {
    email: string;
    password: string;
}

export interface RegisterForm {
    email: string;
    password: string;
    confirmPassword: string;
}

// Define the store
export interface FormStore {
    loginForm: LoginForm;
    registerForm: RegisterForm;
    setLoginForm: (email: string, password: string) => void;
    setRegisterForm: (email: string, password: string, confirmPassword: string) => void;
    resetLoginForm: () => void;
    resetRegisterForm: () => void;
}

export type FormState = {
    error?: {
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
    }
    message?: string
} | undefined

export const signupFormSchema = z.object({
    email: z.string().email({ message: "لطفا یک ایمیل معتبر وارد کنید" }).trim(),

    password: z.string().min(8, { message: "رمز عبور باید حداقل ۸ کاراکتر باشد" }).regex(/[a-zA-Z]/, { message: "رمز عبور باید حداقل یک حرف داشته  باشد" }).regex(/[0-9]/, { message: "رمز عبور باید حداقل یک عدد داشته  باشد" }).regex(/[^a-zA-Z0-9]/, { message: "رمز عبور باید حداقل یک کاراکتر خاص داشته  باشد" }).trim(),

    confirmPassword: z
        .string()
        .trim(),
}).refine(data => data.password === data.confirmPassword, {
    message: "رمز عبور و تایید آن باید یکسان باشند",
    path: ["confirmPassword"],
})

export const loginFormSchema = z.object({
    email: z.string().email({ message: "لطفا یک ایمیل معتبر وارد کنید" }),

    password: z.string().min(1, { message: 'رمز عبور را نباید خالی بگذارید' }),
})