import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Progress } from "./components/ui/progress";
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";
import { ConnectionProvider, WalletProvider, useWallet } from "@solana/wallet-adapter-react";
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { createPresaleEntry, claimTokens } from "./services/api";
import "@solana/wallet-adapter-react-ui/styles.css";

const PresalePage: React.FC = () => {
  const [amount, setAmount] = useState<string>(localStorage.getItem("amount") || "");
  const [tokenAmount, setTokenAmount] = useState<string>("0");
  const [paymentMethod, setPaymentMethod] = useState<string>("USDT");
  const [walletAddress, setWalletAddress] = useState<string>(localStorage.getItem("walletAddress") || "");
  const [referralCode, setReferralCode] = useState<string>(localStorage.getItem("referralCode") || "");
  const [message, setMessage] = useState<string>("");
  const [showReceipt, setShowReceipt] = useState<boolean>(false);
  const [receipt, setReceipt] = useState<any>(null);
  const [totalRaised] = useState<number>(25000); // Demo value

  const endpoint = clusterApiUrl("devnet");
  const wallets = [new PhantomWalletAdapter(), new SolflareWalletAdapter()];
  const { connected, publicKey } = useWallet();

  // Automatically update wallet address when connected
  useEffect(() => {
    if (connected && publicKey) {
      setWalletAddress(publicKey.toBase58());
    }
  }, [connected, publicKey]);

  // Save form data to localStorage to prevent refresh loss
  useEffect(() => {
    localStorage.setItem("amount", amount);
    localStorage.setItem("walletAddress", walletAddress);
    localStorage.setItem("referralCode", referralCode);
  }, [amount, walletAddress, referralCode]);

  const getCurrentPrice = () => {
    if (totalRaised < 50000) return 0.05;
    if (totalRaised < 200000) return 0.075;
    return 0.1;
  };

  const tier1Progress = Math.min((totalRaised / 50000) * 100, 100);
  const tier2Progress = totalRaised > 50000 ? Math.min(((totalRaised - 50000) / 150000) * 100, 100) : 0;

  useEffect(() => {
    if (amount) {
      const tokens = parseFloat(amount) / getCurrentPrice();
      setTokenAmount(tokens.toLocaleString());
    }
  }, [amount]);

  const handleCreatePresaleEntry = async () => {
    try {
      if (!amount || !walletAddress) {
        setMessage("Amount and Wallet Address are required!");
        return;
      }
      const result = await createPresaleEntry({
        amount: parseFloat(amount),
        walletAddress,
        referredCode: referralCode,
      });
      setReceipt(result);
      setShowReceipt(true);
      setMessage("");
    } catch (error) {
      setMessage("Error creating presale entry.");
    }
  };

  const handleClaimTokens = async () => {
    try {
      if (!walletAddress) {
        setMessage("Wallet Address is required!");
        return;
      }
      const result = await claimTokens({ walletAddress });
      setReceipt(result);
      setShowReceipt(true);
      setMessage("");
    } catch (error) {
      setMessage("Error claiming tokens.");
    }
  };

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 text-white relative">
            {/* Wallet Connect Button at the Top-Right */}
            <div className="fixed top-4 right-4 z-50">
              <WalletMultiButton className="bg-indigo-600 hover:bg-indigo-700 rounded-lg px-4 py-2 text-sm font-semibold shadow-lg" />
            </div>

            {/* Main Content */}
            <div className="flex justify-center items-center min-h-screen px-6">
              <div className="w-full max-w-4xl bg-white text-gray-800 rounded-lg shadow-xl p-8 space-y-8">
                {/* Header Section */}
                <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-3xl font-extrabold text-center text-indigo-700">
                      ETR Token Presale
                    </CardTitle>
                    <p className="text-center text-gray-600">
                      Join the future of cross-border payments in Africa
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {/* Price Section */}
                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Current Price: ${getCurrentPrice()}</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Tier 1: $0.05</span>
                            <span>{Math.min(totalRaised, 50000)}$ / 50,000$</span>
                          </div>
                          <Progress value={tier1Progress} className="h-2 bg-blue-300" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Tier 2: $0.075</span>
                            <span>{Math.max(Math.min(totalRaised - 50000, 150000), 0)}$ / 150,000$</span>
                          </div>
                          <Progress value={tier2Progress} className="h-2 bg-purple-300" />
                        </div>
                      </div>

                      {/* Supported Payment Methods */}
                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Supported Payment Methods</h3>
                        <div className="grid grid-cols-3 gap-4">
                          {["BTC", "ETH", "USDT", "SOL", "FIAT"].map((method) => (
                            <Button
                              key={method}
                              variant={paymentMethod === method ? "default" : "outline"}
                              onClick={() => setPaymentMethod(method)}
                              className="w-full"
                            >
                              {method}
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* Investment Section */}
                      <div className="space-y-6">
                        <Input
                          type="number"
                          placeholder="Investment Amount (USD)"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="w-full border-gray-300 focus:ring-indigo-500"
                        />
                        <p className="text-sm text-gray-600">You will receive: {tokenAmount} ETR tokens</p>
                        <Input
                          type="text"
                          placeholder="Wallet Address"
                          value={walletAddress}
                          onChange={(e) => setWalletAddress(e.target.value)}
                          readOnly={connected}
                          className="w-full border-gray-300 focus:ring-indigo-500"
                        />
                        <Input
                          type="text"
                          placeholder="Referral Code (Optional)"
                          value={referralCode}
                          onChange={(e) => setReferralCode(e.target.value)}
                          className="w-full border-gray-300 focus:ring-indigo-500"
                        />
                        <Button className="w-full bg-indigo-600 hover:bg-indigo-700" onClick={handleCreatePresaleEntry}>
                          Purchase ETR Tokens
                        </Button>
                        <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={handleClaimTokens}>
                          Claim Tokens
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Display Success Message or Receipt */}
                {showReceipt && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-md">
                    <h3 className="font-semibold text-lg text-indigo-600">Transaction Receipt</h3>
                    <pre className="text-sm text-gray-800 overflow-x-auto">
                      {JSON.stringify(receipt, null, 2)}
                    </pre>
                  </div>
                )}

                {message && <p className="text-center text-red-600">{message}</p>}
              </div>
            </div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default PresalePage;