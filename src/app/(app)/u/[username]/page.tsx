
export type MessageUserProps = {
    params: { username: string }
}
const MessageUser = ({ params }: MessageUserProps) => {
    return (
        <div>
            Hey , {username}
        </div>
    )
}

export default MessageUser
