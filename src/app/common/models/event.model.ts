export interface EventModel {
  id?: string;
  title: string;
  organizerId?: string;
  location?: string;
  isPublic?: boolean;
  venueId?: string;
  startDateTime: string | Date;
  endDateTime: string | Date;
  timezone?: string;
  description?: string;
  primaryImageUrl?: string;
  coverImageUrl?: string;
  imageGalleryUrls?: string[];
  tickets: any[];
  leads: any[];
  status: 'Active' | 'Inactive';
  organizer?: Record<string, any>;
}
