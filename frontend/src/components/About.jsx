import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Define your schema", icons: ["fi-br-bracket-curly", "fi-br-bracket-curly-right"],
    body: "Start with JSON Schema, a TypeScript interface, or quick fields. Mock Matrix understands structure and constraints instantly."
  },
  {
    title: "Generate clean, valid JSON in seconds", icons: ["fi-sr-file-edit"],
    body: "AI builds perfectly structured mock data—no hand-formatting, no copy-paste rituals. Just press generate."
  },
  {
    title: "Get a shareable URL", icons: ["fi-br-link-alt"],
    body: "Access your mock data via an instant, public URL. Perfect for testing APIs, demos, and docs."
  },
  {
    title: "Edit, version, reuse", icons: ["fi-sr-paint"],
    body: "Save presets, tweak on the fly, and reuse configurations across projects and teams."
  },
];

const container = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function StepCard({ index, icons, title, body, align = "left" }) {
  const alignText = align === "right" ? "md:text-right" : "md:text-left";
  const iconRowAlign =
    align === "right" ? "md:flex-row-reverse md:justify-end" : "md:justify-start";

  return (
    <div className={[
      "rounded-2xl border border-slate-700 bg-slate-800/80 backdrop-blur",
      "p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow",
      alignText
    ].join(" ")}
    >
      <div className={[
        "mb-2 inline-flex items-center gap-2 text-[11px] uppercase tracking-wide",
        "text-slate-300",
        align === "right" ? "md:flex-row-reverse" : "",
      ].join(" ")}
      >
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-slate-900 text-xs">
          {index}
        </span>
        <span className="font-semibold">Step {index}</span>
      </div>

      <div className={`flex gap-2 mt-2 ${align == 'left' ? " justify-start " : "justify-end "}`}>
        <div className="flex">
          {icons.map((icon, i) => (
            <i key={i} className={`fi ${icon} text-white mt-1`} />
          ))}
        </div>
        <p className="text-lg sm:text-xl nunito-600 text-gray-100">{title}</p>
      </div>

      <p className="mt-2 text-sm sm:text-[15px] font-inconsolata leading-relaxed text-slate-300">
        {body}
      </p>
    </div>
  );
}

const About = () => {
  return (
    <main id="about" className="min-h-screen bg-slate-900">
      {/* Header */}
      <section className="mx-auto max-w-6xl px-6 sm:px-8 pt-16 pb-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-nunito tracking-tight text-white">
          About <span className="text-slate-300">Mock Matrix</span>
        </h1>
        <p className="mt-4 max-w-2xl font-inconsolata font-semibold text-slate-400">
          Mock Matrix is an AI-powered JSON builder designed for developers who value speed, precision, and simplicity. Whether you’re prototyping, testing APIs, or creating structured data, Mock Matrix instantly generates JSON that fits your schema — no manual formatting, no wasted time.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 bg-slate-800/70 backdrop-blur px-4 py-2 rounded-lg border border-slate-700">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          <p className="text-sm font-inconsolata text-slate-100">
            AI JSON, <span className="font-semibold">ready in seconds</span>
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative mx-auto max-w-6xl px-6 sm:px-8 pb-24">
        <motion.ol
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="
            relative
            grid gap-y-10
            md:grid-cols-[1fr_auto_1fr] md:gap-x-0
          "
        >
          {/* Center line on desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 h-full w-px bg-slate-700" />

          {steps.map((step, i) => {
            const isLeft = i % 2 === 0;
            return (
              <React.Fragment key={i}>
                {/* LEFT column */}
                <div className={[
                  "md:col-start-1 md:self-center md:max-w-xl",
                  isLeft ? "block md:block md:justify-self-end" : "hidden md:hidden",
                ].join(" ")}>
                  <motion.div variants={item} className="relative md:pr-3">
                    <StepCard
                      index={i + 1}
                      title={step.title}
                      icons={step.icons}
                      body={step.body}
                      align="right"
                    />
                  </motion.div>
                </div>

                {/* Center dot */}
                <div className="hidden md:col-start-2 md:flex md:items-center md:justify-center">
                  <motion.div
                    variants={item}
                    className="relative z-10 flex items-center justify-center w-4 h-4 rounded-full bg-slate-900 border-2 border-slate-600"
                  />
                </div>

                {/* RIGHT column */}
                <div className={[
                  "md:col-start-3 md:self-center md:max-w-xl",
                  isLeft ? "hidden md:hidden" : "block md:block md:justify-self-start",
                ].join(" ")}>
                  <motion.div variants={item} className="relative md:pl-3">
                    <StepCard
                      index={i + 1}
                      title={step.title}
                      icons={step.icons}
                      body={step.body}
                      align="left"
                    />
                  </motion.div>
                </div>
              </React.Fragment>
            );
          })}

        </motion.ol>
      </section>
    </main>
  );
};

export default About;
