export interface CreateStudentDto {
  full_name: string;
  phone_number: string;
  profession: string;
  parent_name: string;
  parent_number: string;
  image_url: string;
}

export interface UpdateStudentDto {
  full_name?: string;
  phone_number?: string;
  profession?: string;
  parent_name?: string;
  parent_number?: string;
  image_url?: string;
  joinedAt?: Date;
  leftAt?: Date;
}
