import { BaseSchema } from "../../common/dto/base.dto";


export interface IOrderItem {
  product_id: number;          
  quantity: number;          
  price: number;             
  discount_price: number;     
}


export interface IOrder extends BaseSchema {
  user_id: number;             
  items: IOrderItem[];        
  total_price: number;         
  shipping_address: string;   
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded'; 
  order_status: 'pending' | 'completed' | 'cancelled' | 'shipped';        
  coupon_code: string;        
  discount_amount: number;  
  shipping_cost: number;      
  delivery_date: string;   
}
