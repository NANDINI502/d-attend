
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { AttendanceStatus } from "@/utils/types";
import { UserPlus } from "lucide-react";

interface AddAttendeeFormProps {
  eventId: string;
  onAttendeeAdded: () => void;
}

export const AddAttendeeForm = ({ eventId, onAttendeeAdded }: AddAttendeeFormProps) => {
  const [name, setName] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Helper to generate a random mock Ethereum address
  const generateRandomAddress = () => {
    let address = '0x';
    const characters = '0123456789abcdef';
    for (let i = 0; i < 40; i++) {
      address += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return address;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter an attendee name",
        variant: "destructive",
      });
      return;
    }

    // Use the provided wallet address or generate one if empty
    const finalWalletAddress = walletAddress.trim() || generateRandomAddress();

    setIsSubmitting(true);
    try {
      // Call the addAttendee function from mockData
      await window.addAttendee(eventId, {
        name: name.trim(),
        walletAddress: finalWalletAddress,
        status: AttendanceStatus.PENDING
      });
      
      toast({
        title: "Attendee Added",
        description: `${name} has been added to the attendance list.`,
      });
      
      // Reset form
      setName("");
      setWalletAddress("");
      
      // Notify parent component to refresh the list
      onAttendeeAdded();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add attendee.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter attendee name"
          className="bg-background/30"
        />
      </div>
      
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="walletAddress">Wallet Address (optional)</Label>
        <Input
          id="walletAddress"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          placeholder="Enter wallet address or leave empty to generate"
          className="bg-background/30 font-mono text-xs"
        />
      </div>
      
      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-web3-primary hover:bg-web3-primary/80 flex items-center gap-2"
      >
        <UserPlus className="h-4 w-4" />
        {isSubmitting ? "Adding..." : "Add Attendee"}
      </Button>
    </form>
  );
};
