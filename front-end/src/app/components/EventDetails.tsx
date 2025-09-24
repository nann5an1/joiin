import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { MapPin, Mail, Phone, Globe } from "lucide-react";

interface EventDetailsProps {
  description: string;
  organizer_name: string;
  organizer_email: string;
  organizer_phone: string;
//   organizer: {
//     name: string;
//     email: string;
//     phone: string;
//     website: string;
//   };
//   venue: {
//     name: string;
//     address: string;
//     description: string;
//   };
  venue: string;
  tags: string[];
}

export function EventDetailsComponent ({ description, organizer_name, organizer_email, organizer_phone, venue, tags }: EventDetailsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-8">
        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle>About This Game</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="leading-relaxed">{description}</p>
            
            {tags && tags.length > 0 && (
              <div className="space-y-2">
                <Separator />
                <div>
                  <p className="text-sm font-medium mb-3">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card> 

        {/* Venue Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Venue Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium">{venue}</h4>
              {/* <p className="text-muted-foreground">{venue.address}</p> */}
            </div>
            {/* <p className="leading-relaxed">{venue.description}</p> */}
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Organizer Info */}
        <Card>
          <CardHeader>
            <CardTitle>Event Organizer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-3">{organizer_name}</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a href={`mailto:${organizer_email}`} className="text-primary hover:underline">
                    {organizer_email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a href={`tel:${organizer_phone}`} className="text-primary hover:underline">
                    {organizer_phone}
                  </a>
                </div>
                {/* <div className="flex items-center gap-2 text-sm"> */}
                  {/* <input type="button" onClick={seeMoreDetails}>See More Details</input> */}
                {/* </div> */}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <button className="w-full text-left text-sm text-primary hover:underline">
              Add to Calendar
            </button>
            <button className="w-full text-left text-sm text-primary hover:underline">
              Get Directions
            </button>
            <button className="w-full text-left text-sm text-primary hover:underline">
              Contact Team
            </button>
            <button className="w-full text-left text-sm text-primary hover:underline">
              Report Issue
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}