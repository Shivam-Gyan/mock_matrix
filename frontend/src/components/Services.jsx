import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
const Services = () => {
    const jsonServices = [
        "products",
        "users",
        "posts",
        "comments",
        "todos",
        "carts",
        "quotes",
        "recipes",
        "auth",
        "http",
        "boardings",
        "leaderboards",
        "joblists",
        "faqs"
    ];

    return (
        <main id="services" className="min-h-screen mt-10 bg-slate-900">
            <section className="mx-auto max-w-6xl px-6 sm:px-8 pt-16 pb-8">
                {/* Title */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-nunito tracking-tight text-white">
                    Services <span className="text-slate-300">we provide</span>
                </h1>

                {/* Intro */}
                <p className="mt-4 max-w-2xl font-inconsolata font-semibold text-slate-400">
                    Mock Matrix is your AI-powered JSON companion, built for developers who demand speed, accuracy, and ease.
                    Whether you’re prototyping, testing APIs, or crafting structured datasets, it instantly delivers JSON that fits your schema — no manual formatting, no delays.
                    Plus, get free, ready-to-use JSON URLs for popular datasets like Products, Users, Posts, Comments, Todos, Carts, Quotes, Recipes, Auth, HTTPS, Boarding Pass, Leaderboard, Job Lists, and FAQs.
                </p>


                {/* Highlight Badge */}
                <div className="mt-6 inline-flex items-center gap-2 bg-slate-800/70 backdrop-blur px-4 py-2 rounded-lg border border-slate-700">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    <p className="text-sm font-inconsolata text-slate-100">
                        AI JSON, <span className="font-semibold">ready in seconds</span>
                    </p>
                </div>

                {/* Service List */}
                <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {jsonServices.map((service, index) => {
                        if (service === "auth") {
                            return(<button
                                    onClick={()=> toast.error('please follow docs for auth')}
                                    key={index}
                                    // to={`${import.meta.env.VITE_API_BASE_URL}/${service == "http" ? "http/200" : service}`}
                                    className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center hover:bg-slate-800 transition-colors"
                                >
                                    <p className="text-slate-200 font-semibold">{service}/</p>
                                </button>)

                        }
                        else {
                            return (
                                <Link
                                    key={index}
                                    target="_blank"
                                    to={`${import.meta.env.VITE_API_BASE_URL}/${service == "http" ? "http/200" : service}`}
                                    className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center hover:bg-slate-800 transition-colors"
                                >
                                    <p className="text-slate-200 font-semibold">{service}/</p>
                                </Link>
                            )
                        }
                    })}
                </div>
            </section>
        </main>
    )
}

export default Services
