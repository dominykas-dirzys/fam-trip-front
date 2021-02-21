export interface Hotel {
  id: number;
  city: City;
  name: string;
  officialRating: HotelRating;
  inspectionScore: number;
  foodQuality: FoodQuality;
  territorySize: Size;
  waterSlides: boolean;
  spa: boolean;
  distanceToBeach: number;
  distanceFromAirport: number;
  remarks: string;
  author: User;
  rooms: Room[];
  recommendedTos: RecommendedTo[];
  labels: HotelLabel[];
  cuisineTypes: CuisineType[];
}

export interface Room {
  id: number;
  type: string;
  roomType: RoomType;
  size: Size;
  roomCondition: RoomCondition;
  remarks: string;
}

export interface User {
  id: number;
  email: string;
}

export enum CuisineType {
  VEGETARIAN,
  ASIAN,
  CONTINENTAL,
  MEXICAN,
  LOCAL,
  SEAFOOD,
  CUSTOM
}

export enum HotelLabel {
  ECONOMY,
  SUPERIOR,
  BOUTIQUE,
  ADULTS_ONLY,
  ECO_FRIENDLY,
  PARTY,
  SHOPPING
}

export enum RecommendedTo {
  FAMILIES_WITH_YOUNG_CHILDREN,
  FAMILIES_WITH_OLDER_CHILDREN,
  COUPLES,
  FRIENDS,
  YOUTH,
  BUSINESS,
  SOLO_TRAVELERS
}

export enum RoomCondition {
  NEEDS_RENOVATION,
  WEAR_AND_TEAR,
  VERY_GOOD,
  NEW
}

export enum RoomType {
  PROMO,
  STANDARD_DBL,
  FAMILY,
  SUITE,
  DBL_SEA_VIEW,
  CUSTOM
}

export enum HotelRating {
  ONE_STAR,
  TWO_STAR,
  THREE_STAR,
  FOUR_STAR,
  FIVE_STAR,
  HV_1,
  HV_2,
  APARTMENTS,
  NO_RATING
}

export enum FoodQuality {
  TERRIBLE,
  POOR,
  AVERAGE,
  GOOD,
  FANTASTIC
}

export enum Size {
  SMALL,
  NORMAL,
  LARGE
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
  letter: string;
  names: string[];
}

