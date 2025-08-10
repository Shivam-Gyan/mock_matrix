import { useState } from "react";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
        type: 'feedback',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        // send logic here...
    };

    return (
        <main id="contact" className="min-h-screen pb-10 bg-gray-100 ">

            <section className="mx-auto max-w-6xl px-6 sm:px-8 pt-16 pb-8">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-nunito tracking-tight text-slate-600">
                    Co<span className="text-slate-500">ntact</span> Us
                </h1>
                <p className="mt-4 max-w-2xl font-inconsolata font-semibold text-slate-400">
                    Have a question, feedback, or partnership opportunity?
                    Fill out the form, and we’ll get back to you as soon as possible.
                </p>
                <div className="mt-6 inline-flex items-center gap-2 bg-gray-200/70 backdrop-blur px-4 py-2 rounded-lg border border-gray-400">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    <p className="text-sm font-inconsolata text-slate-800">
                        want collaboration? <span className="font-semibold">Let’s talk!</span>
                    </p>
                </div>
            </section>
            <div className="max-w-lg  mx-auto">

                {/* type selection */}
                <div className="flex gap-4 justify-evenly mb-3">
                    <button
                        onClick={() => setFormData({ ...formData, type: 'question' })}
                        className={
                            (formData.type === 'question'
                                ? 'bg-slate-800 text-white'
                                : 'bg-gray-300') +
                            ' px-4 py-2 rounded-lg text-sm nunito-600 hover:shadow-md'
                        }
                    >
                        Question?
                    </button>

                    <button
                        onClick={() => setFormData({ ...formData, type: 'feedback' })}
                        className={
                            (formData.type === 'feedback'
                                ? 'bg-slate-800 text-white'
                                : 'bg-gray-300') +
                            ' px-4 py-2 rounded-lg text-sm nunito-600 hover:shadow-md'
                        }
                    >
                        Feedback?
                    </button>

                    <button
                        onClick={() => setFormData({ ...formData, type: 'collab' })}
                        className={
                            (formData.type === 'collab'
                                ? 'bg-slate-800 text-white'
                                : 'bg-gray-300') +
                            ' px-4 py-2 rounded-lg text-sm nunito-600 hover:shadow-md'
                        }
                    >
                        Collab?
                    </button>
                </div>

                {/* Right side - Form */}
                <div className="p-5 shadow-xl shadow-slate-400 bg-gray-200/70 rounded-lg border-[1px] border-gray-200 backdrop-blur-lg">
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div>
                            <label className="block text-gray-700 font-medium">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-slate-400 outline-none bg-white/70"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Your Email"
                                className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-slate-400 outline-none bg-white/70"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium">Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Your Message"
                                rows="4"
                                className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-slate-400 outline-none bg-white/70 resize-none"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className=" px-4 py-4 rounded-lg text-sm font-nunito bg-slate-800 text-white hover:bg-slate-700 transition-colors w-full"
                        >
                            Send Message
                        </button>
                    </form>
                </div>

            </div>
        </main>
    );
};

export default ContactUs;
