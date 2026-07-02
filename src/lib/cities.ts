import type { City, DepartmentInfo } from '../types';
import citiesData from './db/cities.json';
import departmentsData from './db/departments-infos.json';

const citiesList = citiesData as City[];
const departmentsList = departmentsData as DepartmentInfo[];

// Haversine distance helper
function computeDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function getAllCities(): City[] {
  return citiesList;
}

export function getCityBySlug(slug: string): City | undefined {
  return citiesList.find((c) => c.slug === slug);
}

export function getCitiesByDepartment(deptCode: string): City[] {
  return citiesList.filter((c) => c.department_code === deptCode);
}

export function getDepartmentByCode(code: string): DepartmentInfo | undefined {
  return departmentsList.find((d) => d.code === code);
}

export function getAllDepartments(): DepartmentInfo[] {
  return departmentsList;
}

export function getDepartmentsByRegion(region: string): DepartmentInfo[] {
  return departmentsList.filter((d) => d.region.toLowerCase() === region.toLowerCase());
}

export function getDepartmentSlug(code: string, name: string): string {
  const cleanName = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return `${code}-${cleanName}`;
}

export function getNearbyCities(currentCity: City, limit = 6): City[] {
  if (!currentCity.coordinates) return [];

  const lat = currentCity.coordinates.lat;
  const lng = currentCity.coordinates.lng;

  // Pre-filter cities roughly within 50km box to save compute time
  const candidates = citiesList.filter(
    (c) =>
      c.slug !== currentCity.slug &&
      c.coordinates &&
      Math.abs(c.coordinates.lat - lat) < 0.5 &&
      Math.abs(c.coordinates.lng - lng) < 0.5
  );

  const mapped = candidates.map((c) => ({
    city: c,
    distance: computeDistance(lat, lng, c.coordinates.lat, c.coordinates.lng),
  }));

  mapped.sort((a, b) => a.distance - b.distance);
  return mapped.slice(0, limit).map((x) => x.city);
}
