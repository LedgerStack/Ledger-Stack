import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

export default function Product() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl space-y-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <h1 className="text-4xl md:text-5xl font-bold">The Standard for Token Verification</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          We strip away the noise and give you the raw data, interpreted. 
          LedgerStack is the due diligence layer for the meme economy.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* What we check */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card/50 border border-primary/20 rounded-3xl p-8"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Check className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">What We Check</h2>
          </div>
          
          <ul className="space-y-4">
            <FeatureRow title="Lock Mechanism Type" text="Identify Streamflow, PinkSale, or custom contracts." />
            <FeatureRow title="Unlock Time" text="Exact timestamp when tokens become liquid." />
            <FeatureRow title="Admin Control" text="Can the developer pause or blacklist wallets?" />
            <FeatureRow title="Upgradeability" text="Can the code be changed after launch?" />
            <FeatureRow title="Early Withdraw" text="Are there loopholes to remove liquidity early?" />
          </ul>
        </motion.div>

        {/* What we don't do */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card/50 border border-white/5 rounded-3xl p-8 relative overflow-hidden"
        >
          {/* Subtle warning pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-20" />
          
          <div className="flex items-center gap-4 mb-8 relative">
            <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
              <X className="w-6 h-6 text-secondary" />
            </div>
            <h2 className="text-2xl font-bold">What We Do Not Do</h2>
          </div>

          <ul className="space-y-6 relative">
            <NonFeatureRow title="No Price Predictions" text="We analyze security, not market sentiment. We don't know if 'number go up'." />
            <NonFeatureRow title="No Alpha Calls" text="LedgerStack is neutral infrastructure. We don't promote tokens." />
            <NonFeatureRow title="No Shilling" text="Paid verification results are strictly impossible by design." />
          </ul>
        </motion.div>
      </div>

      <div className="bg-white/5 rounded-3xl p-12 text-center border border-white/10">
        <h3 className="text-2xl font-bold mb-4">Powered by Solana RPC</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We query the blockchain directly for every report. No cached stale data. No trust assumptions.
        </p>
      </div>
    </div>
  );
}

function FeatureRow({ title, text }: { title: string, text: string }) {
  return (
    <li className="flex gap-4">
      <div className="mt-1 min-w-1.5 min-h-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
      <div>
        <h4 className="font-bold text-foreground">{title}</h4>
        <p className="text-sm text-muted-foreground">{text}</p>
      </div>
    </li>
  );
}

function NonFeatureRow({ title, text }: { title: string, text: string }) {
  return (
    <li className="flex gap-4 opacity-80">
      <div className="mt-1 min-w-1.5 min-h-1.5 w-1.5 h-1.5 rounded-full bg-secondary" />
      <div>
        <h4 className="font-bold text-foreground">{title}</h4>
        <p className="text-sm text-muted-foreground">{text}</p>
      </div>
    </li>
  );
}
