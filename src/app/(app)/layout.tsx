import { Footer } from "@/components/specific/Footer";
import { NavBar } from "@/components/specific/NavBar";


export default function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <NavBar />
            {children}
            <Footer />
        </div>
    );
}
