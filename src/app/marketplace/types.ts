export interface Service {
  id?: number;
  name: string;
  price?: string;
  duration?: string;
  description?: string;
}

export interface ImageData {
  src: string;
  label: string;
  location: string;
  rating: number;
  reviews: number;
}

export interface ServiceProfessional {
  id: string;
  name: string;
  address: string;
  services: Service[];
  image: string;
}

export interface BookingData {
  serviceId: number;
  slotId: number;
  userId: number;
  date: string;
}