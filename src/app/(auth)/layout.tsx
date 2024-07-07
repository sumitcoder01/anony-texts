import { AuthNavbar } from "@/components/specific/AuthNavbar";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <AuthNavbar />
            {children}
        </div>
    );
}
