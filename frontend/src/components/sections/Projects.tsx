// Projects — featured project (CardioScan) + project grid.
// Featured project gets expanded layout; smaller cards below in a 2-column grid.
import { motion } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import { PROJECTS } from "@/constants/content";

function TechBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary/80 border border-primary/10">
      {label}
    </span>
  );
}

function MetricBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/15">
      {label}
    </span>
  );
}

export function Projects() {
  const featured = PROJECTS.find((p) => p.featured);
  const others = PROJECTS.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 px-6">
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
            Projects
          </h2>
          <p className="mt-3 text-muted-foreground text-base sm:text-lg max-w-2xl">
            Building AI systems and full-stack applications with real-world
            impact.
          </p>
        </motion.div>

        {/* Featured project — CardioScan */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="group relative mb-10 p-6 sm:p-8 rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/[0.04] to-transparent hover:border-primary/25 transition-all duration-300"
          >
            {/* Featured badge */}
            <div className="flex items-center gap-2 mb-4">
              <Star size={14} className="text-amber-400 fill-amber-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-400/80">
                Featured Project
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              {featured.title}
            </h3>

            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-3xl mb-6">
              {featured.description}
            </p>

            {/* Metrics */}
            {featured.metrics && (
              <div className="flex flex-wrap gap-2 mb-6">
                {featured.metrics.map((m) => (
                  <MetricBadge key={m} label={m} />
                ))}
              </div>
            )}

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2">
              {featured.techStack.map((t) => (
                <TechBadge key={t} label={t} />
              ))}
            </div>

            {/* Subtle corner glow */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </motion.div>
        )}

        {/* Other projects — 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {others.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative p-6 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="relative">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-foreground">
                    {project.title}
                  </h3>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((t) => (
                    <TechBadge key={t} label={t} />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
