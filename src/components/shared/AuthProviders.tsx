import { GoogleButton } from "../specific/GoogleButton"

export const AuthProviders = () => {
    return (
        <div className="text-center mt-4 space-y-4">
            <span className='text-sm mb-4'>Or continue with</span>
            <GoogleButton />
        </div>
    )
}