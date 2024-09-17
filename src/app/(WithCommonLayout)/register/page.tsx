"use client";

import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import { useUserRegistration } from "@/src/hooks/auth.hook";
import registerValidationSchema from "@/src/schemas/register.schema";
import { registerUser } from "@/src/services/AuthService";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { FieldValues, SubmitHandler } from "react-hook-form";

const RegisterPage = () => {
  // const {
  //   mutate: handleUserRegistration,
  //   isPending,
  //   data,
  //   isError,
  //   isSuccess,
  // } = useMutation({
  //   mutationKey: ["USER_REGISTRATION"],
  //   mutationFn: async (userData) => registerUser(userData),
  //   onSuccess: () => {
  //     console.log("User creation successfully ");
  //   },
  // });

  // console.log({ isPending, isSuccess, data });

  const { mutate: handleUserRegistration } = useUserRegistration();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const userData = {
      ...data,
      profilePhoto:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    };

    console.log("Inside from user data:", userData);

    handleUserRegistration(userData);
  };

  return (
    <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
      <h3 className="my-2 text-2xl font-bold ">Register with FoundX</h3>
      <p>Help Lost Items Find Their Way Home</p>

      <div className="w-[35%]">
        <FXForm
          //! Only for development
          defaultValues={{
            name: "Reza",
            email: "reza@gmail.com",
            mobileNumber: "01711223344",
            password: "123456",
          }}
          onSubmit={onSubmit}
          resolver={zodResolver(registerValidationSchema)}
        >
          <div className="py-3">
            <FXInput name="name" type="text" placeholder="Name" />
          </div>
          <div className="py-3">
            <FXInput name="email" type="email" placeholder="Email" />
          </div>
          <div className="py-3">
            <FXInput
              name="mobileNumber"
              type="text"
              placeholder="Mobile Number"
            />
          </div>
          <div className="py-3">
            <FXInput name="password" type="password" placeholder="Password" />
          </div>

          <Button
            type="submit"
            className="my-3 w-full rounded-md bg-default-900 font-semibold text-black"
          >
            Register
          </Button>
        </FXForm>

        <div className="text-center">
          Already have an account ? <Link href={"/login"}>Login Now</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
