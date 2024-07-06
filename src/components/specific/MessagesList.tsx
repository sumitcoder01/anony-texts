import { Message } from "@/models/User";
import { MessageCard } from "./MessageCard";
import { useTheme } from "@/context/ThemeContext";
import { NoDocumentFoundIcon } from "../icons/NoDocumentFoundIcon";

export type MessagesListProps = {
    messages: Message[];
    handleDeleteMessage: (id: string) => void;
}

export const MessagesList = ({ messages, handleDeleteMessage }: MessagesListProps) => {
    const { mode } = useTheme();
    return (
        <div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center mx-auto">
                {messages.length > 0 && (
                    messages.map(message => (
                        <MessageCard
                            key={message._id as string}
                            message={message}
                            handleDeleteMessage={handleDeleteMessage}
                        />
                    ))
                )}
            </div>
            {!messages.length && <p className="text-center mx-auto w-36"><NoDocumentFoundIcon color={mode === "light" ? "black" : "white"} /></p>}
        </div>
    )
}
