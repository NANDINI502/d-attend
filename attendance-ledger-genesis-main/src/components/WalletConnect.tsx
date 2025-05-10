
// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { connectWallet } from '@/utils/mockData';
// import { User } from '@/utils/types';
// import { useToast } from '@/components/ui/use-toast';

// export const WalletConnect = () => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isConnecting, setIsConnecting] = useState(false);
//   const { toast } = useToast();

//   const handleConnect = async () => {
//     setIsConnecting(true);
//     try {
//       const connectedUser = await connectWallet();
//       setUser(connectedUser);
//       toast({
//         title: "Wallet Connected",
//         description: "Your wallet has been successfully connected.",
//       });
//     } catch (error) {
//       toast({
//         title: "Connection Failed",
//         description: "Failed to connect wallet. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsConnecting(false);
//     }
//   };

//   const truncateAddress = (address: string) => {
//     return `${address.slice(0, 6)}...${address.slice(-4)}`;
//   };

//   return (
//     <div>
//       {user ? (
//         <div className="flex items-center gap-3">
//           <div className="hidden md:flex flex-col items-end">
//             <p className="text-sm font-semibold">{user.name}</p>
//             <span className="wallet-address">{truncateAddress(user.walletAddress)}</span>
//           </div>
//           <Button variant="outline" size="sm" className="border-web3-secondary text-web3-secondary hover:bg-web3-secondary/20">
//             <span className="md:hidden">{truncateAddress(user.walletAddress)}</span>
//             <span className="hidden md:inline">Disconnect</span>
//           </Button>
//         </div>
//       ) : (
//         <Button 
//           onClick={handleConnect} 
//           disabled={isConnecting}
//           className="bg-web3-primary hover:bg-web3-primary/80 animate-glow"
//         >
//           {isConnecting ? "Connecting..." : "Connect Wallet"}
//         </Button>
//       )}
//     </div>
//   );
// };
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export const WalletConnect = () => {
  const [user, setUser] = useState<{ name: string; walletAddress: string } | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum === 'undefined') {
        toast({
          title: 'MetaMask Not Installed',
          description: 'Please install MetaMask to connect your wallet.',
          variant: 'destructive',
        });
        return;
      }

      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];

      if (account) {
        setUser({
          name: 'User', // You can fetch the user's name from a service or API if available
          walletAddress: account,
        });
        toast({
          title: 'Wallet Connected',
          description: 'Your wallet has been successfully connected.',
        });
      } else {
        toast({
          title: 'Connection Failed',
          description: 'No account found. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Connection Failed',
        description: 'Failed to connect wallet. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    setUser(null);
    toast({
      title: 'Wallet Disconnected',
      description: 'You have successfully disconnected your wallet.',
    });
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div>
      {user ? (
        <div className="flex items-center gap-3">
          <div className="hidden md:flex flex-col items-end">
            <p className="text-sm font-semibold">{user.name}</p>
            <span className="wallet-address">{truncateAddress(user.walletAddress)}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-web3-secondary text-web3-secondary hover:bg-web3-secondary/20"
            onClick={handleDisconnect}
          >
            <span className="md:hidden">{truncateAddress(user.walletAddress)}</span>
            <span className="hidden md:inline">Disconnect</span>
          </Button>
        </div>
      ) : (
        <Button
          onClick={handleConnect}
          disabled={isConnecting}
          className="bg-web3-primary hover:bg-web3-primary/80 animate-glow"
        >
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </Button>
      )}
    </div>
  );
};
