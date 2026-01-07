import { Button } from "@/components/ui/button";
import { Github, Twitter, Mail } from "lucide-react";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-3xl text-center space-y-12">
      <div className="space-y-6">
        <h1 className="text-4xl font-bold">The ledger doesn’t lie.</h1>
        <p className="text-2xl text-muted-foreground font-light leading-relaxed">
          "Trust, but verify" is dead. <br />
          <span className="text-foreground font-normal">Don't trust. Verify.</span>
        </p>
      </div>
      
      <div className="prose prose-invert mx-auto">
        <p>
          LedgerStack was built to bring transparency to the wildest frontier of crypto. 
          Every day, thousands of tokens are launched. Most are scams. Some are gems. 
          The difference is often hidden in the code.
        </p>
        <p>
          We are not a watchdog. We are a microscope. We provide the tools for you to see 
          what is actually happening on-chain, stripping away the marketing fluff and 
          showing you the cold, hard receipts.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 pt-8">
        <a href="https://x.com/LedgerStack" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" className="gap-2">
            <Twitter size={18} />
            Follow on X
          </Button>
        </a>
        <a href="https://github.com/ledgerstack" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" className="gap-2">
            <Github size={18} />
            GitHub
          </Button>
        </a>
        <a href="mailto:hello@ledgerstack.xyz">
          <Button variant="outline" className="gap-2">
            <Mail size={18} />
            Contact Us
          </Button>
        </a>
      </div>
    </div>
  );
}
