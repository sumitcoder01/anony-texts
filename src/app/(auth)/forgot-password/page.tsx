"use client"
import { useRouter } from "next/navigation"
import * as z from "zod";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form";
import { identifierSchema } from "@/schemas/forgotPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { APIResponse } from "@/types/ApiResponse";
import { useToast } from "@/components/ui/use-toast";
import { CircularLoader } from "@/components/specific/CircularLoader";
import { Separator } from "@/components/ui/separator";
import { UpdatePassword } from "@/components/specific/UpdatePassword";
import { UsernameIcon } from "@/components/icons/UsernameIcon";
import { identifierValidation } from "@/schemas/loginSchema";


const ForgotPassword = ({ searchParams }: { searchParams: { identifier: z.infer<typeof identifierValidation> | null } }) => {
  const { identifier } = searchParams;
  const router = useRouter();
  const [isIdentifierLoading, setIsIdentifierLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof identifierSchema>>({
    resolver: zodResolver(identifierSchema),
    defaultValues: {
      identifier: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof identifierSchema>) => {
    setIsIdentifierLoading(true);
    try {
      const response = await axios.post<APIResponse>("/api/auth/forgot-password", data);
      toast({
        description: response.data.message
      })
      router.push(`?identifier=${data.identifier}`);
    } catch (error) {
      const axiosError = error as AxiosError<APIResponse>;
      toast({
        title: "Error",
        description: axiosError.response?.data.message ?? "Error on sending OTP",
        variant: "destructive"
      })
    }
    finally {
      setIsIdentifierLoading(false);
    }
  }

  return (
    <div className="bg-secondary dark:bg-black w-full max-w-4xl p-10 my-12 mx-auto rounded-md shadow-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mb-12 mt-2 w-full max-w-xs">
          <FormField
            name="identifier"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-1 items-center"><UsernameIcon className="h-4 w-4" />Username/Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  we will send verification code on email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            {isIdentifierLoading ?
              (
                <>
                  <CircularLoader className="h-4 w-4 animate-spin mr-2" /> Please wait
                </>
              )
              :
              "Send"
            }</Button>
        </form>
      </Form>
      <Separator className="my-8" />
      {identifier && <UpdatePassword identifier={identifier} />}
    </div>
  )
}

export default ForgotPassword