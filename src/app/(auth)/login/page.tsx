'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { loginSchema } from '@/schemas/loginSchema';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CircularLoader } from '@/components/specific/CircularLoader';
import { UsernameIcon } from '@/components/icons/UsernameIcon';
import { PasswordIcon } from '@/components/icons/PasswordIcon';
import { PasswordInput } from '@/components/shared/PasswordInput';
import { signIn } from 'next-auth/react';

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setIsSubmitting(true);
    try {
      const result = await signIn('credentials', {
        redirect: false,
        identifier: data.identifier,
        password: data.password,
      });

      if (result?.error) {
        if (result.error === 'CredentialsSignin') {
          toast({
            title: 'Login Failed',
            description: 'Incorrect username or password',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Error',
            description: result.error,
            variant: 'destructive',
          });
        }
      }

      if (result?.url) {
        toast({
          title: 'Success',
          description:"Sign In Success",
        });
        router.replace('/dashboard');
      }

    } catch (error) {
      console.error('Error during sign-ip:', error);
      // Default error message
      const errorMessage = 'There was a problem with your sign-ip. Please try again.';
      toast({
        title: 'Sign Ip Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    }
    finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-lg p-8 space-y-8 bg-secondary dark:bg-black rounded-lg shadow-md my-2">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl mb-6">
            Welcome Back to Anony Texts
          </h1>
          <p className="mb-4">Sign in to continue your secret conversations</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex gap-1 items-center"><UsernameIcon className="h-4 w-4" /> Username/Email</FormLabel>
                  <Input {...field} />
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
                  <PasswordInput name="password" field={field} />
                  <FormMessage />
                  <p onClick={()=>router.replace("/forgot-password")} className='text-blue-600 hover:text-blue-800 hover:underline text-sm text-right underline-offset-2'>Forgot password?</p>
                </FormItem>
              )}
            />

            <Button type="submit" className='w-full font-bold' disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <CircularLoader className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Not a member yet?{' '}
            <Link href="/register" className="text-blue-600 hover:text-blue-800 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login

