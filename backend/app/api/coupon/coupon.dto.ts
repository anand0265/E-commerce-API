import { type BaseSchema } from "../../common/dto/base.dto";


export interface ICoupon extends BaseSchema {
  code: string;
  discount_type: "PERCENTAGE" | "FLAT";
  discount_percent: number;
  expires_at?: string;
  is_active?: boolean;
}

