
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { EventCard } from '@/components/EventCard';
import { EventDetails } from '@/components/EventDetails';
import { CreateEventModal } from '@/components/CreateEventModal';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockEvents } from '@/utils/mockData';
import { Event, EventType } from '@/utils/types';
import { Plus } from 'lucide-react';

const Index = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");

  useEffect(() => {
    // Simulate loading events
    setEvents(mockEvents);
  }, []);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleBackToList = () => {
    setSelectedEvent(null);
  };

  const handleEventCreated = () => {
    // Reload events
    setEvents([...mockEvents]);
  };

  const handleEventUpdate = (updatedEvent: Event) => {
    const updatedEvents = events.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    );
    setEvents(updatedEvents);
    setSelectedEvent(updatedEvent);
  };

  const filteredEvents = activeTab === "all" 
    ? events 
    : events.filter(event => event.type === activeTab);

  return (
    <Layout>
      {selectedEvent ? (
        <div>
          <Button 
            variant="outline" 
            onClick={handleBackToList}
            className="mb-6"
          >
            ← Back to Events
          </Button>
          <EventDetails 
            event={selectedEvent} 
            onEventUpdate={handleEventUpdate} 
          />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">Decentralized Attendance System</h1>
              <p className="text-muted-foreground">Manage your events and attendance with blockchain verification</p>
            </div>
            <Button 
              onClick={() => setCreateModalOpen(true)}
              className="bg-web3-primary hover:bg-web3-primary/80 flex items-center gap-2"
            >
              <Plus className="h-4 w-4" /> Create Event
            </Button>
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-background/30">
              <TabsTrigger value="all">All Events</TabsTrigger>
              <TabsTrigger value={EventType.CONCERT}>Concerts</TabsTrigger>
              <TabsTrigger value={EventType.HACKATHON}>Hackathons</TabsTrigger>
              <TabsTrigger value={EventType.COLLEGE}>College</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-6">
              {filteredEvents.length === 0 ? (
                <div className="text-center py-12">
                  <h2 className="text-xl mb-2">No events found</h2>
                  <p className="text-muted-foreground">Create a new event to get started</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEvents.map((event) => (
                    <EventCard 
                      key={event.id} 
                      event={event} 
                      onClick={() => handleEventClick(event)}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
          
          <CreateEventModal 
            open={createModalOpen} 
            onOpenChange={setCreateModalOpen} 
            onEventCreated={handleEventCreated}
          />
        </div>
      )}
    </Layout>
  );
};

export default Index;
