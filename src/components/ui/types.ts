export enum SelectedPage {
  Home = "home",
  Products = "products",
  Pricing = "pricing",
  Marketplace = "marketplace",
  Contact = "contact",
}

export interface BenefitType {
  icon: JSX.Element;
  title: string;
  description: string;
}

export interface ClassType {
  name: string;
  description?: string;
  image: string;
}
