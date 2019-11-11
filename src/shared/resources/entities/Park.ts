import { IProperty } from "./Property";

export interface IPark {
  id: number;
  name: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  website?: string;
  reviews?: string;
  properties?: IProperty[];
}
