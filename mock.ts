import { useState, useEffect } from "react";

export interface Report {
  id: string;
  mint: string;
  verdict: "LOCKED" | "NOT LOCKED" | "LOCK PRESENT BUT CONTROLLABLE";
  devWallet: string;
  lockMechanism: string;
  unlockDate: string;
  adminControl: boolean;
  upgradeable: boolean;
  earlyWithdraw: boolean;
  timestamp: string;
}

const MOCK_REPORTS: Record<string, Report> = {
  "mock-report-123": {
    id: "mock-report-123",
    mint: "7eyK9...83j",
    verdict: "LOCKED",
    devWallet: "G5t...9xL",
    lockMechanism: "Streamflow V2",
    unlockDate: "2027-01-01",
    adminControl: false,
    upgradeable: false,
    earlyWithdraw: false,
    timestamp: new Date().toISOString()
  },
  "mock-report-456": {
    id: "mock-report-456",
    mint: "BadD...123",
    verdict: "NOT LOCKED",
    devWallet: "H3x...1aB",
    lockMechanism: "None",
    unlockDate: "N/A",
    adminControl: true,
    upgradeable: true,
    earlyWithdraw: true,
    timestamp: new Date().toISOString()
  },
  "mock-report-789": {
    id: "mock-report-789",
    mint: "Risky...999",
    verdict: "LOCK PRESENT BUT CONTROLLABLE",
    devWallet: "A2z...7kM",
    lockMechanism: "PinkSale Standard",
    unlockDate: "2025-12-31",
    adminControl: true,
    upgradeable: false,
    earlyWithdraw: true,
    timestamp: new Date().toISOString()
  }
};

export async function verifyToken(mint: string): Promise<Report> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Deterministic mock based on mint length to allow testing different states
  if (mint.length % 3 === 0) {
    return {
      id: Math.random().toString(36).substring(7),
      mint,
      verdict: "LOCKED",
      devWallet: "G5t...9xL",
      lockMechanism: "Streamflow V2",
      unlockDate: "2027-01-01",
      adminControl: false,
      upgradeable: false,
      earlyWithdraw: false,
      timestamp: new Date().toISOString()
    };
  } else if (mint.length % 3 === 1) {
    return {
      id: Math.random().toString(36).substring(7),
      mint,
      verdict: "NOT LOCKED",
      devWallet: "H3x...1aB",
      lockMechanism: "None",
      unlockDate: "N/A",
      adminControl: true,
      upgradeable: true,
      earlyWithdraw: true,
      timestamp: new Date().toISOString()
    };
  } else {
    return {
      id: Math.random().toString(36).substring(7),
      mint,
      verdict: "LOCK PRESENT BUT CONTROLLABLE",
      devWallet: "A2z...7kM",
      lockMechanism: "PinkSale Standard",
      unlockDate: "2025-12-31",
      adminControl: true,
      upgradeable: false,
      earlyWithdraw: true,
      timestamp: new Date().toISOString()
    };
  }
}

export async function getReport(id: string): Promise<Report | null> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return MOCK_REPORTS[id] || MOCK_REPORTS["mock-report-123"]; // Fallback for demo
}
