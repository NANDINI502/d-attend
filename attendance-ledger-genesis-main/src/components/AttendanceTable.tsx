
import { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Attendee, AttendanceStatus, Event } from '@/utils/types';
import { Check, X, Minus } from 'lucide-react';
import { markAttendance, publishToBlockchain } from '@/utils/mockData';
import { useToast } from '@/components/ui/use-toast';

interface AttendanceTableProps {
  event: Event;
  onAttendanceUpdate: (updatedEvent: Event) => void;
}

export const AttendanceTable = ({ event, onAttendanceUpdate }: AttendanceTableProps) => {
  const [loading, setLoading] = useState<string | null>(null);
  const [publishLoading, setPublishLoading] = useState(false);
  const { toast } = useToast();

  const handleMarkAttendance = async (attendee: Attendee, status: AttendanceStatus) => {
    setLoading(attendee.id);
    try {
      const updatedEvent = await markAttendance(event.id, attendee.id, status);
      onAttendanceUpdate(updatedEvent);
      toast({
        title: "Attendance Updated",
        description: `${attendee.name}'s attendance marked as ${status}.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update attendance.",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  const handlePublishToBlockchain = async () => {
    setPublishLoading(true);
    try {
      const { ipfsHash, blockchainTxId } = await publishToBlockchain(event.id);
      onAttendanceUpdate({ 
        ...event, 
        ipfsHash, 
        blockchainTxId 
      });
      toast({
        title: "Published to Blockchain",
        description: "Attendance data has been successfully published to the blockchain.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to publish to blockchain.",
        variant: "destructive",
      });
    } finally {
      setPublishLoading(false);
    }
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getStatusBadge = (status: AttendanceStatus) => {
    switch (status) {
      case AttendanceStatus.PRESENT:
        return (
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-web3-success"></div>
            <span>Present</span>
          </div>
        );
      case AttendanceStatus.ABSENT:
        return (
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-web3-error"></div>
            <span>Absent</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-web3-warning"></div>
            <span>Pending</span>
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Attendance List ({event.attendees.length})</h2>
        {!event.ipfsHash && (
          <Button 
            onClick={handlePublishToBlockchain}
            disabled={publishLoading}
            className="bg-web3-secondary hover:bg-web3-secondary/80"
          >
            {publishLoading ? "Publishing..." : "Publish to Blockchain"}
          </Button>
        )}
        {event.ipfsHash && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">IPFS Hash:</span>
            <span className="wallet-address">{event.ipfsHash.slice(0, 10)}...</span>
          </div>
        )}
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableCaption>
            {event.ipfsHash 
              ? "This attendance record has been verified and stored on the blockchain."
              : "Mark attendance and publish to blockchain when complete."}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Wallet Address</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Check-in Time</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {event.attendees.map((attendee) => (
              <TableRow key={attendee.id}>
                <TableCell className="font-medium">{attendee.name}</TableCell>
                <TableCell className="font-mono text-xs">
                  {truncateAddress(attendee.walletAddress)}
                </TableCell>
                <TableCell>{getStatusBadge(attendee.status)}</TableCell>
                <TableCell>{attendee.checkInTime 
                  ? new Date(attendee.checkInTime).toLocaleTimeString() 
                  : '-'}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className={`p-0 h-8 w-8 ${attendee.status === AttendanceStatus.PRESENT ? 'bg-web3-success/10 text-web3-success border-web3-success' : ''}`}
                      onClick={() => handleMarkAttendance(attendee, AttendanceStatus.PRESENT)}
                      disabled={loading === attendee.id || !!event.ipfsHash}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className={`p-0 h-8 w-8 ${attendee.status === AttendanceStatus.ABSENT ? 'bg-web3-error/10 text-web3-error border-web3-error' : ''}`}
                      onClick={() => handleMarkAttendance(attendee, AttendanceStatus.ABSENT)}
                      disabled={loading === attendee.id || !!event.ipfsHash}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className={`p-0 h-8 w-8 ${attendee.status === AttendanceStatus.PENDING ? 'bg-web3-warning/10 text-web3-warning border-web3-warning' : ''}`}
                      onClick={() => handleMarkAttendance(attendee, AttendanceStatus.PENDING)}
                      disabled={loading === attendee.id || !!event.ipfsHash}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
