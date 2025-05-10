
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Clock, Users, ExternalLink } from 'lucide-react';
import { Event, EventType } from "@/utils/types";
import { AttendanceTable } from "./AttendanceTable";
import { AddAttendeeForm } from "./AddAttendeeForm";

interface EventDetailsProps {
  event: Event;
  onEventUpdate: (updatedEvent: Event) => void;
}

export const EventDetails = ({ event, onEventUpdate }: EventDetailsProps) => {
  const [activeTab, setActiveTab] = useState("details");
  
  const getEventTypeBadgeColor = (type: EventType) => {
    switch (type) {
      case EventType.CONCERT:
        return "bg-web3-accent/10 text-web3-accent";
      case EventType.HACKATHON:
        return "bg-web3-secondary/10 text-web3-secondary";
      case EventType.COLLEGE:
        return "bg-web3-primary/10 text-web3-primary";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const eventDate = new Date(event.date);

  const handleAttendeeAdded = () => {
    // Reload the event to show the updated attendee list
    window.getEvent(event.id).then(updatedEvent => {
      if (updatedEvent) {
        onEventUpdate(updatedEvent);
      }
    });
  };

  return (
    <div className="space-y-6">
      <Card className="web3-card">
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge variant="outline" className={getEventTypeBadgeColor(event.type)}>
              {event.type}
            </Badge>
            {event.ipfsHash && (
              <Badge variant="outline" className="bg-web3-success/10 text-web3-success">
                Verified on Chain
              </Badge>
            )}
          </div>
          <CardTitle className="text-2xl">{event.name}</CardTitle>
          <CardDescription>{event.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-background/40 flex items-center justify-center">
                <Calendar className="h-4 w-4 text-web3-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p>{eventDate.toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric'
                })}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-background/40 flex items-center justify-center">
                <Clock className="h-4 w-4 text-web3-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Time</p>
                <p>{eventDate.toLocaleTimeString('en-US', { 
                  hour: '2-digit',
                  minute: '2-digit'
                })}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-background/40 flex items-center justify-center">
                <MapPin className="h-4 w-4 text-web3-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p>{event.location}</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-between gap-4 mb-2 pb-4 border-b border-border/30">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-background/40 flex items-center justify-center">
                <Users className="h-4 w-4 text-web3-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Registered</p>
                <p className="font-medium">{event.totalRegistered} Attendees</p>
              </div>
            </div>
            
            {event.blockchainTxId && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">Blockchain Transaction</p>
                <a 
                  href="#" 
                  className="flex items-center gap-1.5 text-web3-secondary hover:text-web3-secondary/80 text-sm"
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="wallet-address">{event.blockchainTxId.slice(0, 10)}...</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            )}
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
            <TabsList className="grid w-full grid-cols-3 bg-background/30">
              <TabsTrigger value="details">Event Details</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="add-attendee">Add Attendee</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-4 pt-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">About This Event</h3>
                <p className="text-muted-foreground">
                  {event.description || "No additional details provided for this event."}
                </p>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3">Organizer</h3>
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-web3-primary/20 flex items-center justify-center">
                      <Users className="h-5 w-5 text-web3-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Event Organizer</p>
                      <p className="wallet-address">{event.organizer.slice(0, 8)}...{event.organizer.slice(-6)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="attendance" className="pt-4">
              <AttendanceTable event={event} onAttendanceUpdate={onEventUpdate} />
            </TabsContent>
            <TabsContent value="add-attendee" className="pt-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Add New Attendee</h3>
                <p className="text-muted-foreground mb-6">
                  Enter the details of the new attendee to add them to this event.
                </p>
                <div className="max-w-md mx-auto">
                  <AddAttendeeForm 
                    eventId={event.id} 
                    onAttendeeAdded={handleAttendeeAdded}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
