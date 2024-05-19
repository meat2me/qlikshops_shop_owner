import { OrderItem } from './order-item.model';

export interface OrderDetail {
  rc: number;
  message: string;
  order_id: number;
  client_name: string;
  client_id: string;
  phone_num: string;
  email: string;
  address: string;
  order_time: string;
  status: number;
  payment_type: string;
  user_comment: string;
  client_message_prefix?: string;
  order_notes: string;
  items: OrderItem[];
  num_of_items: number;
  total_price: number;
  address_notes: string;
  delivery_slot: string;
  is_payment_in_store?: number;
  is_pickup: number;
  delivery_time: string;
  branch: string;
}
