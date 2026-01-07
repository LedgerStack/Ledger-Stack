import { CheckCircle2, AlertCircle } from "lucide-react";

export default function Status() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">System Status</h1>
      
      <div className="space-y-4">
        <StatusItem name="API" status="Operational" />
        <StatusItem name="Solana Indexer" status="Operational" />
        <StatusItem name="Web Interface" status="Operational" />
        <StatusItem name="RPC Node (Helius)" status="Degraded" isDegraded />
      </div>

      <div className="mt-12 pt-12 border-t border-white/5">
        <h3 className="font-bold mb-6">Uptime History</h3>
        <div className="flex gap-1 h-8">
           {Array.from({ length: 60 }).map((_, i) => (
             <div 
               key={i} 
               className={`flex-1 rounded-sm ${
                 i === 42 ? "bg-yellow-500/50" : "bg-primary/40"
               }`} 
               title={i === 42 ? "Degraded Performance" : "Operational"}
             />
           ))}
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>60 days ago</span>
          <span>Today</span>
        </div>
      </div>
    </div>
  );
}

function StatusItem({ name, status, isDegraded }: { name: string, status: string, isDegraded?: boolean }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-card border border-white/5">
      <span className="font-medium">{name}</span>
      <div className="flex items-center gap-2">
        <span className={`text-sm ${isDegraded ? "text-yellow-400" : "text-green-400"}`}>
          {status}
        </span>
        {isDegraded ? (
          <AlertCircle className="w-5 h-5 text-yellow-400" />
        ) : (
          <CheckCircle2 className="w-5 h-5 text-green-400" />
        )}
      </div>
    </div>
  );
}
