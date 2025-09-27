import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// import { ImageWithFallback } from './figma/ImageWithFallback';

interface EventHeaderProps {
  title: string;
  date: string;
  time: string | number;
  location: string;
  attendees: number;
  category: string;
  imageUrl: string;
}

export function EventHeader({ 
  title, 
  date, 
  time, 
  location, 
  attendees, 
  category, 
  imageUrl 
}: EventHeaderProps) {
  return (
    <div className="relative">
      {/* Hero Image */}
      <div className="h-[400px] relative overflow-hidden rounded-lg mb-8">
        {/* <ImageWithFallback 
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        /> */}
        <img src={`http://localhost:3000${imageUrl}`} className="w-full h-full object-cover"></img>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="bg-white/90 text-primary">
            {category}
          </Badge>
        </div>
      </div>

      {/* Event Details */}
      <div className="space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold leading-tight">{title}</h1>
          
          <div className="flex flex-wrap gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>{time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span>{attendees} attendees</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button size="lg" className="px-8">
            Buy Tickets
          </Button>
          <Button variant="outline" size="lg">
            Share Game
          </Button>
        </div>
      </div>
    </div>
  );
}