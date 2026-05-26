export type UnitCategory = "temperature" | "length" | "weight" | "speed" | "volume" | "currency";

export interface UnitInfo {
  id: string;
  name: string;
  symbol: string;
}

export const CATEGORIES: Record<UnitCategory, UnitInfo[]> = {
  temperature: [
    { id: "celsius", name: "Celsius", symbol: "°C" },
    { id: "fahrenheit", name: "Fahrenheit", symbol: "°F" },
    { id: "kelvin", name: "Kelvin", symbol: "K" },
  ],
  length: [
    { id: "meters", name: "Metros", symbol: "m" },
    { id: "kilometers", name: "Quilômetros", symbol: "km" },
    { id: "centimeters", name: "Centímetros", symbol: "cm" },
    { id: "millimeters", name: "Milímetros", symbol: "mm" },
    { id: "inches", name: "Polegadas", symbol: "in" },
    { id: "feet", name: "Pés", symbol: "ft" },
    { id: "miles", name: "Milhas", symbol: "mi" },
  ],
  weight: [
    { id: "kilograms", name: "Quilogramas", symbol: "kg" },
    { id: "grams", name: "Gramas", symbol: "g" },
    { id: "milligrams", name: "Miligramas", symbol: "mg" },
    { id: "pounds", name: "Libras", symbol: "lb" },
    { id: "ounces", name: "Onças", symbol: "oz" },
    { id: "tons", name: "Toneladas", symbol: "t" },
  ],
  speed: [
    { id: "kmh", name: "Quilômetros por hora", symbol: "km/h" },
    { id: "ms", name: "Metros por segundo", symbol: "m/s" },
    { id: "mph", name: "Milhas por hora", symbol: "mph" },
    { id: "knots", name: "Nós", symbol: "kn" },
  ],
  volume: [
    { id: "liters", name: "Litros", symbol: "L" },
    { id: "milliliters", name: "Mililitros", symbol: "mL" },
    { id: "cubicMeters", name: "Metros cubicos", symbol: "m3" },
    { id: "gallons", name: "Galoes", symbol: "gal" },
  ],
  currency: [
    { id: "brl", name: "Real Brasileiro", symbol: "R$" },
    { id: "usd", name: "Dólar Americano", symbol: "US$" },
    { id: "eur", name: "Euro", symbol: "€" },
    { id: "gbp", name: "Libra Esterlina", symbol: "£" },
    { id: "jpy", name: "Iene Japonês", symbol: "¥" },
    { id: "ars", name: "Peso Argentino", symbol: "$" },
  ],
};

const lengthToMeters: Record<string, number> = {
  meters: 1,
  kilometers: 1000,
  centimeters: 0.01,
  millimeters: 0.001,
  inches: 0.0254,
  feet: 0.3048,
  miles: 1609.34,
};

const weightToKg: Record<string, number> = {
  kilograms: 1,
  grams: 0.001,
  milligrams: 0.000001,
  pounds: 0.45359237,
  ounces: 0.0283495231,
  tons: 1000,
};

const speedToKmh: Record<string, number> = {
  kmh: 1,
  ms: 3.6,
  mph: 1.60934,
  knots: 1.852,
};

const volumeToLiters: Record<string, number> = {
  liters: 1,
  milliliters: 0.001,
  cubicMeters: 1000,
  gallons: 3.78541,
};

const currencyToUsd: Record<string, number> = {
  usd: 1,
  brl: 0.20,
  eur: 1.08,
  gbp: 1.26,
  jpy: 0.0066,
  ars: 0.0012,
};

export function convertValue(value: number, fromUnit: string, toUnit: string, category: UnitCategory): number {
  if (fromUnit === toUnit) return value;

  if (category === "temperature") {
    let celsius = value;
    if (fromUnit === "fahrenheit") {
      celsius = (value - 32) * 5 / 9;
    } else if (fromUnit === "kelvin") {
      celsius = value - 273.15;
    }

    if (toUnit === "celsius") return celsius;
    if (toUnit === "fahrenheit") return (celsius * 9 / 5) + 32;
    if (toUnit === "kelvin") return celsius + 273.15;
  }

  if (category === "length") {
    const baseValue = value * lengthToMeters[fromUnit];
    return baseValue / lengthToMeters[toUnit];
  }

  if (category === "weight") {
    const baseValue = value * weightToKg[fromUnit];
    return baseValue / weightToKg[toUnit];
  }

  if (category === "speed") {
    const baseValue = value * speedToKmh[fromUnit];
    return baseValue / speedToKmh[toUnit];
  }

  if (category === "volume") {
    const baseValue = value * volumeToLiters[fromUnit];
    return baseValue / volumeToLiters[toUnit];
  }

  if (category === "currency") {
    const baseValue = value * currencyToUsd[fromUnit];
    return baseValue / currencyToUsd[toUnit];
  }

  return value;
}
