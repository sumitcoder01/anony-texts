import { ProfileCard } from "@/components/shared/ProfileCard"


const UserProfile = () => {
  return (
    <div className="bg-white dark:bg-black my-10 px-10 py-8 rounded-md shadow-lg w-full max-w-5xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">User Profile</h1>
      <ProfileCard />
    </div>
  )
}

export default UserProfile