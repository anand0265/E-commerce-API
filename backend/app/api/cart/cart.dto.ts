import { type BaseSchema } from "../../common/dto/base.dto";

export interface ICartItem {
  product: number; // product ID as a number
  name: string;
  image?: string;
  price: number;
  quantity: number;
  stock?: number;
}

export interface ICart extends BaseSchema {
  userId: number;
  items: ICartItem[];
  totalPrice: number;
}
