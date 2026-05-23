// Contact — socials, email, location, and availability.
// Clean footer section with prominent CTA.
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { CONTACTS, LOCATION, AVAILABILITY } from "@/constants/content";

export function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
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
            Get in Touch
          </h2>
          <p className="mt-3 text-muted-foreground text-base sm:text-lg max-w-2xl">
            Open to full-time opportunities. Let's build something impactful
            together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Contact links */}
          {CONTACTS.map((contact, i) => {
            const Icon = contact.icon;
            return (
              <motion.a
                key={contact.label}
                href={contact.href}
                target={contact.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group flex items-center gap-4 p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-primary/20 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center group-hover:bg-primary/15 transition-colors shrink-0">
                  <Icon size={18} className="text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    {contact.label}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {contact.value}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Status badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-4 mb-16"
        >
          {/* Location */}
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-white/5 bg-white/[0.02]">
            <LOCATION.icon size={16} className="text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-foreground">
                {LOCATION.label}
              </p>
              <p className="text-xs text-muted-foreground">{LOCATION.detail}</p>
            </div>
          </div>

          {/* Availability */}
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.04]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <p className="text-sm font-medium text-emerald-400">
                {AVAILABILITY.label}
              </p>
              <p className="text-xs text-emerald-400/60">
                {AVAILABILITY.detail}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground"
        >
          <p>
            © {new Date().getFullYear()} Karlis (Kam Hung Chan). All rights
            reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <Sparkles size={12} className="text-primary/60" />
            <span>Powered by Gemini & RAG</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
