import RegisterForm from "@/components/modules/auth/register/RegisterForm";
import Navbar from "@/components/shared/Navbar";

const Register = () => {
  return (
    <div>
      <Navbar />
      <div className="h-[82vh] w-screen flex justify-center items-center">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
