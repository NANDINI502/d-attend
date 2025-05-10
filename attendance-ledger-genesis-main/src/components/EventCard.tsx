
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Event, EventType } from '@/utils/types';
import { Calendar, Ticket, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface EventCardProps {
  event: Event;
  onClick?: () => void;
}

export const EventCard = ({ event, onClick }: EventCardProps) => {
  const eventDate = new Date(event.date);
  const isUpcoming = eventDate > new Date();
  const getEventIcon = (type: EventType) => {
    switch (type) {
      case EventType.CONCERT:
        return <Ticket className="h-4 w-4" />;
      case EventType.HACKATHON:
        return <Award className="h-4 w-4" />;
      case EventType.COLLEGE:
        return <Users className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const getEventColor = (type: EventType) => {
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

  const attendancePercentage = event.totalPresent > 0
    ? Math.round((event.totalPresent / event.totalRegistered) * 100)
    : 0;

  return (
    <Card className="web3-card overflow-hidden transition-all duration-300 hover:scale-[1.02]" onClick={onClick}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className={getEventColor(event.type)}>
            <span className="flex items-center gap-1">
              {getEventIcon(event.type)}
              {event.type}
            </span>
          </Badge>
          {event.ipfsHash && (
            <Badge variant="outline" className="bg-web3-success/10 text-web3-success">
              Verified on Chain
            </Badge>
          )}
        </div>
        <CardTitle className="mt-2">{event.name}</CardTitle>
        <CardDescription className="line-clamp-2">{event.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {eventDate.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric'
              })}
            </span>
            <span className="text-muted-foreground">{event.location}</span>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-muted-foreground">Attendance</span>
              <span>{event.totalPresent} / {event.totalRegistered}</span>
            </div>
            <Progress value={attendancePercentage} className="h-1.5" 
              indicatorClassName={attendancePercentage > 80 ? "bg-web3-success" : attendancePercentage > 40 ? "bg-web3-secondary" : "bg-web3-accent"}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button
          variant="outline"
          className="w-full border-web3-primary text-web3-primary hover:bg-web3-primary/10"
          onClick={onClick}
        >
          {isUpcoming ? "Manage Event" : "View Details"}
        </Button>
      </CardFooter>
    </Card>
  );
};
