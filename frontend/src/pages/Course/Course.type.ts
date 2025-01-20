export interface Course {
  id: string;
  phone: string;
  place_name: string;
  road_address_name: string;
}

export interface CourseWithPosition extends Course {
  x: string;
  y: string;
}
