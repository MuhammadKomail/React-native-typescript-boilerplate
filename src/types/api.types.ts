// Common API Response type
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: UserData;
}

// User types
export interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  technicianId?: string;
}

// Technician types
export interface TechnicianIqama {
  iqamaNumber: string;
  placeOfWork: string;
  placeOFIssue: string;
  employerName: string;
  dateOfBirth: string;
  placeOfBirth: string;
  profession: string;
  religion: string;
  nationality: string;
  employerId: string;
}

export interface TechnicianData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  iqama?: TechnicianIqama;
  createdAt: string;
  updatedAt: string;
}

// Password Update types
export interface PasswordUpdateRequest {
  currentPassword: string;
  newPassword: string;
}
