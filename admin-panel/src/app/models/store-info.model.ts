import { Unit } from './unit.model';
import { PaymentOpts } from './payment-opts.model';
import { Resp } from './resp.model';

export interface StoreInfo extends Resp {
    is_online: number,
    name: string,
    about: string,
    language: string,
    currency: string,
    category: number,
    theme: number,
    msg_prefix: string,
    street: string,
    city: string,
    province: string,
    country_code: string,
    phone: string,
    email: string,
    open_hours: string,
    has_take_away: number,
    has_delivery:number,
    payment_opts: PaymentOpts [],
    units: Unit [],
    logo_image: string,
    custom_units: Unit [],
    languages: any,
    store_categories: any,
    themes: any,
    countries: any
}