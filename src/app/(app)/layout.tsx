import { NavBar } from "@/components/specific/NavBar";


export default function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <NavBar/>
            {children}
        </div>
    );
}
