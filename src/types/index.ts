export interface City {
  name: string;
  slug: string;
  zip: string;
  department_name: string;
  department_code: string;
  region: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  population?: number;
}

export interface DepartmentInfo {
  code: string;
  name: string;
  region: string;
  aide_locale: string;
}
