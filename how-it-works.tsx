import { motion } from "framer-motion";

export default function HowItWorks() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Verification Process</h1>
        <p className="text-xl text-muted-foreground">
          How LedgerStack generates a verdict from raw chain data.
        </p>
      </motion.div>

      <div className="relative border-l-2 border-white/10 ml-6 md:ml-12 space-y-16">
        <TimelineStep 
          step="01"
          title="Identify Dev & Allocation"
          description="We scan the token supply distribution and identify the creator wallet. We trace initial funding sources to link related deployments."
          delay={0.1}
        />
        <TimelineStep 
          step="02"
          title="Detect Lock Contract"
          description="We parse transaction history to find interactions with known liquidity locker programs (Streamflow, PinkSale, Raydium, etc)."
          delay={0.2}
        />
        <TimelineStep 
          step="03"
          title="Verify Permissions"
          description="We simulate the current state to check if the lock owner has special privileges, like the ability to migrate liquidity or change unlock times."
          delay={0.3}
        />
        <TimelineStep 
          step="04"
          title="Produce Verdict"
          description="We compile all findings into a deterministic report. If any backdoor exists, the verdict is downgraded to 'Warning' or 'Unsafe'."
          delay={0.4}
          isLast
        />
      </div>
    </div>
  );
}

function TimelineStep({ step, title, description, delay, isLast }: { step: string, title: string, description: string, delay: number, isLast?: boolean }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="relative pl-12 md:pl-16"
    >
      <div className="absolute left-[-21px] top-0 w-10 h-10 rounded-full bg-background border-4 border-primary/20 flex items-center justify-center z-10">
        <div className="w-3 h-3 rounded-full bg-primary" />
      </div>
      
      <div className="space-y-3">
        <span className="text-primary font-mono text-sm tracking-wider font-bold">STEP {step}</span>
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-muted-foreground leading-relaxed text-lg">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
