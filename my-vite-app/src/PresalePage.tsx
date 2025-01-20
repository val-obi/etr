import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Progress } from './components/ui/progress';
import { Wallet, Copy } from 'lucide-react';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css';

const PresalePage = () => {
  const [amount, setAmount] = useState('');
  const [tokenAmount, setTokenAmount] = useState('0');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [totalRaised] = useState(25000); // Demo value
  const [connectedWallet, setConnectedWallet] = useState(false);

  // Demo referral link
  const referralLink = 'https://etr-presale.com/?ref=YOUR_ADDRESS';

  // Calculate current price tier based on total raised
  const getCurrentPrice = () => {
    if (totalRaised < 50000) return 0.05;
    if (totalRaised < 200000) return 0.075;
    return 0.10;
  };

  // Calculate progress percentages for price tiers
  const tier1Progress = Math.min((totalRaised / 50000) * 100, 100);
  const tier2Progress = totalRaised > 50000 ? Math.min(((totalRaised - 50000) / 150000) * 100, 100) : 0;

  // Calculate tokens based on investment amount
  useEffect(() => {
    if (amount) {
      const tokens = parseFloat(amount) / getCurrentPrice();
      setTokenAmount(tokens.toLocaleString());
    }
  }, [amount]);

  // Wallet configuration
  const endpoint = clusterApiUrl('devnet');
  const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
  ];

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div className="max-w-4xl mx-auto p-6 space-y-6">
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center text-blue-900">
                  ETR Token Presale
                </CardTitle>
                <p className="text-center text-gray-600">
                  Join the future of cross-border payments in Africa
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Current Price: ${getCurrentPrice()}</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Tier 1: $0.05</span>
                        <span>{Math.min(totalRaised, 50000)}$ / 50,000$</span>
                      </div>
                      <Progress value={tier1Progress} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Tier 2: $0.075</span>
                        <span>{Math.max(Math.min(totalRaised - 50000, 150000), 0)}$ / 150,000$</span>
                      </div>
                      <Progress value={tier2Progress} className="h-2" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Investment Amount (USD)</label>
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
                        className="w-full"
                      />
                      <p className="mt-2 text-sm text-gray-600">
                        You will receive: {tokenAmount} ETR tokens
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      {['BTC', 'ETH', 'USDT', 'SOL', 'FIAT'].map((method) => (
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
                    <div className="space-y-4">
                      {paymentMethod === 'FIAT' ? (
                        <Input
                          placeholder="Enter your wallet address"
                          value={walletAddress}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWalletAddress(e.target.value)}
                          className="w-full"
                          readOnly
                        />
                      ) : (
                        <Button
                          className="w-full"
                          onClick={() => setConnectedWallet(!connectedWallet)}
                        >
                          <Wallet className="mr-2 h-4 w-4" />
                          {connectedWallet ? 'Wallet Connected' : 'Connect Wallet'}
                        </Button>
                      )}
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        Purchase ETR Tokens
                      </Button>
                    </div>
                  </div>
                  <Card className="bg-blue-50">
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-4">Referral Program</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Earn rewards when others purchase using your referral link:
                        <br />
                        Level 1: 5% • Level 2: 3% • Level 3: 2%
                      </p>
                      <div className="flex items-center gap-2">
                        <Input value={referralLink} readOnly className="flex-1" />
                        <Button variant="outline" size="icon">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  <div className="text-center space-y-4">
                    <h3 className="font-semibold">Our Partners</h3>
                    <div className="grid grid-cols-4 gap-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-16 bg-gray-100 rounded flex items-center justify-center">
                          Partner {i}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default PresalePage;