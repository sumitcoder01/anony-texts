
export type VerifyUserProps = {
  params: { username: string };
}
const VerifyUser = ({ params }: VerifyUserProps) => {
  const { username } = params;
  return (
    <div>
      {username}
    </div>
  )
}

export default VerifyUser
