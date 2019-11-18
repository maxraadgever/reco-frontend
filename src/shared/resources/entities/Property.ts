import { IPark } from "./Park";

export interface IProperty {
  id: number;
  createdDate?: Date;
  updatedDate?: Date;
  name: string;
  park: IPark | null;
  houseNumber: string;
  type: "BUNGALOW" | "VILA" | "OTHER";
  startPrice?: number;
  totalTokens?: number;
  nexusId?: string;
  mainImage?: string;
  capacity?: number;
  surfaceArea?: number;
  energyLabel?: string;
  [key: string]: any;
}
