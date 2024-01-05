import Link from "next/link";

export default function TermsAndConditions() {
    return (
        <section className="bg-white py-14 sm:py-32">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
                <div className="mx-auto max-w-3xl lg:text-center">
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-primary-500 sm:text-4xl">
                        Terms of Service
                    </h2>
                    <p className="mt-2 leading-8 text-gray-500">
                        Last Updated: 5 January 2024
                    </p>
                </div>
                <dl className="mx-auto mt-10 max-w-7xl lg:mt-20 ">
                    <p className="pl-5 mb-2 text-base leading-7 text-gray-600">
                        Welcome to LCRTel! <br />
                        By accessing and using this website, you agree to comply
                        with and be bound by the following terms and conditions
                        of use. Please read these terms carefully. If you do not
                        agree to these terms, please do not use this website.
                    </p>
                    <dt className="text-lg font-semibold leading-7 text-primary-500">
                        1. Acceptance of Terms
                    </dt>
                    <dd className=" pl-5 mb-2 text-base leading-7 text-gray-600">
                        By using this website, you acknowledge that you have
                        read, understood, and agree to be bound by these terms
                        and conditions. These terms may be updated or modified
                        without prior notice, and it is your responsibility to
                        review them periodically.
                    </dd>
                    <dt className="text-lg font-semibold leading-7 text-primary-500">
                        2. Use of the Website
                    </dt>
                    <dd className=" pl-5 mb-2 text-base leading-7 text-gray-600">
                        This website and its content are intended for users
                        above the age of 18. You agree to use this website for
                        lawful purposes only and in a manner that does not
                        infringe on the rights of others.
                    </dd>
                    <dt className="text-lg font-semibold leading-7 text-primary-500">
                        3. User Account
                    </dt>
                    <dd className=" pl-5 mb-2 text-base leading-7 text-gray-600">
                        If you create an account on this website, you are
                        responsible for maintaining the confidentiality of your
                        account and password. You agree to accept responsibility
                        for all activities that occur under your account.
                    </dd>
                    <dt className="text-lg font-semibold leading-7 text-primary-500">
                        4. Privacy Policy
                    </dt>
                    <dd className=" pl-5 mb-2 text-base leading-7 text-gray-600">
                        Your use of this website is also governed by our Privacy
                        Policy. Please review our{" "}
                        <Link href="/privacy-policy">Privacy Policy</Link> to
                        understand how we collect, use, and protect your
                        personal information.
                    </dd>
                    <dt className="text-lg font-semibold leading-7 text-primary-500">
                        5. Intellectual Property
                    </dt>
                    <dd className=" pl-5 mb-2 text-base leading-7 text-gray-600">
                        The content, design, and graphics on this website are
                        the property of LCRTel and are protected by intellectual
                        property laws. You may not reproduce, distribute, or use
                        any content from this website without our express
                        written consent.
                    </dd>
                    <dt className="text-lg font-semibold leading-7 text-primary-500">
                        6. Limitation of Liability{" "}
                    </dt>
                    <dd className=" pl-5 mb-2 text-base leading-7 text-gray-600">
                        In no event shall LCRTel be liable for any direct,
                        indirect, incidental, special, or consequential damages
                        arising out of or in any way connected with the use of
                        this website.
                    </dd>
                    <dt className="text-lg font-semibold leading-7 text-primary-500">
                        7. Governing Law
                    </dt>
                    <dd className=" pl-5 mb-2 text-base leading-7 text-gray-600">
                        These terms and conditions are governed by and construed
                        in accordance with the laws of United Arab Emirates. Any
                        disputes relating to these terms shall be subject to the
                        exclusive jurisdiction of the courts in United Arab
                        Emirates.
                    </dd>
                </dl>
            </div>
        </section>
    );
}
