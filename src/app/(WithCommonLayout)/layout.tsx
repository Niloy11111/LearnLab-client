import Navbar from "@/components/shared/Navbar";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <Navbar />

      <main className="min-h-screen">{children}</main>
    </div>
  );
};

export default CommonLayout;
