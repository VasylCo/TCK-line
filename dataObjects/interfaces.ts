export interface Region {
  regionId: number;
  name: string;
}

export interface City {
  cityId: number;
  name: string;
}

export interface ServiceCenter {
  building: string;
  cityId: number;
  cityName: string;
  regionId: number;
  regionName: string;
  serviceCenterId: number;
  serviceCenterName: string;
  street: string;
}
