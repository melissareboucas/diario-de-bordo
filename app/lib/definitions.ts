// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    image_url: string;
  };
  
  export type Travel = {
    id: string;
    user_id: string;
    origincity: string;
    origincountry: string;
    destinycity: string;
    destinycountry: string;
    distanceinmeters: number;
    date: string;
    travelimage: string;
    description: string
  };

  export type TravelForm = {
    id: string;
    user_id: string;
    origincity: string;
    origincountry: string;
    destinycity: string;
    destinycountry: string;
    distanceinmeters: number;
    travelimage: string;
    description: string;
    date: string;
  };

  export type Post = {
    id: string;
    user_id: string;
    travels_id: string;
    title: string;
    posttext: string;
    postdate: string
  };
   