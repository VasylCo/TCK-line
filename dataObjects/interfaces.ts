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

export interface ServiceGroup {
  description: string;
  groupId: number;
  orderWeight: number;
  parentGroupId: number;
}

export interface Service extends ServiceGroup {
  isOnlyInform: boolean;
}

export interface Services {
  groups: ServiceGroup[];
  services: Service[];
}
