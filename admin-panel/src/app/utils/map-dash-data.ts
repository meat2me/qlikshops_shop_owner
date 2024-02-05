export function mapDash(obj: any): StatsMonth[] {
    let array = [];
    for (const key in obj) {
      array.push({ month: key, amount: obj[key] });
    }
    return array;
  }
  
  export interface StatsMonth {
    month: string;
    amount: any;
  }
  