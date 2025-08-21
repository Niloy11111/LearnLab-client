import LoginForm from "@/components/modules/auth/login/LoginForm";
import Navbar from "@/components/shared/Navbar";
import Loading from "@/components/ui/loading";
import { Suspense } from "react";

const LoginPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Navbar />
      <div className="h-[80vh] w-screen flex justify-center items-center">
        <LoginForm />
      </div>
    </Suspense>
  );
};

export default LoginPage;
