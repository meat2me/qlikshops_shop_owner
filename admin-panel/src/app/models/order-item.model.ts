export interface OrderItem {
  item_id: number;
  item_name: string;
  price: number;
  is_processed: number;
  amount: number;
  catalog_number: string;
  actual_amount: number;
}

export enum ReadyOrderFilter {
  READY_ORDER_PICKUP = 1,
  READY_ORDER_DELIVERY = 2
}