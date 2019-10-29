export interface IProperty {
  id: number;
  createdDate?: Date;
  updatedDate?: Date;
  park: string;
  houseNumber: string;
  type: "BUNGALOW" | "VILA" | "OTHER";
  startPrice?: number;
  totalTokens?: number;
  tokenName?: string;
  mainImage?: string;
}
