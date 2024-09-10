import { Navbar } from "@/src/components/UI/navbar";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col min-h-screen">
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default CommonLayout;
