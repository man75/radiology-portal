export interface RadiologyImage {
  id: string;
  patientId: string;
  filename: string;
  type: 'X-Ray' | 'CT' | 'MRI' | 'Ultrasound' | 'PET';
  bodyPart: string;
  uploadDate: string;
  examinationDate: string;
  radiologist: string;
  report: string;
  imageUrl: string;
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  medicalRecordNumber: string;
}

export interface User {
  id: string;
  patient: Patient;
  isAuthenticated: boolean;
}

export interface ConsultationActe {
  acteId: string;
  name: string;
  fileName?: string;
  imageFileName?: string;
}

export interface Consultation {
  id: string;
  date: string;
  motif: string;
  diagnostic: string;
  poids?: number;
  taille?: number;
  tensionSystolique?: number;
  tensionDiastolique?: number;
  temperature?: number;
  typeConsultation: string;
  patientId: string;
  patientNomComplet: string;
  doctorId: string;
  consultationStateId: string;
  etat: string;
  codeEtat: string;
  statutPaiement: string;
  tarif?: number;
  montantPaye: number;
  montantRestant: number;
  actes: ConsultationActe[];
}

export interface PagedResult<T> {
  items: T[];
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
}