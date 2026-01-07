import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { Copy, ArrowLeft, CheckCircle, XCircle, AlertTriangle, Share2, MousePointer2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getReport, Report as ReportType } from "@/lib/mock";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export default function ReportPage() {
  const [, params] = useRoute("/report/:id");
  const [report, setReport] = useState<ReportType | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (params?.id) {
      getReport(params.id).then((data) => {
        setReport(data);
        setLoading(false);
      });
    }
  }, [params?.id]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Copied!",
      description: "Report link is in your clipboard.",
    });
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-24 max-w-2xl text-center"><Skeleton className="h-96 w-full rounded-[3rem] bg-white/5" /></div>;
  }

  if (!report) {
    return (
      <div className="container mx-auto px-4 py-24 text-center space-y-6">
        <h1 className="text-4xl font-black italic">Receipt Missing?</h1>
        <Link href="/app"><Button className="cartoon-button bg-primary text-primary-foreground font-black px-8 py-6 rounded-2xl">Back to App</Button></Link>
      </div>
    );
  }

  const getVerdictStyles = (verdict: string) => {
    switch (verdict) {
      case "LOCKED":
        return {
          bg: "bg-primary/20",
          text: "text-primary",
          border: "border-primary/20",
          icon: <CheckCircle className="w-12 h-12" />,
          rotate: "rotate-[-1deg]"
        };
      case "NOT LOCKED":
        return {
          bg: "bg-destructive/20",
          text: "text-destructive",
          border: "border-destructive/20",
          icon: <XCircle className="w-12 h-12" />,
          rotate: "rotate-[1deg]"
        };
      default:
        return {
          bg: "bg-yellow-500/20",
          text: "text-yellow-500",
          border: "border-yellow-500/20",
          icon: <AlertTriangle className="w-12 h-12" />,
          rotate: "rotate-[0.5deg]"
        };
    }
  };

  const styles = getVerdictStyles(report.verdict);

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <Link href="/app">
        <Button variant="ghost" className="mb-10 text-xl font-black italic group p-0 hover:bg-transparent hover:text-primary">
          <ArrowLeft className="mr-3 h-6 w-6 group-hover:-translate-x-2 transition-transform" />
          Go Back
        </Button>
      </Link>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotate: styles.rotate === "rotate-[-1deg]" ? 2 : -2 }}
        animate={{ opacity: 1, scale: 1, rotate: styles.rotate === "rotate-[-1deg]" ? -1 : 1 }}
        className={`bg-card border-4 border-white/5 rounded-[3rem] overflow-hidden shadow-2xl relative ${styles.rotate}`}
      >
        {/* Header Ribbon */}
        <div className={`p-10 border-b-4 ${styles.border} ${styles.bg} flex items-center justify-between`}>
          <div>
            <p className="text-sm font-black tracking-widest uppercase opacity-70 mb-2 italic">Official Verdict</p>
            <h1 className={`text-4xl md:text-6xl font-black tracking-tighter ${styles.text}`}>
              {report.verdict}
            </h1>
          </div>
          <div className={`${styles.text} animate-bounce`} style={{ animationDuration: '3s' }}>
            {styles.icon}
          </div>
        </div>

        {/* Content */}
        <div className="p-10 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <ReportItem label="Token Mint" value={report.mint} truncate />
            <ReportItem label="Dev Wallet" value={report.devWallet} truncate />
            <ReportItem label="Lock Mechanism" value={report.lockMechanism} />
            <ReportItem label="Unlock Date" value={report.unlockDate} highlight />
          </div>

          <div className="space-y-6 pt-10 border-t-2 border-dashed border-white/10">
            <h3 className="font-black text-white/40 uppercase text-sm tracking-[0.2em] italic">Security Analysis</h3>
            <div className="grid gap-4">
               <BooleanCheck label="Admin Control" value={report.adminControl} badIfTrue />
               <BooleanCheck label="Upgradeable" value={report.upgradeable} badIfTrue />
               <BooleanCheck label="Early Exit" value={report.earlyWithdraw} badIfTrue />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-8 bg-black/40 flex flex-col md:flex-row justify-between items-center gap-6">
           <span className="text-sm text-muted-foreground/60 font-black italic">
             RECEIPT #{report.id} • {new Date(report.timestamp).toLocaleDateString()}
           </span>
           <Button onClick={copyLink} className="cartoon-button bg-white text-black font-black px-8 py-6 rounded-2xl flex gap-3 hover:bg-primary hover:text-primary-foreground group">
             <Share2 size={20} className="group-hover:rotate-12 transition-transform" />
             Copy Receipt URL
           </Button>
        </div>
      </motion.div>
    </div>
  );
}

function ReportItem({ label, value, truncate, highlight }: { label: string, value: string, truncate?: boolean, highlight?: boolean }) {
  return (
    <div className="space-y-1">
      <p className="text-sm font-black uppercase tracking-widest text-muted-foreground/50 italic">{label}</p>
      <p className={`font-mono text-xl font-black ${truncate ? "truncate" : ""} ${highlight ? "text-primary italic underline underline-offset-8 decoration-primary/30" : "text-white"}`}>
        {value}
      </p>
    </div>
  );
}

function BooleanCheck({ label, value, badIfTrue }: { label: string, value: boolean, badIfTrue?: boolean }) {
  const isBad = badIfTrue ? value : !value;
  return (
    <div className={`flex items-center justify-between p-6 rounded-2xl border-2 transition-all ${
      isBad ? "bg-destructive/5 border-destructive/20" : "bg-primary/5 border-primary/20"
    }`}>
      <span className="font-black text-xl italic tracking-tight">{label}</span>
      <span className={`px-5 py-2 rounded-xl font-black text-sm uppercase cartoon-border ${
        isBad ? "bg-destructive text-destructive-foreground" : "bg-primary text-primary-foreground"
      }`}>
        {value ? "YES" : "NO"}
      </span>
    </div>
  );
}
