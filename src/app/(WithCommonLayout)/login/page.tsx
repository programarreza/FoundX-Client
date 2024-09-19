"use client";
import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import Loading from "@/src/components/UI/Loading";
import { useUser } from "@/src/context/user.provider";
import { useUserLogin } from "@/src/hooks/auth.hook";
import loginValidationSchema from "@/src/schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FieldValues, SubmitHandler } from "react-hook-form";

const Login = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setIsLoading: userLogin } = useUser();
  const redirect = searchParams.get("redirect");
  const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleUserLogin(data);
    userLogin(true);
  };

  if (!isPending && isSuccess) {
    if (redirect) {
      router.push(redirect);
    } else {
      router.push("/");
    }
  }

  return (
    <>
      {isPending && <Loading />}

      <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
        <h3 className="my-2 text-2xl font-bold ">Login with FoundX</h3>
        <p>Welcome Back! Let&lsquo;s Get Started </p>

        <div className="w-[35%]">
          <FXForm
            onSubmit={onSubmit}
            resolver={zodResolver(loginValidationSchema)}
          >
            <div className="py-3">
              <FXInput name="email" type="email" placeholder="Email" />
            </div>
            <div className="py-3">
              <FXInput name="password" type="password" placeholder="Password" />
            </div>

            <Button
              type="submit"
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-black"
            >
              Login
            </Button>
          </FXForm>

          <div className="text-center">
            Don&lsquo;t have account ?{" "}
            <Link href={"/register"}>Register Now</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
