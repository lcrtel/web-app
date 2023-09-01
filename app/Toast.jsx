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
                duration: 2000,
            }}
        />
    );
};

export default Toast;
