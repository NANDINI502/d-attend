
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { EventType } from '@/utils/types';
import { createEvent } from '@/utils/mockData';
import { useToast } from '@/components/ui/use-toast';

interface CreateEventModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEventCreated: () => void;
}

export const CreateEventModal = ({ open, onOpenChange, onEventCreated }: CreateEventModalProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState<EventType>(EventType.HACKATHON);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const handleCreateEvent = async () => {
    if (!name || !description || !location || !date) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    setIsCreating(true);
    try {
      await createEvent({
        name,
        description,
        location,
        type,
        date: date.toISOString(),
      });

      toast({
        title: "Event Created",
        description: "Your event has been successfully created.",
      });
      
      onEventCreated();
      onOpenChange(false);
      resetForm();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create event.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setLocation('');
    setType(EventType.HACKATHON);
    setDate(new Date());
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] bg-web3-card border-border/30">
        <DialogHeader>
          <DialogTitle className="gradient-text text-2xl">Create New Event</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new blockchain-verified event.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-5 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Event Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ETHGlobal Hackathon"
              className="bg-background/30"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="type">Event Type</Label>
            <Select 
              value={type} 
              onValueChange={(value) => setType(value as EventType)}
            >
              <SelectTrigger className="bg-background/30">
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent className="bg-web3-card border-border/30">
                <SelectItem value={EventType.HACKATHON}>{EventType.HACKATHON}</SelectItem>
                <SelectItem value={EventType.CONCERT}>{EventType.CONCERT}</SelectItem>
                <SelectItem value={EventType.COLLEGE}>{EventType.COLLEGE}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your event in a few words..."
              className="bg-background/30"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="San Francisco, CA"
                className="bg-background/30"
              />
            </div>
            
            <div className="grid gap-2">
              <Label>Event Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal bg-background/30",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-web3-card border-border/30">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="bg-web3-card"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-web3-primary text-web3-primary">
            Cancel
          </Button>
          <Button onClick={handleCreateEvent} disabled={isCreating} className="bg-web3-primary hover:bg-web3-primary/80">
            {isCreating ? "Creating..." : "Create Event"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
