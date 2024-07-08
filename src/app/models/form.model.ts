export interface Form {
  id?: string;
  country: string;
  state: string;
  city: string;
  temperature: string | number;
  rainStatus: boolean;
  date: string;
  networkPower: string | number | any;
  highAltitude: string | number;
}
