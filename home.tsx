import { ArrowRight, Shield, Search, Lock, Zap, MousePointer2 } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="space-y-32 pb-32">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 container mx-auto text-center relative overflow-visible">
        {/* Decorative Blobs */}
        <div className="blob w-[500px] h-[500px] bg-primary/20 -top-48 -left-24 animate-pulse" />
        <div className="blob w-[400px] h-[400px] bg-secondary/20 bottom-0 -right-24 animate-bounce" style={{ animationDuration: '8s' }} />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", damping: 15 }}
          className="max-w-4xl mx-auto space-y-10 relative z-10"
        >
          <motion.div 
            whileHover={{ scale: 1.05, rotate: -1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-black uppercase tracking-widest cursor-default cartoon-button"
          >
            <Zap size={14} fill="currentColor" />
            Live Receipts
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-white">
            Verify dev locks.<br />
            <span className="relative">
              <span className="relative z-10 italic">On-chain.</span>
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute bottom-2 left-0 h-4 bg-primary/40 -z-10 -rotate-1 rounded-full"
              />
            </span>
          </h1>
          
          <p className="text-2xl text-muted-foreground max-w-2xl mx-auto font-medium leading-snug">
            A Dev Ledger for memecoins. <br className="hidden md:block" />
            No claims. Just receipts. 
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
            <Link href="/app">
              <Button size="lg" className="h-16 px-10 text-xl font-black bg-primary text-primary-foreground hover:bg-primary/90 cartoon-button rounded-2xl group">
                Check Ledger
                <MousePointer2 className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
              </Button>
            </Link>
            <Link href="/report/mock-report-123">
              <Button size="lg" variant="ghost" className="h-16 px-10 text-xl font-bold text-white hover:bg-white/5 transition-all group">
                View Example
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Feature Grid - Non-Predictable Layout */}
      <section className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-7">
            <FeatureCard 
              icon={<Search className="w-10 h-10 text-primary" />}
              title="Dev Wallet Ledger"
              description="We track original dev wallets and their behavior patterns. No hidden history, no fresh starts."
              className="md:rotate-[-1deg]"
            />
          </div>
          <div className="md:col-span-5 md:mt-12">
            <FeatureCard 
              icon={<Lock className="w-10 h-10 text-secondary" />}
              title="Lock Verification"
              description="Instantly verify liquidity locks. If it's not on-chain, it doesn't exist."
              className="md:rotate-[1.5deg] bg-secondary/5"
            />
          </div>
          <div className="md:col-span-5">
            <FeatureCard 
              icon={<Shield className="w-10 h-10 text-blue-400" />}
              title="Backdoor Detection"
              description="Automated scans for upgrade authority and hidden mint functions."
              className="md:rotate-[-2deg] bg-blue-500/5"
            />
          </div>
          <div className="md:col-span-7 md:-mt-8">
             <div className="p-10 rounded-[2.5rem] bg-white/[0.02] border-2 border-dashed border-white/10 text-center flex flex-col items-center justify-center min-h-[250px] rotate-[0.5deg]">
                <h3 className="text-3xl font-black mb-4 italic">The ledger doesn't lie.</h3>
                <p className="text-muted-foreground text-lg">Every report is a permanent on-chain receipt. No deletion, no manipulation.</p>
             </div>
          </div>
        </div>
      </section>

      {/* Trust Strip - Fluid scrolling-like appearance */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            <TrustBadge text="On-chain" color="bg-primary/20 text-primary" />
            <TrustBadge text="Deterministic" color="bg-secondary/20 text-secondary" />
            <TrustBadge text="No sign-in" color="bg-blue-400/20 text-blue-400" />
            <TrustBadge text="Shareable" color="bg-yellow-400/20 text-yellow-400" />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description, className }: { icon: React.ReactNode, title: string, description: string, className?: string }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className={`p-10 rounded-[2.5rem] bg-card border-2 border-white/5 cartoon-border-hover relative overflow-hidden group ${className}`}
    >
      <div className="mb-8 p-4 bg-white/5 w-fit rounded-2xl border-2 border-white/5">
        {icon}
      </div>
      <h3 className="text-3xl font-black mb-4 tracking-tight">{title}</h3>
      <p className="text-xl text-muted-foreground font-medium leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

function TrustBadge({ text, color }: { text: string, color: string }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.1, rotate: Math.random() * 4 - 2 }}
      className={`px-8 py-4 rounded-2xl font-black text-xl tracking-tighter uppercase cursor-default cartoon-border ${color}`}
    >
      {text}
    </motion.div>
  );
}
