"use client"
import { useRouter } from "next/navigation"
import * as z from "zod";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormDescription,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { APIResponse } from "@/types/ApiResponse";
import { useToast } from "@/components/ui/use-toast";
import { CircularLoader } from "@/components/specific/CircularLoader";
import { forgotPasswordSchema } from "@/schemas/forgotPasswordSchema";
import { UsernameIcon } from "../icons/UsernameIcon";
import { SecretsIcon } from "../icons/SecretsIcon";
import { PasswordIcon } from "../icons/PasswordIcon";
import { PasswordInput } from "../shared/PasswordInput";

export type UpdatePasswordProps = {
    identifier: string;
}

export const UpdatePassword = ({ identifier }: UpdatePasswordProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof forgotPasswordSchema>>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            code: "",
            identifier: identifier,
            password: "",
            confirmPassword: ""
        },
    })

    const onSubmit = async (data: z.infer<typeof forgotPasswordSchema>) => {
        setIsLoading(true);
        try {
            const response = await axios.put<APIResponse>("/api/auth/forgot-password", data);
            toast({
                description: response.data.message
            })
            router.replace("/login");
        } catch (error) {
            const axiosError = error as AxiosError<APIResponse>;
            toast({
                title: "Error",
                description: axiosError.response?.data.message ?? "Error on updating password",
                variant: "destructive"
            })
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mb-12 mt-2 w-full max-w-xs">
                <FormField
                    name="identifier"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex gap-1 items-center"><UsernameIcon className="h-4 w-4" /> Username/Email</FormLabel>
                            <FormControl>
                                <Input disabled={true} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="code"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex gap-1 items-center"><SecretsIcon className="h-4 w-4" />Verification Code</FormLabel>
                            <FormControl>
                                <InputOTP maxLength={6} {...field}>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </FormControl>
                            <FormDescription>
                                Please enter the one-time password sent to your email.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex gap-1 items-center"><PasswordIcon className="h-4 w-4" />Password</FormLabel>
                            <FormControl>
                                <PasswordInput name="password" field={field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="confirmPassword"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex gap-1 items-center"><PasswordIcon className="h-4 w-4" /> Confirm Password</FormLabel>
                            <FormControl>
                                <PasswordInput name="confirmPassword" field={field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">
                    {isLoading ?
                        (
                            <>
                                <CircularLoader className="h-4 w-4 animate-spin mr-2" /> Please wait
                            </>
                        )
                        :
                        "Update password"
                    }</Button>
            </form>
        </Form>
    )
}
