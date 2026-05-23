// Experience — vertical career timeline grouped into 3 eras.
// Staggered fade-in animation as cards scroll into view.
import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { TIMELINE_ERAS, EDUCATION } from "@/constants/content";

const cardVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

export function Experience() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Experience
          </h2>
          <p className="mt-3 text-muted-foreground text-base sm:text-lg max-w-2xl">
            A unique trajectory from frontline emergency services and banking to
            high-level AI specialization.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical glow line */}
          <div className="absolute left-[19px] md:left-[23px] top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/15 to-transparent" />

          <div className="space-y-16">
            {TIMELINE_ERAS.map((era, eraIdx) => (
              <div key={era.id}>
                {/* Era header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5 }}
                  className="relative flex items-center gap-4 mb-8"
                >
                  {/* Timeline dot — era level */}
                  <div className="relative z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
                    <Briefcase className="text-primary" size={16} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {era.title}
                    </h3>
                    <span className="text-sm text-primary/70 font-medium">
                      {era.period}
                    </span>
                  </div>
                </motion.div>

                {/* Era description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="ml-14 md:ml-16 mb-6 text-sm text-muted-foreground leading-relaxed max-w-xl"
                >
                  {era.description}
                </motion.p>

                {/* Role cards */}
                <div className="ml-14 md:ml-16 space-y-4">
                  {era.roles.map((role, roleIdx) => (
                    <motion.div
                      key={`${era.id}-${roleIdx}`}
                      custom={eraIdx * 2 + roleIdx}
                      variants={cardVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-40px" }}
                      className="group relative p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300"
                    >
                      {/* Subtle hover glow */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                      <div className="relative">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                          <h4 className="font-semibold text-foreground">
                            {role.role}
                          </h4>
                          <span className="text-xs text-muted-foreground bg-white/5 px-2.5 py-1 rounded-full w-fit">
                            {role.period}
                          </span>
                        </div>
                        <p className="text-sm text-primary/70 font-medium mb-3">
                          {role.company}
                        </p>
                        <ul className="space-y-2">
                          {role.highlights.map((h, i) => (
                            <li
                              key={i}
                              className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2"
                            >
                              <span className="w-1 h-1 rounded-full bg-primary/40 mt-2 shrink-0" />
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mt-20"
        >
          <div className="relative flex items-center gap-4 mb-8">
            <div className="relative z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <GraduationCap className="text-emerald-400" size={16} />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Education</h3>
          </div>

          <div className="ml-14 md:ml-16 space-y-4">
            {EDUCATION.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-5 rounded-xl border border-white/5 bg-white/[0.02]"
              >
                <h4 className="font-semibold text-foreground text-sm">
                  {edu.degree}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {edu.institution}
                </p>
                <span className="text-xs text-muted-foreground bg-white/5 px-2.5 py-1 rounded-full mt-2 inline-block">
                  {edu.period}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
