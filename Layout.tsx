import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Github, Twitter, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Product", href: "/product" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Docs", href: "/docs" },
    { name: "About", href: "/about" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 px-4 pt-4">
        <div className="container mx-auto">
          <div className="bg-card/40 backdrop-blur-2xl border-2 border-white/5 rounded-2xl h-16 flex items-center justify-between px-6 shadow-2xl">
            <Link href="/">
              <a className="flex items-center gap-4 group">
                <div className="relative">
                  <img 
                    src="/ledgerlogo.png" 
                    alt="Ledger Stack Logo" 
                    className="w-12 h-12 object-contain transition-transform group-hover:scale-110 rotate-[-4deg] group-hover:rotate-0" 
                  />
                </div>
                <div className="flex flex-col -space-y-1">
                  <span className="font-heading font-black text-2xl tracking-tighter text-white drop-shadow-[0_2px_4px_rgba(45,212,191,0.5)]">
                    Ledger
                  </span>
                  <span className="font-heading font-black text-2xl tracking-tighter text-primary italic drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                    Stack
                  </span>
                </div>
              </a>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <a className={`text-sm font-black uppercase tracking-widest transition-all hover:text-primary hover:scale-110 ${
                    location === link.href ? "text-primary" : "text-muted-foreground"
                  }`}>
                    {link.name}
                  </a>
                </Link>
              ))}
              <Link href="/app">
                <Button size="sm" className="bg-white text-black hover:bg-primary hover:text-primary-foreground font-black px-6 rounded-xl cartoon-button">
                  Verify
                </Button>
              </Link>
            </nav>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-24 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={location}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-20 px-4 container mx-auto">
        <div className="bg-white/[0.02] border-2 border-dashed border-white/10 rounded-[3rem] p-12 md:p-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
             <div className="flex items-center gap-4">
                <img src="/ledgerlogo.png" alt="Logo" className="w-16 h-16 object-contain" />
                <div className="flex flex-col -space-y-2">
                  <span className="font-black text-4xl tracking-tighter text-white">Ledger</span>
                  <span className="font-black text-4xl tracking-tighter text-primary italic">Stack</span>
                </div>
             </div>
            <p className="text-xl text-muted-foreground font-medium max-w-sm">
              The ledger doesn't lie. We just make it easier to read.
            </p>
            <div className="flex gap-4">
              <SocialBtn href="https://x.com/LedgerStack" icon={<Twitter />} />
              <SocialBtn href="https://github.com/ledgerstack" icon={<Github />} />
              <SocialBtn href="mailto:hello@ledgerstack.xyz" icon={<Mail />} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 text-lg font-black uppercase tracking-widest">
            <div className="space-y-4">
              <Link href="/product"><a className="hover:text-primary block">Product</a></Link>
              <Link href="/how-it-works"><a className="hover:text-primary block">Method</a></Link>
              <Link href="/docs"><a className="hover:text-primary block">Docs</a></Link>
            </div>
            <div className="space-y-4">
              <Link href="/about"><a className="hover:text-primary block">About</a></Link>
              <Link href="/status"><a className="hover:text-primary block">Status</a></Link>
              <a href="#" className="opacity-30 cursor-not-allowed">Privacy</a>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center text-sm font-bold text-muted-foreground/40 italic">
          © 2024 Ledger Stack • RECEIPTS FROM THE SOURCE
        </div>
      </footer>
    </div>
  );
}

function SocialBtn({ href, icon }: { href: string, icon: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/5 rounded-2xl hover:bg-primary hover:text-primary-foreground transition-all cartoon-border">
      {React.cloneElement(icon as React.ReactElement, { size: 24 })}
    </a>
  );
}
