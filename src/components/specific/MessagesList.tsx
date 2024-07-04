import { Message } from "@/models/User";
import { MessageCard } from "./MessageCard"; 

export type MessagesListProps = {
    messages: Message[];
    handleDeleteMessage: (id: string) => void;
}

export const MessagesList = ({ messages, handleDeleteMessage }: MessagesListProps) => {
    return (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
            {messages.length > 0 ? (
                messages.map(message => (
                    <MessageCard
                        key={message._id as string}
                        message={message}
                        handleDeleteMessage={handleDeleteMessage}
                    />
                ))
            ) : (
                <p className="text-lg text-center">No messages to display.</p>
            )}
        </div>
    )
}
