const ContactUs = () => {
    return (
        <main id="contact" className="min-h-screen bg-gray-100 pb-10">
            {/* Header Section */}
            <section className="mx-auto max-w-6xl px-6 sm:px-8 pt-12 pb-8 ">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-nunito tracking-tight text-gray-900">
                    Contact <span className="text-slate-600">Us</span>
                </h1>
                <p className="mt-4 max-w-2xl font-inconsolata font-semibold text-gray-700">
                    Have questions, feedback, or ideas? We’d love to hear from you.  
                    Fill out the form below and we’ll get back to you as soon as possible.
                </p>
            </section>

            {/* Form Section */}
            <section className="mx-auto max-w-xl px-6 sm:px-8">
                <form className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 space-y-6">
                    
                    {/* Name */}
                    <div className="relative">
                        <input
                            type="text"
                            id="name"
                            placeholder=" "
                            className="peer w-full rounded-lg border border-gray-300 px-4 pt-5 pb-2 text-gray-900 placeholder-transparent focus:border-slate-500 focus:ring-2 focus:ring-slate-500 focus:outline-none"
                        />
                        <label
                            htmlFor="name"
                            className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-slate-600"
                        >
                            Name
                        </label>
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <input
                            type="email"
                            id="email"
                            placeholder=" "
                            className="peer w-full rounded-lg border border-gray-300 px-4 pt-5 pb-2 text-gray-900 placeholder-transparent focus:border-slate-500 focus:ring-2 focus:ring-slate-500 focus:outline-none"
                        />
                        <label
                            htmlFor="email"
                            className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-slate-600"
                        >
                            Email
                        </label>
                    </div>

                    {/* Message */}
                    <div className="relative">
                        <textarea
                            id="message"
                            rows="5"
                            placeholder=" "
                            className="peer w-full rounded-lg border border-gray-300 px-4 pt-5 pb-2 text-gray-900 placeholder-transparent focus:border-slate-500 focus:ring-2 focus:ring-slate-500 focus:outline-none"
                        ></textarea>
                        <label
                            htmlFor="message"
                            className="absolute left-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-slate-600"
                        >
                            Message
                        </label>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-slate-800 text-white font-semibold py-3 px-6 rounded-lg shadow hover:bg-slate-700 transition transform hover:scale-[1.02]"
                    >
                        Send Message
                    </button>
                </form>
            </section>
        </main>
    );
};

export default ContactUs;
