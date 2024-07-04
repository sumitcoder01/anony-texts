import { Message } from "@/models/User";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export type MessageCardProps = {
    message: Message;
    handleDeleteMessage: (id: string) => void;
}

export const MessageCard = ({ message, handleDeleteMessage }: MessageCardProps) => {

    return (
            <Card>
                <CardHeader>
                    <CardTitle>Message Card Title</CardTitle>
                    <CardDescription>Message Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>{message.content}</p>
                </CardContent>
                <CardFooter>
                    <p>Message Card Footer</p>
                </CardFooter>
            </Card>
    )
}
