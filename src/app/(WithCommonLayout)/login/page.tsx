"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Link from "next/link";

const Login = () => {
  return (
    <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
      <h3 className="my-2 text-2xl font-bold ">Login with FoundX</h3>
      <p>Welcome Back! Let&lsquo;s Get Started </p>

      <div className="w-[35%]">
        <form>
          <div className="py-3">
            <Input type="text" placeholder="Email" />
          </div>
          <div className="py-3">
            <Input type="password" placeholder="Password" />
          </div>

          <Button className="my-3 w-full rounded-md bg-default-900 font-semibold text-black">
            Login
          </Button>
        </form>

        <div className="text-center">
          Don&lsquo;t have account ?{" "}
          <Link href={"/register"}>Register Now</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
