import { Link, Route, Switch, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function Docs() {
  const [location] = useLocation();

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row gap-12">
      {/* Sidebar */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <nav className="sticky top-24 space-y-8">
          <div>
            <h4 className="font-bold text-white mb-4 px-2">Getting Started</h4>
            <ul className="space-y-1">
              <li><NavLink href="/docs" active={location === "/docs"}>Overview</NavLink></li>
              <li><NavLink href="/docs/verification-rules" active={location === "/docs/verification-rules"}>Verification Rules</NavLink></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4 px-2">Developers</h4>
            <ul className="space-y-1">
              <li><NavLink href="/docs/api" active={location === "/docs/api"}>API Reference</NavLink></li>
            </ul>
          </div>
        </nav>
      </aside>

      {/* Content */}
      <div className="flex-grow max-w-3xl prose prose-invert prose-headings:font-heading prose-a:text-primary">
        <Switch>
          <Route path="/docs/api">
            <ApiDocs />
          </Route>
          <Route path="/docs">
             <OverviewDocs />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

function NavLink({ href, active, children }: { href: string, active: boolean, children: React.ReactNode }) {
  return (
    <Link href={href}>
      <a className={`block px-3 py-2 rounded-md text-sm transition-colors ${
        active 
          ? "bg-primary/10 text-primary font-medium" 
          : "text-muted-foreground hover:text-white hover:bg-white/5"
      }`}>
        {children}
      </a>
    </Link>
  );
}

function OverviewDocs() {
  return (
    <div className="space-y-8">
      <h1>Documentation</h1>
      <p className="lead text-xl text-muted-foreground">
        LedgerStack provides programmatic access to token verification data.
      </p>
      
      <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-200 text-sm">
        <strong>Disclaimer:</strong> This is not financial advice. Data is derived from public chain state.
      </div>

      <hr className="border-white/10" />
      
      <h3>What is LedgerStack?</h3>
      <p>
        LedgerStack is an on-chain verification engine specifically tuned for the Solana meme token ecosystem. 
        It parses complex lock contracts and admin settings to provide a simple "Safe" or "Unsafe" verdict.
      </p>

      <h3>Key Concepts</h3>
      <ul>
        <li><strong>Verdict:</strong> The high-level safety assessment (Locked, Unlocked, Warning).</li>
        <li><strong>Dev Ledger:</strong> The history of wallets associated with a token's creator.</li>
        <li><strong>Authority:</strong> The privileges retained by the contract owner (freeze, mint, upgrade).</li>
      </ul>
    </div>
  );
}

function ApiDocs() {
  return (
    <div className="space-y-8">
      <h1>API Reference</h1>
      <p>
        Integrate LedgerStack verification into your own bot, dashboard, or wallet.
      </p>

      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-xs font-mono font-bold">GET</span>
            <code className="text-sm">/api/verify</code>
          </div>
          <p className="text-sm text-muted-foreground mb-3">Initiate a verification scan for a token mint.</p>
          <pre className="bg-black/50 border border-white/10 p-4 rounded-lg overflow-x-auto text-sm text-muted-foreground">
{`GET /api/verify?token=7eyK9...83j

{
  "id": "rep_123456",
  "verdict": "LOCKED",
  "timestamp": "2024-03-20T10:00:00Z"
}`}
          </pre>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-xs font-mono font-bold">GET</span>
            <code className="text-sm">/api/report/:id</code>
          </div>
          <p className="text-sm text-muted-foreground mb-3">Retrieve a stored report by ID.</p>
          <pre className="bg-black/50 border border-white/10 p-4 rounded-lg overflow-x-auto text-sm text-muted-foreground">
{`GET /api/report/rep_123456

{
  "id": "rep_123456",
  "mint": "7eyK9...83j",
  "details": {
    "liquidity_locked": true,
    "mint_authority": false
  }
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}
