
export type MessageUserProps = {
    params: { username: string }
}

const MessageUser = ({ params }: MessageUserProps) => {
    const { username } = params;
    return (
        <div className="bg-white dark:bg-black">
            Hey , {username}
        </div>
    )
}

export default MessageUser
