"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { avatarDefaultImg } from "@/constants/avatarDefault"
import { useState } from "react";
import dayjs from "dayjs";
import { DateIcon } from "../icons/DateIcon";
import { EmailIcon } from "../icons/EmailIcon";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form";
import { updateUserSchema } from "@/schemas/updateUserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "../ui/use-toast";
import axios, { AxiosError } from 'axios';
import { APIResponse } from "@/types/ApiResponse";
import { CircularLoader } from "../specific/CircularLoader";


export const ProfileCard = () => {
    const [showChangeAvatar, setShowChangeAvatar] = useState<boolean>(false);
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof updateUserSchema>>({
        resolver: zodResolver(updateUserSchema),
    });

    const onSubmit = async (data: z.infer<typeof updateUserSchema>) => {
        setIsLoading(true);
        try {
            const response = await axios.put<APIResponse>("/api/update-user", data);
            toast({
                title: response.data.message,
            });
        } catch (error) {
            const axiosError = error as AxiosError<APIResponse>;
            toast({
                title: 'Error',
                description: axiosError.response?.data.message,
                variant: 'destructive',
            })
        }
        finally {
            setIsLoading(false);
        }
    }

    if (!session || !session.user) {
        return <div></div>
    }

    const user = session.user;

    return (
        <Card className="w-full max-w-xl">
            <CardHeader className="relative">
                <Avatar className="h-40 w-40" onMouseEnter={() => setShowChangeAvatar(true)} onMouseLeave={() => setShowChangeAvatar(false)}>
                    <AvatarImage src={user?.image ?? avatarDefaultImg} />
                    <AvatarFallback>Avatar</AvatarFallback>
                </Avatar>
                {showChangeAvatar && <CardDescription className="absolute z-50 bg-gray-400 text-xs rounded-lg top-2/3 h-7  text-white p-2">Change your avatar</CardDescription>}
            </CardHeader>
            <CardContent>
                <div className="flex items-center"><EmailIcon className="h-4 w-4 mr-2" /> {user.email}</div>
                <div className="text-xs mb-4 ml-6">@{user.username}</div>
                <div className="flex space-x-1 items-center">
                    <p className={`${user.isAcceptingMessages ? "bg-green-500" : "bg-red-500 m"} rounded-full h-4 w-4`}></p>
                    <p>{user?.isAcceptingMessages ? "active" : "busy"}</p>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 items-start">
                <div className="text-sm flex items-center space-x-1">
                    <DateIcon className="w-4 h-4 mr-1" /> Joined at {dayjs(user.createdAt).format('MMM D, YYYY h:mm A')}
                </div>
                <div className="text-sm flex items-center space-x-1">
                    <DateIcon className="w-4 h-4 mr-1" /> Last modified at {dayjs(user.updatedAt).format('MMM D, YYYY h:mm A')}
                </div>
                <Dialog>
                    <div className="w-full text-right">
                        <DialogTrigger asChild>
                            <Button variant="outline">
                                {isLoading ?
                                    (
                                        <>
                                            <CircularLoader className="h-4 w-4 mr-2" /> Please wait
                                        </>
                                    )
                                    :
                                    "Edit Profile"
                                }
                            </Button>
                        </DialogTrigger>
                    </div>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit profile</DialogTitle>
                            <DialogDescription>
                                Make changes to your profile here. Click save when you are done.
                            </DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    name="username"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input defaultValue={user.username} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="email"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input defaultValue={user.email} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <DialogFooter>
                                    <Button disabled={isLoading} type="submit">Save changes</Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </CardFooter>
        </Card>
    )
}
