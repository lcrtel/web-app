"use client";
import { Toaster } from "react-hot-toast";
const Toast = () => {
    return (
        <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
                className: "",
            }}
        />
    );
};

export default Toast;
