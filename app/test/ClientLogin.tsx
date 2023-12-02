"use client";

import React, { useEffect } from "react";

const ClientLogin = () => {
    async function onSubmit() {
        var myHeaders = new Headers();

        var raw = JSON.stringify({
            username: "VOS",
            password: "salafi#123#",
        });

        var requestOptions: any = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch("https://23.106.253.237/loginpost", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));
    }
    return (
        <button onClick={() => onSubmit()}>Login</button>
    );
};

export default ClientLogin;
