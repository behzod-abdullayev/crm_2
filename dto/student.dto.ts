export interface CreateStudentDto {
  full_name: String;
  phone_number: string;
  profession: string;
  parent_name: string;
  parent_number: string;
  image_url: string;
}
export interface UpdateStudentDto {
  full_name?: String;
  phone_number?: string;
  profession?: string;
  parent_name?: string;
  parent_number?: string;
  image_url?: string;
}
export interface DeleteStudentDto {
  full_name: String;
  phone_number: string;
  profession: string;
  parent_name: string;
  parent_number: string;
  image_url: string;
}
export interface getOneStudentDto {
  full_name: String;
  phone_number: string;
  profession: string;
  parent_name: string;
  parent_number: string;
  image_url: string;
}
