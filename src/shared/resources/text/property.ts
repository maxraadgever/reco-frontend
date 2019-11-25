export const propertyInfo = {
  name: "Naam",
  houseNumber: "Wonings nummer",
  capacity: "Capaciteit",
  surfaceArea: "Oppervlakte",
  buildingYear: "Bouwjaar",
  energyLabel: "Energielabel",
  startPrice: "Orginele prijs",
  yield: "Rendement",
  yieldType: "Rendement type",
  tokenStartPrice: "Token start prijs",
  totalTokens: "Totaal aantal tokens",
  stoStartDate: "Verhandelbaar per",
  type: "Type",
  propertyType: (type: "BUNGALOW" | "VILA" | "OTHER") => {
    switch (type) {
      case "BUNGALOW":
        return "Bungalow";
      case "VILA":
        return "Luxe Vila";
      case "OTHER":
        return "Onbekend";
    }
  },
  propertyYieldType: (yieldType: "STATIC" | "DYNAMIC" | number) => {
    switch (yieldType) {
      case "STATIC":
      case 0:
        return "Vast rendement";
      case "DYNAMIC":
      case 1:
        return "Rendement op basis van prognose";
      default:
        return "onbekend";
    }
  }
};
