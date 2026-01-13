export interface Student {
  student_id: number;
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  phone: string;
  school_id: string;
  created_at: string;
  status: string;
  account_id: number;
}

export type GetStudentPayload = {
  student_id: number;
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  phone: string;
  school_id: string;
  created_at: string;
  status: string;
};
