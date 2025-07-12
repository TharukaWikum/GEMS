// import { Head, Link } from "@inertiajs/react";

// export default function Welcome({ auth }) {
//     return (
//         <>
//             <Head title="Welcome to GEMS - IELTS Coaching" />
//             <div className="bg-gray-50 dark:bg-white text-gray-700 dark:text-black">
//                 <div className="flex min-h-screen flex-col items-center justify-center">
//                     <div className="w-full max-w-2xl px-6 lg:max-w-7xl">
//                         {/* Header */}
//                         <header className="flex justify-between items-center py-6">
//                             <h1 className="text-2xl font-bold text-blue-600">
//                                 GEMS Institute
//                             </h1>
//                             <nav className="flex space-x-4">
//                                 {auth.user ? (
//                                     <>
//             {auth.user.role === "admin" && (
//                 <Link
//                     href={route("dashboard")}
//                     className="px-4 py-2 text-blue-600 font-semibold border border-blue-600 rounded-lg transition hover:bg-blue-600 hover:text-white"
//                 >
//                     Dashboard
//                 </Link>
//             )}
//             {auth.user.role === "frontdesk" && (
//                 <Link
//                     href={route("staff.index")}
//                     className="px-4 py-2 text-blue-600 font-semibold border border-blue-600 rounded-lg transition hover:bg-blue-600 hover:text-white"
//                 >
//                     Staff Dashboard
//                 </Link>
//             )}
//             {auth.user.role === "teacher" && (
//                 <Link
//                     href={route("courses.index")}
//                     className="px-4 py-2 text-blue-600 font-semibold border border-blue-600 rounded-lg transition hover:bg-blue-600 hover:text-white"
//                 >
//                     My Courses
//                 </Link>
//             )}
//             {auth.user.role === "student" && (
//                 <Link
//                     href={route("student.dashboard")}
//                     className="px-4 py-2 text-blue-600 font-semibold border border-blue-600 rounded-lg transition hover:bg-blue-600 hover:text-white"
//                 >
//                     Student Dashboard
//                 </Link>
//             )}
//         </>
//                                 ) : (
//                                     <>
//                                         <Link
//                                             href={route("login")}
//                                             className="px-4 py-2 text-gray-600 font-semibold border border-gray-600 rounded-lg transition hover:bg-gray-600 hover:text-white"
//                                         >
//                                             Log in
//                                         </Link>
//                                         <Link
//                                             href={route("register")}
//                                             className="px-4 py-2 text-white bg-gray-600 font-semibold rounded-lg transition hover:bg-blue-700"
//                                         >
//                                             Register
//                                         </Link>
//                                     </>
//                                 )}
//                             </nav>
//                         </header>

//                         {/* Hero Section */}
//                         <section className="text-center my-10">
//                             <h2 className="text-3xl font-bold text-gray-900">
//                                 Master IELTS with GEMS
//                             </h2>
//                             <p className="mt-4 text-gray-600">
//                                 Join the **No.1** IELTS coaching institute and achieve your dream 
//                                 band score with our expert tutors and tailored study plans.
//                             </p>
//                             <div className="mt-6 space-x-4">
//                                 {/* <Link
//                                     href={route("courses")}
//                                     className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg transition hover:bg-blue-700"
//                                 >
//                                     Explore Courses
//                                 </Link>
//                                 <Link
//                                     href={route("contact")}
//                                     className="px-6 py-3 text-blue-600 font-semibold border border-blue-600 rounded-lg transition hover:bg-blue-600 hover:text-white"
//                                 >
//                                     Contact Us
//                                 </Link> */}
//                             </div>
//                         </section>

//                         {/* Testimonials */}
//                         <section className="my-12">
//                             <h3 className="text-2xl font-semibold text-center text-gray-900">
//                                 What Our Students Say
//                             </h3>
//                             <div className="mt-6 flex flex-col space-y-6">
//                                 <blockquote className="border-l-4 border-gray-600 pl-4 italic text-gray-700">
//                                     "GEMS transformed my IELTS preparation! Scored Band 8.5."
//                                     <span className="block text-right font-bold">- Alex D.</span>
//                                 </blockquote>
//                                 <blockquote className="border-l-4 border-gray-600 pl-4 italic text-gray-700">
//                                     "Best institute with highly experienced tutors. Highly recommend!"
//                                     <span className="block text-right font-bold">- Sarah M.</span>
//                                 </blockquote>
//                             </div>
//                         </section>

//                         {/* Footer */}
//                         <footer className="py-12 text-center text-sm text-gray-600">
//                             © 2025 GEMS Institute. All rights reserved.
//                         </footer>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }




import { Head, Link } from "@inertiajs/react";
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';

export default function Welcome({ auth }) {
  return (
    <>
      <Head title="Welcome to GEMS - IELTS Coaching" />
      <div className="bg-gray-50 min-h-screen text-gray-700 flex flex-col">
        {/* Header */}
        <header className="w-full bg-white shadow-sm">
          <div className="max-w-7xl mx-auto flex justify-between items-center py-5 px-6">
            <div className="flex items-center gap-2">
              <SchoolIcon className="text-blue-600" fontSize="large" />
              <span className="text-2xl font-bold text-blue-600 tracking-tight">
                GEMS Institute
              </span>
            </div>
            <nav className="flex space-x-4">
              {auth.user ? (
                <>
                  {auth.user.role === "admin" && (
                    <Link
                      href={route("dashboard")}
                      className="px-4 py-2 text-blue-600 font-semibold border border-blue-600 rounded-lg transition hover:bg-blue-600 hover:text-white"
                    >
                      Dashboard
                    </Link>
                  )}
                  {auth.user.role === "frontdesk" && (
                    <Link
                      href={route("staff.index")}
                      className="px-4 py-2 text-blue-600 font-semibold border border-blue-600 rounded-lg transition hover:bg-blue-600 hover:text-white"
                    >
                      Staff Dashboard
                    </Link>
                  )}
                  {auth.user.role === "teacher" && (
                    <Link
                      href={route("courses.index")}
                      className="px-4 py-2 text-blue-600 font-semibold border border-blue-600 rounded-lg transition hover:bg-blue-600 hover:text-white"
                    >
                      My Courses
                    </Link>
                  )}
                  {auth.user.role === "student" && (
                    <Link
                      href={route("student.dashboard")}
                      className="px-4 py-2 text-blue-600 font-semibold border border-blue-600 rounded-lg transition hover:bg-blue-600 hover:text-white"
                    >
                      Student Dashboard
                    </Link>
                  )}
                </>
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
                    className="px-4 py-2 text-white bg-blue-600 font-semibold rounded-lg transition hover:bg-blue-700"
                  >
                    Register
                  </Link>
                </>
              )}
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="flex-1 bg-gradient-to-br from-blue-50 to-white py-12">
          <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-10">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-900 leading-tight mb-4">
                Achieve Your Dream IELTS Score with <span className="text-blue-600">Gifted Education</span>
              </h1>
              <p className="text-lg text-gray-700 mb-6">
                Sri Lanka’s trusted IELTS training institute, committed to helping students succeed through expert coaching and personalized support.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-6">
                <Link
                  href={route("register")}
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
                >
                  Get Started
                </Link>
                <a
                  href="#about"
                  className="px-6 py-3 text-blue-600 font-semibold border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition"
                >
                  Learn More
                </a>
              </div>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start mt-4">
                <div className="flex items-center gap-2">
                  <StarIcon className="text-yellow-400" />
                  <span className="font-bold text-gray-700">95% Success Rate</span>
                </div>
                <div className="flex items-center gap-2">
                  <EmojiEventsIcon className="text-green-500" />
                  <span className="font-bold text-gray-700">Band 8.5 Achievers</span>
                </div>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <img
                src="/images/Hero.jpeg"
                alt="IELTS Coaching"
                className="w-full max-w-md rounded-xl shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="max-w-7xl mx-auto px-6 py-12">
          <div className="bg-white rounded-xl shadow-md p-8 flex flex-col md:flex-row gap-10">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">About Gifted Education</h2>
              <p className="text-gray-700 mb-4">
                <span className="font-bold">Gifted Education (Pvt) Ltd</span> is a premier IELTS training center in Sri Lanka, founded with a mission to guide students toward achieving their academic and migration goals. Our expert instructors, structured curriculum, and student-first approach have made us a preferred choice among IELTS candidates.
              </p>
              <ul className="list-disc ml-6 text-gray-700 space-y-1">
                <li>Personalized coaching for each student</li>
                <li>Expert-led sessions on Listening, Reading, Writing, and Speaking</li>
                <li>Mock exams and performance reviews</li>
                <li>Placement tests to match your skill level</li>
              </ul>
            </div>
            <div className="flex-1 flex flex-col gap-6">
              <div className="bg-blue-50 rounded-lg p-5 shadow flex flex-col gap-2">
                <span className="font-bold text-blue-700 text-lg">Vision</span>
                <p className="text-gray-700">
                  To be Sri Lanka’s leading institute for IELTS training by empowering students to achieve global opportunities through world-class English education.
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-5 shadow flex flex-col gap-2">
                <span className="font-bold text-green-700 text-lg">Mission</span>
                <p className="text-gray-700">
                  To provide personalized, effective, and ethical English language training through experienced instructors, modern teaching methods, and continuous support, enabling students to reach their highest potential and achieve success in international exams.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-center text-blue-900 mb-8">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <EmojiEventsIcon className="text-blue-600 mb-2" fontSize="large" />
              <h3 className="text-lg font-semibold mb-2">IELTS General & Academic Courses</h3>
              <ul className="list-disc ml-4 text-gray-700 text-sm space-y-1">
                <li>Intensive training programs</li>
                <li>Weekend and weekday batches</li>
                <li>Online and in-person options</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <AccessTimeIcon className="text-green-600 mb-2" fontSize="large" />
              <h3 className="text-lg font-semibold mb-2">Placement Tests Before Enrollment</h3>
              <ul className="list-disc ml-4 text-gray-700 text-sm space-y-1">
                <li>Identify your current skill level</li>
                <li>Get placed in the right batch</li>
                <li>Schedule tests easily and receive feedback</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <StarIcon className="text-yellow-500 mb-2" fontSize="large" />
              <h3 className="text-lg font-semibold mb-2">Skill-specific Focus</h3>
              <ul className="list-disc ml-4 text-gray-700 text-sm space-y-1">
                <li>Writing Clinics</li>
                <li>Speaking Practice with Feedback</li>
                <li>Listening and Reading Techniques</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <EmojiEventsIcon className="text-purple-500 mb-2" fontSize="large" />
              <h3 className="text-lg font-semibold mb-2">Progress Tracking</h3>
              <ul className="list-disc ml-4 text-gray-700 text-sm space-y-1">
                <li>Regular mock exams</li>
                <li>Score analytics and improvement plans</li>
                <li>One-on-one performance reviews</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <StarIcon className="text-pink-500 mb-2" fontSize="large" />
              <h3 className="text-lg font-semibold mb-2">Why Choose Us</h3>
              <ul className="list-disc ml-4 text-gray-700 text-sm space-y-1">
                <li>🇱🇰 Trusted by hundreds of students across Sri Lanka</li>
                <li>🎓 95% of our students achieve their target IELTS score</li>
                <li>👨‍🏫 Experienced instructors and examiners</li>
                <li>📍 Convenient location and flexible timings</li>
                <li>💻 Digital tools for placement, learning, and feedback</li>
              </ul>
            </div>
          </div>
        </section>

       

        {/* Contact & Footer */}
        <footer className="bg-white border-t mt-10 py-10">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex-1">
              <h4 className="text-lg font-bold text-blue-900 mb-2">Visit or Contact Us</h4>
              <div className="flex items-center gap-2 text-gray-700 mb-1">
                <LocationOnIcon className="text-blue-600" />
                Gifted Education (Pvt) Ltd, C07, Commercial Center, Bandarawela, Sri Lanka
              </div>
              <div className="flex items-center gap-2 text-gray-700 mb-1">
                <PhoneIcon className="text-green-600" />
                +94 77 123 4567
              </div>
              <div className="flex items-center gap-2 text-gray-700 mb-1">
                <EmailIcon className="text-red-500" />
                info@gifted-edu.lk
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <AccessTimeIcon className="text-yellow-500" />
                Mon – Sun: 8:30 AM – 5:30 PM
              </div>
            </div>
            <div className="flex-1 text-center md:text-right text-gray-500 mt-6 md:mt-0">
              <div className="mb-2">GEMS - GIFTED EDUCATION MANAGEMENT SYSTEM</div>
              <div className="text-xs">&copy; {new Date().getFullYear()} GEMS Institute. All rights reserved.</div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
