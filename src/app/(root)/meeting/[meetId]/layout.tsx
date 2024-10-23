import { ReactNode } from "react";
export async function generateMetadata({ params }: { params: { meetId: string } }){
    return {
      title: `Meeting ${params.meetId}`,
    };
  }
const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main>
            {children}
        </main>
    );
};
export default RootLayout;
