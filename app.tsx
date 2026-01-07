import { useState } from "react";
import { useLocation } from "wouter";
import { Search, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { verifyToken } from "@/lib/mock";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const [mint, setMint] = useState("");
  const [loading, setLoading] = useState(false);
  const [advanced, setAdvanced] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mint) return;

    setLoading(true);
    try {
      const report = await verifyToken(mint);
      setLocation(`/report/${report.id}`);
    } catch (error) {
      toast({ title: "Oops!", description: "Something went wrong.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-32 max-w-2xl relative">
      <div className="blob w-[300px] h-[300px] bg-primary/10 -top-24 -left-24" />
      
      <motion.div
        initial={{ opacity: 0, y: 20, rotate: -1 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        className="space-y-12 relative z-10"
      >
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-black tracking-tighter">Check Ledger</h1>
          <p className="text-xl text-muted-foreground font-medium">Drop a mint address to see the receipts.</p>
        </div>

        <div className="bg-card border-4 border-white/5 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
            <Sparkles size={100} />
          </div>

          <form onSubmit={handleVerify} className="space-y-8">
            <div className="space-y-3">
              <Label htmlFor="mint" className="text-lg font-black uppercase tracking-widest ml-1">Mint Address</Label>
              <div className="relative">
                <Input 
                  id="mint"
                  placeholder="Paste address here..."
                  className="bg-black/40 border-2 border-white/10 h-20 text-2xl font-bold rounded-2xl px-6 focus:border-primary transition-all placeholder:text-white/20"
                  value={mint}
                  onChange={(e) => setMint(e.target.value)}
                />
              </div>
            </div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-between p-6 bg-white/[0.03] rounded-2xl border-2 border-white/5"
            >
              <div className="space-y-1">
                <Label className="text-xl font-bold">Deep Scan</Label>
                <p className="text-sm text-muted-foreground font-medium italic">Include historical wallet links</p>
              </div>
              <Switch checked={advanced} onCheckedChange={setAdvanced} className="scale-125" />
            </motion.div>

            <Button 
              type="submit" 
              className="w-full h-20 text-2xl font-black bg-primary text-primary-foreground hover:bg-primary/90 cartoon-button rounded-[2rem] disabled:opacity-50"
              disabled={loading || !mint}
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <Loader2 className="h-8 w-8 animate-spin" />
                  <span>Scanning...</span>
                </div>
              ) : (
                "Verify Now"
              )}
            </Button>
          </form>
        </div>

        <div className="flex justify-center gap-3">
           {["7eyK9...83j", "BadD...123", "Risky...999"].map(ex => (
             <button
               key={ex}
               onClick={() => setMint(ex)}
               className="text-sm font-black bg-white/5 px-4 py-2 rounded-xl hover:bg-primary hover:text-primary-foreground transition-all rotate-[1deg] hover:rotate-0"
             >
               {ex}
             </button>
           ))}
        </div>
      </motion.div>
    </div>
  );
}
