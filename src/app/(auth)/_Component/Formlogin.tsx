"use client";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import NHFInput from "@/component/NHFInput/NHFInput";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInSchema } from "@/lib/types/SignIn";
import { authenticate } from "@/lib/action";
import { notification } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormProvider from "@/component/FormProvider/FormProvider";

type SignUpSchemaType = z.infer<typeof signInSchema>;

const Formlogin = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();
  const methods = useForm<SignUpSchemaType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<SignUpSchemaType> = async (data) => {
    console.log(data);

    const { email, password } = data;

    const result = await authenticate(email, password);
    if (result?.code === 1) {
      notification.error({
        message: "error login ",
        description: result.error,
        duration: 2,
      });
    } else if (result?.code === 2) {
      notification.warning({
        message: "Account is inactive ",
        description: result.error,
        duration: 2,
      });
    } else if (result.code === 0) {
      notification.error({
        message: "Server error",
        description: "Server inter",
        duration: 2,
      });
    } else {
      notification.success({
        message: "Login success",
        description: "Redirecting to the homepage.",
        duration: 2,
      });
      router.push("/");
    }
  };

  return (
    <>
      <CustomFormProvider methods={methods} onSubmit={onSubmit}>
        <div className="space-y-4">
          <NHFInput
            name="email"
            placeholder="example@gmail.com"
            className={`w-full px-3 py-2 border border-gray-600 rounded-xl bg-gray-700 text-gray-300 focus:outline-none focus:ring-[#b6f09c] focus:border-[#b6f09c] `}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          <NHFInput
            name="password"
            type="password"
            placeholder="Enter password"
            className={`w-full px-3 py-2 border border-gray-600 rounded-xl bg-gray-700 text-gray-300 focus:outline-none focus:ring-[#b6f09c] focus:border-[#b6f09c] `}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-black focus:ring-[#121619] bg-[#121619] border-gray-600 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-400"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <Link
                href={"/forgotpasswork"}
                className="text-transparent bg-clip-text bg-gradient-to-r from-green-100 to-green-500 cursor-pointer"
              >
                {" "}
                ForGotPasswork
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-900 bg-[#b6f09c] hover:bg-[#b6f09c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Log in
            </button>
          </div>
        </div>
      </CustomFormProvider>
    </>
  );
};

export default Formlogin;
