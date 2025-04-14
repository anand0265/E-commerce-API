import { BaseSchema } from "../../common/dto/base.dto";

export interface IProduct extends BaseSchema {
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  stockQuantity: number;
  categoryId: number;
  images?: string[]; 
  brand?: string;
  rating?: number;
  tags?: string[]; 
  status?: 'active' | 'inactive' | 'discontinued';
 
}
