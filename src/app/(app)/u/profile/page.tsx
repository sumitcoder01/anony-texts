"use client"
import { ProfileCard } from "@/components/shared/ProfileCard"
import { Separator } from "@/components/ui/separator"
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
import { usernameSchema } from "@/schemas/registerSchema"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod';
import { useRouter } from "next/navigation"
import { UsernameIcon } from "@/components/icons/UsernameIcon"
import { signOut, useSession } from "next-auth/react"


const UserProfile = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof usernameSchema>>({
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username: '',
    },
  });

  const { data: session, update } = useSession();


  const onSubmit = (data: z.infer<typeof usernameSchema>) => {
    const baseUrl = `${window.location.protocol}//${window.location.host}`;
    const profileUrl = `${baseUrl}/u/${data.username}`;
    console.log(profileUrl);
    router.replace(profileUrl);
  }

  const updateProfile = async (email: string, username: string) => {
    await update({
      ...session,
      user: {
        ...session?.user,
        email, username
      }
    })
    if (user.email !== email) {
      await signOut({ callbackUrl: `/verify-user/${username}` });
    }
  }

  if (!session || !session.user) {
    return <div></div>
  }

  const user = session.user;

  return (
    <div className="bg-white dark:bg-black my-10 px-10 py-8 rounded-md shadow-lg w-full max-w-5xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">User Profile</h1>
      <ProfileCard user={user} updateProfile={updateProfile} />
      <Separator className="my-8" />
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold mt-8 mb-10">Send Anonymous Message</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full max-w-xs mx-auto">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><UsernameIcon className="w-4 h-4 mr-1" />Username</FormLabel>
                  <FormControl>
                    <Input placeholder="enter a username" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default UserProfile