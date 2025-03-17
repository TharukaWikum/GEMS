import { Head, Link } from "@inertiajs/react";

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome to GEMS - IELTS Coaching" />
            <div className="bg-gray-50 dark:bg-white text-gray-700 dark:text-black">
                <div className="flex min-h-screen flex-col items-center justify-center">
                    <div className="w-full max-w-2xl px-6 lg:max-w-7xl">
                        {/* Header */}
                        <header className="flex justify-between items-center py-6">
                            <h1 className="text-2xl font-bold text-blue-600">
                                GEMS Institute
                            </h1>
                            <nav className="flex space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route("dashboard")}
                                        className="px-4 py-2 text-blue-600 font-semibold border border-blue-600 rounded-lg transition hover:bg-blue-600 hover:text-white"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route("login")}
                                            className="px-4 py-2 text-gray-600 font-semibold border border-gray-600 rounded-lg transition hover:bg-gray-600 hover:text-white"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route("register")}
                                            className="px-4 py-2 text-white bg-gray-600 font-semibold rounded-lg transition hover:bg-blue-700"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>

                        {/* Hero Section */}
                        <section className="text-center my-10">
                            <h2 className="text-3xl font-bold text-gray-900">
                                Master IELTS with GEMS
                            </h2>
                            <p className="mt-4 text-gray-600">
                                Join the **No.1** IELTS coaching institute and achieve your dream 
                                band score with our expert tutors and tailored study plans.
                            </p>
                            <div className="mt-6 space-x-4">
                                {/* <Link
                                    href={route("courses")}
                                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg transition hover:bg-blue-700"
                                >
                                    Explore Courses
                                </Link>
                                <Link
                                    href={route("contact")}
                                    className="px-6 py-3 text-blue-600 font-semibold border border-blue-600 rounded-lg transition hover:bg-blue-600 hover:text-white"
                                >
                                    Contact Us
                                </Link> */}
                            </div>
                        </section>

                        {/* Testimonials */}
                        <section className="my-12">
                            <h3 className="text-2xl font-semibold text-center text-gray-900">
                                What Our Students Say
                            </h3>
                            <div className="mt-6 flex flex-col space-y-6">
                                <blockquote className="border-l-4 border-gray-600 pl-4 italic text-gray-700">
                                    "GEMS transformed my IELTS preparation! Scored Band 8.5."
                                    <span className="block text-right font-bold">- Alex D.</span>
                                </blockquote>
                                <blockquote className="border-l-4 border-gray-600 pl-4 italic text-gray-700">
                                    "Best institute with highly experienced tutors. Highly recommend!"
                                    <span className="block text-right font-bold">- Sarah M.</span>
                                </blockquote>
                            </div>
                        </section>

                        {/* Footer */}
                        <footer className="py-12 text-center text-sm text-gray-600">
                            © 2025 GEMS Institute. All rights reserved.
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
