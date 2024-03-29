import { User as NextAuthUser, Session } from 'next-auth';

export interface Review {
  name: string;
  date: string;
  rating: number;
  comments: string;
  _id: number;
}

export enum Neighborhood {
  Queens = 'Queens',
  Manhattan = 'Manhattan',
  Brooklyn = 'Brooklyn',
}

export enum CuisineType {
  Mexican = 'Mexican',
  Asian = 'Asian',
  American = 'American',
  Pizza = 'Pizza',
}

export interface Restaurant {
  _id: string;
  name: string;
  neighborhood: Neighborhood;
  photograph: string;
  address: string;
  latlng: {
    lat: number;
    lng: number;
  };
  image: string;
  cuisineType: CuisineType;
  operatingHours: {
    [day: string]: string;
  };
  reviews: Review[];
  createdBy: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  favoriteRestaurants: Restaurant[];
}

export interface AuthUser extends NextAuthUser {
  accessToken: string;
}

export interface UserSession extends Session {
  user: AuthUser;
}
