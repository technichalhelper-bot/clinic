export interface DentalService {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  duration?: string;
  benefits: string[];
}

export interface GoogleReview {
  id: string;
  name: string;
  rating: number;
  timeAgo: string;
  text: string;
  avatarBg: string;
  verified: boolean;
}

export interface AppointmentFormData {
  fullName: string;
  phone: string;
  date: string;
  timeSlot: string;
  service: string;
  notes?: string;
}

export interface FacilityItem {
  name: string;
  description: string;
  icon: string;
}

export interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  category: 'Smile Makeover' | 'Painless RCT' | 'Scaling & Cleaning' | 'Clinic & Team';
  date: string;
}
