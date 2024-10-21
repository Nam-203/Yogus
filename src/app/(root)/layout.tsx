import { StreamProvider } from "@/Providers/StreamProvider";
import { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main>
             <StreamProvider>
            {children}
            </StreamProvider>
        </main>
    );
};
export default RootLayout;
