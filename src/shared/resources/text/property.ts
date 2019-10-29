export const propertyInfo = {
  apartment: "Appartement",
  surfaceArea: "Oppervlakte",
  address: "Adres",
  city: "Stad",
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
  }
};
