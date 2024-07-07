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
import { Label } from "@/components/ui/label"


export const ProfileCard = () => {
    const [showChangeAvatar, setShowChangeAvatar] = useState<boolean>(false);
    const { data: session } = useSession();

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
                <div className="text-xs mb-4 ml-6">{user.username}</div>
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
                            <Button variant="outline">Edit Profile</Button>
                        </DialogTrigger>
                    </div>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit profile</DialogTitle>
                            <DialogDescription>
                                Make changes to your profile here. Click save when you are done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                    Username
                                </Label>
                                <Input id="username" value={user.username} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-right">
                                    Email
                                </Label>
                                <Input id="email" value={user.email} className="col-span-3" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardFooter>
        </Card>
    )
}
