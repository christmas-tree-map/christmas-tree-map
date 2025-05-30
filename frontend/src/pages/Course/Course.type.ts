export type CourseType = 'lunch' | 'cafe' | 'attraction' | 'dinner';

export interface CourseDetails {
  lunch: Course | null;
  cafe: Course | null;
  attraction: Course | null;
  dinner: Course | null;
}

export interface Course {
  id: string;
  phone: string;
  place_name: string;
  road_address_name: string;
  x: string;
  y: string;
  pedestrian_route: {
    duration_minutes: number;
    route: number[][];
  };
}

export interface CourseWithPosition extends Course {
  x: string;
  y: string;
}
