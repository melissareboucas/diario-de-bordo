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
  };

  export type TravelForm = {
    id: string;
    user_id: string;
    origincity: string;
    origincountry: string;
    destinycity: string;
    destinycountry: string;
    distanceinmeters: number;
  };
  
  /*
  export type InvoicesTable = {
    id: string;
    customer_id: string;
    name: string;
    email: string;
    image_url: string;
    date: string;
    amount: number;
    status: 'pending' | 'paid';
  };
  */
  export type InvoiceForm = {
    id: string;
    customer_id: string;
    amount: number;
    status: 'pending' | 'paid';
  };
   