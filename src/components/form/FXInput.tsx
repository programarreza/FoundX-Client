"use client ";

import { Input } from "@nextui-org/input";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

interface IProps {
  variant?: "bordered" | "flat" | "faded" | "underlined";
  size?: "md" | "sm" | "lg";
  required?: boolean;
  type?: "text" | "email" | "password";
  label?: ReactNode;
  placeholder?: string;
  name: string;
}

const FXInput = ({
  variant = "bordered",
  size = "md",
  required = false,
  type = "text",
  label,
  placeholder,
  name,
}: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  console.log(errors);

  return (
    <Input
      {...register(name)}
      errorMessage={errors[name] ? (errors[name].message as string) : ""}
      isInvalid={!!errors[name]}
      variant={variant}
      size={size}
      required={required}
      type={type}
      label={label}
      placeholder={placeholder}
      name={name}
    />
  );
};

export default FXInput;
