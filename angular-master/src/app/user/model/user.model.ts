import {
  Address
} from "./address.model";

export interface User {
  id: number;
  name: string;
  age: number;
  gender: String;
  email: string;
  position: string;
  status: string;
  address: Address;
}
