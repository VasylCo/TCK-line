import AsyncStorage from '@react-native-async-storage/async-storage';
import { ServiceCenter, City, Region } from '@/dataObjects/interfaces';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export async function getOrganisationGuid(name: string = 'MOY') {
  try {
    const response = await fetch(
      `${apiUrl}/OrganisationInfo/GetOrgGuidByName?OrganisationName=${name}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    return data.organisationGuid;
  } catch (error) {
    console.error(error);
  }
}

export async function getRegions(id: string) {
  try {
    const response = await fetch(`${apiUrl}/PreReg/GetRegions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Organisation: id,
      },
    });
    const data = await response.json();
    return data.regions as Region[];
  } catch (error) {
    console.error(error);
  }
}

export async function getCities(region: string, id?: string) {
  if (!id) {
    id = (await AsyncStorage.getItem('organisationId')) || '';
  }
  try {
    const response = await fetch(`${apiUrl}/PreReg/GetCities?RegionId=${region}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Organisation: id,
      },
    });
    const data = await response.json();
    return data.cities as City[];
  } catch (error) {
    console.error(error);
  }
}

export async function getServiceCentersByCity(cityId: number, id?: string) {
  if (!id) {
    id = (await AsyncStorage.getItem('organisationId')) || '';
  }
  try {
    const response = await fetch(`${apiUrl}/PreReg/GetServiceCentersByCity?CityId=${cityId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Organisation: id,
      },
    });
    const data = await response.json();
    return data.serviceCenters as ServiceCenter[];
  } catch (error) {
    console.error(error);
  }
}
