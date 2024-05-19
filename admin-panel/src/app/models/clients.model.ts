import { Resp } from './resp.model';

export interface Clients extends Resp {
  clients: Client[];
}

export interface Client {
  client_id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_num: string;
  num_of_orders: number;
  order_total: number;
}
