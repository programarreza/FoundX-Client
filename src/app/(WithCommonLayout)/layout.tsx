import { Navbar } from "@/src/components/navbar";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col min-h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default CommonLayout;
