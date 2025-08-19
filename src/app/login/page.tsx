import LoginForm from "@/components/modules/auth/login/LoginForm";
import Loading from "@/components/ui/loading";
import { Suspense } from "react";

const LoginPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <div className="h-screen w-screen flex justify-center items-center">
        <LoginForm />
      </div>
    </Suspense>
  );
};

export default LoginPage;
