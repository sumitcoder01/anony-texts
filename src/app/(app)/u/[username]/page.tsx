
export type MessageUserProps = {
    params: { username: string }
}
const MessageUser = ({ params }: MessageUserProps) => {
    const { username } = params;
    return (
        <div className="text-center">
            Hey , {username}
        </div>
    )
}

export default MessageUser
