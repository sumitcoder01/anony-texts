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
import { CameraIcon } from "../icons/CameraIcon";
import { avatarImageSchema } from "@/schemas/avatarImageSchema";
import { handleImageCompression } from "@/lib/imageCompression";
import { FileIcon } from "../icons/FileIcon";

export type ProfileCardProps = {
    user: any;
    updateProfile: (email: string, username: string) => Promise<void>;
    updateAvatar: (secure_url: string, public_id: string) => void;
}

export const ProfileCard = ({ user, updateProfile, updateAvatar }: ProfileCardProps) => {
    const [avatar, setAvatar] = useState<string | null>(null);
    const [showChangeAvatar, setShowChangeAvatar] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isAvatarLoading, setIsAvatarLoading] = useState<boolean>(false);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof updateUserSchema>>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: {
            username: user.username,
            email: user.email
        }
    });

    const avatarForm = useForm<z.infer<typeof avatarImageSchema>>({
        resolver: zodResolver(avatarImageSchema),
    });

    const onSubmitAvatar = async (data: z.infer<typeof avatarImageSchema>) => {
        setIsAvatarLoading(true);
        try {
            const file = await handleImageCompression(data.file[0]) as File;
            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post<APIResponse>("/api/auth/update-avatar", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast({
                description: response.data.message
            })
            updateAvatar(response.data?.secure_url ?? "", response.data?.public_id ?? "");
        } catch (error) {
            const axiosError = error as AxiosError<APIResponse>;
            toast({
                title: 'Error',
                description: axiosError.response?.data.message ?? "Error on updating avatar",
                variant: 'destructive',
            })
        }
        finally {
            setIsAvatarLoading(false);
        }
    }

    const onSubmit = async (data: z.infer<typeof updateUserSchema>) => {
        setIsLoading(true);
        try {
            const response = await axios.put<APIResponse>("/api/auth/update-user", data);
            toast({
                title: response.data.message,
            });
            // update user session
            updateProfile(data.email, data.username);
        } catch (error) {
            const axiosError = error as AxiosError<APIResponse>;
            toast({
                title: 'Error',
                description: axiosError.response?.data.message ?? "Error on updating profile",
                variant: 'destructive',
            })
        }
        finally {
            setIsLoading(false);
        }
    }
    const fileRef = avatarForm.register("file");

    return (
        <Card className="w-full max-w-xl">
            <CardHeader className="relative">
                <Avatar className="h-40 w-40 relative" onMouseEnter={() => setShowChangeAvatar(true)} onMouseLeave={() => setShowChangeAvatar(false)}>
                    <AvatarImage src={user?.avatar?.secure_url ?? avatarDefaultImg} />
                    <AvatarFallback>Avatar</AvatarFallback>
                    <div className="absolute z-50 bottom-3 left-[68%]">
                        <Dialog>
                            <div className="w-full text-right">
                                <DialogTrigger asChild>
                                    <Button variant="link">
                                        <CameraIcon />
                                    </Button>
                                </DialogTrigger>
                            </div>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Update Avatar</DialogTitle>
                                    <DialogDescription className="my-14 w-full">
                                        <Avatar className="h-40 w-40 mx-auto">
                                            <AvatarImage src={avatar || (user?.avatar?.secure_url ?? avatarDefaultImg)} />
                                            <AvatarFallback>Avatar</AvatarFallback>
                                        </Avatar>
                                    </DialogDescription>
                                </DialogHeader>
                                <Form {...avatarForm}>
                                    <form onSubmit={avatarForm.handleSubmit(onSubmitAvatar)} className="space-y-8">
                                        <FormField
                                            name="file"
                                            control={avatarForm.control}
                                            render={() => (
                                                <FormItem>
                                                    <FormLabel className="flex items-center gap-1"><FileIcon className="w-4 h-4 mr-1" />Avatar Image</FormLabel>
                                                    <FormControl>
                                                        <Input {...fileRef}
                                                            type="file"
                                                            onChange={async (e) => {
                                                                const file = await handleImageCompression(e.target.files?.[0] ?? null);
                                                                if (file) setAvatar(URL.createObjectURL(file));
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <DialogFooter>
                                            <Button disabled={isAvatarLoading} type="submit"> {isAvatarLoading ?
                                                (
                                                    <>
                                                        <CircularLoader className="h-4 w-4 mr-2" /> Please wait
                                                    </>
                                                )
                                                :
                                                "Update Avatar"
                                            }</Button>
                                        </DialogFooter>
                                    </form>
                                </Form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </Avatar>
                {showChangeAvatar && <CardDescription className="absolute z-40 bg-gray-400 text-xs rounded-lg top-2/3 h-7  text-white p-2">Change your avatar</CardDescription>}
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
                                Edit Profile
                            </Button>
                        </DialogTrigger>
                    </div>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit Profile</DialogTitle>
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
                                                <Input {...field} />
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
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <DialogFooter>
                                    <Button disabled={isLoading} type="submit"> {isLoading ?
                                        (
                                            <>
                                                <CircularLoader className="h-4 w-4 mr-2" /> Please wait
                                            </>
                                        )
                                        :
                                        "Edit Profile"
                                    }</Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </DialogContent>
                </Dialog>
            </CardFooter>
        </Card>
    )
}
