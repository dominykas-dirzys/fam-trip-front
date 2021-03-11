export interface Hotel {
  id: number;
  city: City;
  name: string;
  officialRating: number;
  inspectionScore: number;
  foodQuality: string;
  territorySize: string;
  waterSlides: boolean;
  spa: boolean;
  distanceToBeach: number;
  distanceFromAirport: number;
  remarks: string;
  author: User;
  rooms: Room[];
  recommendedTos: string[];
  labels: string[];
  cuisineTypes: string[];
}

export interface Room {
  id: number;
  type: string;
  roomType: string;
  size: string;
  roomCondition: string;
  remarks: string;
  hotelId: number;
}

export interface User {
  id: number;
  email: string;
}

export interface City {
  id: number;
  title: string;
  country: Country;
}

export interface Country {
  id: number;
  title: string;
}

export interface CityGroup {
  country: string;
  cities: City[];
}

export interface ReferenceData {
  dataType: string;
  enums: string[];
}
