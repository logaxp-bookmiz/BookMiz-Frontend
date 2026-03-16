import { ReactNode } from "react";
import { EventProps } from "@/app/homepage/types/types";

export interface IBookings {
  price: ReactNode;
  id: number;
  code: string;
  fullname: string;
  event: {
    title: string;
    price: ReactNode;
    start_date: string; 
  };
  phone: string;
  email: string;
}
export interface BookmarkProps {
  id: number;
  event: EventProps;
}

export interface IViewEventModalProps {
  toggleViewEventModal: () => void;
  event: EventProps | null;
}

export interface EventsListProps {
  events: EventProps[];
  onEdit: (id: number) => void;
}

export interface IBookingProps {
  id: number;
  fullname: string;
  code: string;
  email: string;
  ticket: {
    name: string;
  };
  created_at: string;
}
