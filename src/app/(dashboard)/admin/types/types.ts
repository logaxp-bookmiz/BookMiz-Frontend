export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;
  city?: string;
}

export type EventCategory = {
  name: string;
  description: string;
  image_url: string;
  archived?: boolean;
};

export interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onDelete: (category: EventCategory) => void;
  category: EventCategory | null;
}

export type Country = {
  code2: string;
  name: string;
  currency: string;
  region: string;
};