'use client';

import { APIResponse } from '@/types/APIResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDebounceCallback } from 'usehooks-ts'
import * as z from 'zod';
import { registerSchema } from '@/schemas/registerSchema';
import axios, { AxiosError } from 'axios';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CircularLoader } from '@/components/specific/CircularLoader';
import { UsernameIcon } from '@/components/icons/UsernameIcon';
import { EmailIcon } from '@/components/icons/EmailIcon';
import { PasswordIcon } from '@/components/icons/PasswordIcon';

const Register = () => {
  const [username, setUsername] = useState<string>('');
  const [usernameMessage, setUsernameMessage] = useState<string>('');
  const [isCheckingUsername, setIsCheckingUsername] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const debounced = useDebounceCallback(setUsername, 500);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });
  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username) {
        setIsCheckingUsername(true);
        setUsernameMessage('');
        try {
          const response = await axios.get<APIResponse>(
            `/api/check-username-unique?username=${username}`
          );
          setUsernameMessage(response.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<APIResponse>;
          setUsernameMessage(
            axiosError.response?.data.message ?? 'Error checking username'
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };
    checkUsernameUnique();
  }, [username]);

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<APIResponse>('/api/register', data);

      toast({
        title: 'Success',
        description: response.data.message,
      });

      router.replace(`/verify-user/${username}`);

    } catch (error) {
      console.error('Error during sign-up:', error);

      const axiosError = error as AxiosError<APIResponse>;
      // Default error message
      const errorMessage = axiosError.response?.data.message ?? 'There was a problem with your sign-up. Please try again.';

      toast({
        title: 'Sign Up Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    }
    finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen light:bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 light:bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join True Anony Texts
          </h1>
          <p className="mb-4">Sign up to start your anonymous adventure</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex gap-1 items-center"><UsernameIcon className="h-4 w-4" /> Username</FormLabel>
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      debounced(e.target.value);
                    }}
                  />
                  {isCheckingUsername && <CircularLoader className="h-4 w-4 animate-spin" />}
                  {!isCheckingUsername && usernameMessage && (
                    <p
                      className={`text-sm ${usernameMessage === 'Username is unique'
                        ? 'text-green-500'
                        : 'text-red-500'
                        }`}
                    >
                      {usernameMessage}
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex gap-1 items-center"><EmailIcon className="h-4 w-4" />Email</FormLabel>
                  <Input {...field} name="email" />
                  <p className='text-muted light:text-gray-700 text-sm'>We will send you a verification code</p>
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
                  <Input type="password" {...field} name="password" />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex gap-1 items-center" ><PasswordIcon className="h-4 w-4" />confirm Password</FormLabel>
                  <Input type="password" {...field} name="confirmPassword" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className='w-full' disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <CircularLoader className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                'Sign Up'
              )}
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Already a member?{' '}
            <Link href="/login" className="text-blue-600 hover:text-blue-800">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
