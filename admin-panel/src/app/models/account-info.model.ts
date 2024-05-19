import { Resp } from './resp.model';

export interface AccountInfo extends Resp {
  store_id: string;
  contact_first_name: string;
  contact_last_name: string;
  contact_email: string;
  phone_num: string;
  is_pro_account: number;
  accept_credit_cards: number;
  has_integration_with_inventory: number;
  is_monthly_payment_plan: number;
  has_private_domain: number;
  private_domain: string;
  payment_by: string;
  next_payment_date: string;
  next_payment_amount: string;
}
