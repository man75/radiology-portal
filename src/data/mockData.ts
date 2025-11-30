import { RadiologyImage, Patient, User } from '@/types/index';

export const mockPatient: Patient = {
  id: 'patient-001',
  firstName: 'Ahmed',
  lastName: 'Bouali',
  email: 'ahmed.bouali@example.com',
  dateOfBirth: '1985-03-15',
  medicalRecordNumber: 'MRN-2024-001',
};

export const mockUser: User = {
  id: 'user-001',
  patient: mockPatient,
  isAuthenticated: false,
};

export const mockRadiologyImages: RadiologyImage[] = [
  {
    id: 'image-001',
    patientId: 'patient-001',
    filename: 'chest_xray_2024_11_20.dcm',
    type: 'X-Ray',
    bodyPart: 'Poitrine',
    uploadDate: '2024-11-20',
    examinationDate: '2024-11-19',
    radiologist: 'Dr. Amira Saidi',
    report: 'Radiographie thoracique normale. Pas d\'anomalie détectée. Cœur et poumons en bon état.',
    imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"%3E%3Crect fill="%23222" width="400" height="500"/%3E%3Ctext x="50%25" y="50%25" font-size="24" fill="white" text-anchor="middle" dy=".3em"%3EX-Ray: Poitrine%3C/text%3E%3C/svg%3E',
  },
  {
    id: 'image-002',
    patientId: 'patient-001',
    filename: 'knee_xray_2024_10_15.dcm',
    type: 'X-Ray',
    bodyPart: 'Genou',
    uploadDate: '2024-10-15',
    examinationDate: '2024-10-14',
    radiologist: 'Dr. Mohamed Ben Ali',
    report: 'Radiographie du genou gauche. Légère arthrose. Suivi recommandé dans 6 mois.',
    imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"%3E%3Crect fill="%23333" width="400" height="500"/%3E%3Ctext x="50%25" y="50%25" font-size="24" fill="white" text-anchor="middle" dy=".3em"%3EX-Ray: Genou%3C/text%3E%3C/svg%3E',
  },
  {
    id: 'image-003',
    patientId: 'patient-001',
    filename: 'spine_mri_2024_09_10.dcm',
    type: 'MRI',
    bodyPart: 'Colonne vertébrale',
    uploadDate: '2024-09-10',
    examinationDate: '2024-09-09',
    radiologist: 'Dr. Leila Jamoussi',
    report: 'IRM de la colonne lombaire. Hernies discales mineures au niveau L4-L5. Traitement conservateur recommandé.',
    imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"%3E%3Crect fill="%23111" width="400" height="500"/%3E%3Ctext x="50%25" y="50%25" font-size="24" fill="white" text-anchor="middle" dy=".3em"%3EMRI: Colonne vertébrale%3C/text%3E%3C/svg%3E',
  },
  {
    id: 'image-004',
    patientId: 'patient-001',
    filename: 'brain_ct_2024_08_05.dcm',
    type: 'CT',
    bodyPart: 'Cerveau',
    uploadDate: '2024-08-05',
    examinationDate: '2024-08-04',
    radiologist: 'Dr. Khaled Siddiqui',
    report: 'Scanner cérébral normal. Pas de lésion ou d\'anomalie structurelle. Sinus et ventricules normaux.',
    imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"%3E%3Crect fill="%23444" width="400" height="500"/%3E%3Ctext x="50%25" y="50%25" font-size="24" fill="white" text-anchor="middle" dy=".3em"%3ECT: Cerveau%3C/text%3E%3C/svg%3E',
  },
  {
    id: 'image-005',
    patientId: 'patient-001',
    filename: 'abdomen_ultrasound_2024_07_20.dcm',
    type: 'Ultrasound',
    bodyPart: 'Abdomen',
    uploadDate: '2024-07-20',
    examinationDate: '2024-07-19',
    radiologist: 'Dr. Fatima Al-Mansouri',
    report: 'Échographie abdominale complète. Foie, rate, reins et pancréas normaux. Pas de calculs biliaires.',
    imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"%3E%3Crect fill="%23555" width="400" height="500"/%3E%3Ctext x="50%25" y="50%25" font-size="24" fill="white" text-anchor="middle" dy=".3em"%3EUltrasound: Abdomen%3C/text%3E%3C/svg%3E',
  },
  {
    id: 'image-006',
    patientId: 'patient-001',
    filename: 'heart_pet_2024_06_15.dcm',
    type: 'PET',
    bodyPart: 'Cœur',
    uploadDate: '2024-06-15',
    examinationDate: '2024-06-14',
    radiologist: 'Dr. Omar Mehri',
    report: 'PET scan cardiaque. Perfusion myocardique normale. Pas de zone d\'ischémie détectée.',
    imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"%3E%3Crect fill="%23666" width="400" height="500"/%3E%3Ctext x="50%25" y="50%25" font-size="24" fill="white" text-anchor="middle" dy=".3em"%3EPET: Cœur%3C/text%3E%3C/svg%3E',
  },
];

export const getImagesByPatient = (patientId: string): RadiologyImage[] => {
  return mockRadiologyImages.filter((img) => img.patientId === patientId);
};

export const getImageById = (imageId: string): RadiologyImage | undefined => {
  return mockRadiologyImages.find((img) => img.id === imageId);
};
