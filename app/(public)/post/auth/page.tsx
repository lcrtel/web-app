import React from "react";
import LoginForm from "./login-form";
import SignupForm from "./signup-form";

const page = async () => {
    return (
        <>
            <h2 className="py-5 bg-primary-900 text-white text-lg text-center font-medium">
                You need an account to post
            </h2>
            <div className="flex max-w-8xl flex-col md:flex-row mx-auto w-full justify-between mt-10 gap-10 px-5">
                <LoginForm />
                <div className="flex md:flex-col gap-2 items-center justify-center">
                    <span className="h-px w-1/2 md:w-px md:h-1/2 bg-gradient-to-l md:bg-gradient-to-t from-gray-300 to-transparent"></span>
                    <p className=" text-gray-500">Or</p>
                    <span className="h-px w-1/2 md:w-px md:h-1/2 bg-gradient-to-r md:bg-gradient-to-b from-gray-300 to-transparent"></span>
                </div>{" "}
                <SignupForm />
            </div>
        </>
    );
};

export default page;
