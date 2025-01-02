'use client'

import useFormStore from 'zustand/formDataStore'
import Link from 'next/link'
import React from 'react'
import { Button, buttonVariants } from 'shadcn/ui/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from 'shadcn/ui/components/ui/card'
import { Input } from 'shadcn/ui/components/ui/input'
import { Label } from 'shadcn/ui/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'shadcn/ui/components/ui/tabs'
import { useSearchParams } from 'next/navigation'
import { login, register } from 'server/auth'
import { Alert, AlertDescription, AlertTitle } from 'shadcn/ui/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import { FormState } from 'types/form'

const Page = () => {

    const [formState, setFormState] = React.useState<FormState>({
        error: undefined,
        message: undefined

    })

    const mode = useSearchParams().get('mode')

    const {
        loginForm,
        registerForm,
        setLoginForm,
        setRegisterForm,
        resetLoginForm,
        resetRegisterForm,
    } = useFormStore();

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Login Form Data:", loginForm);
        const result = await login(loginForm)
        setFormState(result)
        console.log(formState)
        resetLoginForm(); // Reset form after submission (optional)
    };

    const handleRegisterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Register Form Data:", registerForm);
        const result = await register(registerForm)
        setFormState(result)
        console.log(formState)
        resetRegisterForm(); // Reset form after submission (optional)
    };

    return (
        <div className="relative w-full flex pt-20 flex-col items-center justify-center">
            <Tabs defaultValue={mode || "login"} className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">ورود</TabsTrigger>
                    <TabsTrigger value="register">ثبت نام</TabsTrigger>
                </TabsList>

                {/* Login Form */}
                <TabsContent value="login">
                    <form onSubmit={handleLoginSubmit}>
                        <Card>
                            <CardHeader>
                                <CardTitle>ورود</CardTitle>
                                <CardDescription>ورود به حساب کاربری</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="email">ایمیل</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="ایمیل خود را وارد کنید"
                                        value={loginForm.email}
                                        onChange={(e) =>
                                            setLoginForm(e.target.value, loginForm.password)
                                        }
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="password">پسورد</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="پسورد خود را وارد کنید"
                                        value={loginForm.password}
                                        onChange={(e) =>
                                            setLoginForm(loginForm.email, e.target.value)
                                        }
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className='flex flex-col gap-2'>
                                {(formState?.error || formState?.message) && <Alert variant={"destructive"}>
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>خطا</AlertTitle>
                                    <AlertDescription>
                                        {formState?.message && <p>{formState.message}</p>}
                                        {formState?.error?.email && <p>{formState.error.email[0]}</p>}
                                        {formState?.error?.password && <p>{formState.error.password[0]}</p>}
                                    </AlertDescription>
                                </Alert>}
                                <div>
                                    <Button type="submit" variant="default">
                                        ورود
                                    </Button>
                                    <Link
                                        href="/auth/forget-password"
                                        className={buttonVariants({
                                            variant: "link",
                                            className: "ml-auto",
                                        })}
                                    >
                                        رمز عبور خود را فراموش کرده ام
                                    </Link>
                                </div>
                            </CardFooter>
                        </Card>
                    </form>
                </TabsContent>

                {/* Register Form */}
                <TabsContent value="register">
                    <form onSubmit={handleRegisterSubmit}>
                        <Card>
                            <CardHeader>
                                <CardTitle>ثبت نام</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="email">ایمیل</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="ایمیل خود را وارد کنید"
                                        value={registerForm.email}
                                        onChange={(e) =>
                                            setRegisterForm(
                                                e.target.value,
                                                registerForm.password,
                                                registerForm.confirmPassword
                                            )
                                        }
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="password">پسورد</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="پسورد خود را وارد کنید"
                                        value={registerForm.password}
                                        onChange={(e) =>
                                            setRegisterForm(
                                                registerForm.email,
                                                e.target.value,
                                                registerForm.confirmPassword
                                            )
                                        }
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="confirmPassword">تایید پسورد</Label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="پسورد خود را مجددا وارد کنید"
                                        value={registerForm.confirmPassword}
                                        onChange={(e) =>
                                            setRegisterForm(
                                                registerForm.email,
                                                registerForm.password,
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className='flex flex-col gap-2'>
                                {(formState?.error || formState?.message) && <Alert variant={"destructive"}>
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>خطا</AlertTitle>
                                    <AlertDescription>
                                        {formState?.message && <p>{formState.message}</p>}
                                        {formState?.error?.email && <p>{formState.error.email[0]}</p>}
                                        {formState?.error?.password && formState.error.password.map((error) => <p key={error}>{error}</p>)}
                                        {formState?.error?.confirmPassword && <p>{formState.error.confirmPassword[0]}</p>}
                                    </AlertDescription>
                                </Alert>}
                                <Button type="submit" variant="default">
                                    ثبت نام
                                </Button>
                            </CardFooter>
                        </Card>

                    </form>
                </TabsContent>
            </Tabs>

        </div>
    )
}

export default Page