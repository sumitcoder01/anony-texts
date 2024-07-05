import { Message } from "@/models/User";
import {
    Card,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button';
import { CloseIcon } from "../icons/CloseIcon";
import { useToast } from '@/components/ui/use-toast';
import { APIResponse } from '@/types/ApiResponse';
import axios, { AxiosError } from 'axios';
import dayjs from 'dayjs';



export type MessageCardProps = {
    message: Message;
    handleDeleteMessage: (id: string) => void;
}

export const MessageCard = ({ message, handleDeleteMessage }: MessageCardProps) => {
    const { toast } = useToast();

    const handleDeleteConfirm = async () => {
        try {
            const response = await axios.delete<APIResponse>(
                `/api/delete-message/${message._id}`
            );
            handleDeleteMessage(message._id as string);
            toast({
                title: "Success",
                description: response.data.message
            });
        } catch (error) {
            const axiosError = error as AxiosError<APIResponse>;
            toast({
                title: 'Error',
                description:
                    axiosError.response?.data.message ?? 'Failed to delete message',
                variant: 'destructive',
            });
        }
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-start items-center">
                    <CardTitle>{message.content}</CardTitle>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant='destructive'>
                                <CloseIcon className="w-5 h-5" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete
                                    this message.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>
                                    Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction onClick={handleDeleteConfirm}>
                                    Continue
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
                <div className="text-sm">
                    {dayjs(message.createdAt).format('MMM D, YYYY h:mm A')}
                </div>
            </CardHeader>
        </Card>
    )
}
