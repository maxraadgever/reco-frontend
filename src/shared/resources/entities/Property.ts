import { IPark } from "./Park";

export interface IProperty {
  id: number;
  createdDate?: Date;
  updatedDate?: Date;
  name: string;
  houseNumber: string;
  type: "BUNGALOW" | "VILA" | "OTHER";
  capacity?: number;
  surfaceArea?: number;
  buildingYear?: number;
  energyLabel?: "A" | "B" | "C" | "D" | "E" | "F";
  startPrice?: number;
  yield?: number;
  yieldType?: "STATIC" | "DYNAMIC" | number;
  tokenStartPrice?: number;
  totalTokens?: number;
  nexusId?: string;
  stoStartDate?: Date;
  mainImage?: string;
  park: IPark | null;
  [key: string]: any;
}
