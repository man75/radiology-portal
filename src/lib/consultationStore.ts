import { create } from 'zustand';
import { Consultation, PagedResult } from '@/types/index';
import { getConsultationsAPI } from '@/lib/api';

interface ConsultationStore {
  consultations: Consultation[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;

  fetchConsultations: (page?: number, cabinetId?: string, patientId?: string, dateFrom?: string, dateTo?: string) => Promise<void>;
  setCurrentPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  setError: (error: string | null) => void;
}

export const useConsultationStore = create<ConsultationStore>((set, get) => ({
  consultations: [],
  loading: false,
  error: null,
  currentPage: 1,
  pageSize: 10,
  totalPages: 0,
  totalRecords: 0,

  fetchConsultations: async (
    page: number = 1,
    cabinetId?: string,
    patientId?: string,
    dateFrom?: string,
    dateTo?: string
  ) => {
    set({ loading: true, error: null });

    try {
      const pageSize = get().pageSize;
      console.log(`🔄 Fetching consultations: pageNumber=${page}, pageSize=${pageSize}`);
      if (cabinetId) console.log(`   Filter: cabinetId=${cabinetId}`);
      if (patientId) console.log(`   Filter: patientId=${patientId}`);
      if (dateFrom) console.log(`   Filter: dateFrom=${dateFrom}`);
      if (dateTo) console.log(`   Filter: dateTo=${dateTo}`);
      
      const result: any = await getConsultationsAPI(
        page,
        pageSize,
        cabinetId,
        patientId,
        dateFrom,
        dateTo
      );

      console.log('📦 API Response:', result);

      // ✅ Mapper la réponse API à la structure attendue
      const consultations = result.data || [];
      const pageNumber = result.pageNumber || page;
      const totalPages = result.totalPages || 1;
      const totalCount = result.totalCount || 0;

      // ✅ Transformer les consultations pour ajouter les champs attendus
      const transformedConsultations = consultations.map((consultation: any) => ({
        id: consultation.id,
        patientId: consultation.patientId,
        cabinetId: consultation.cabinetId,
        date: consultation.date,
        createdAt: consultation.createdAt,
        updatedAt: consultation.updatedAt,
        patient: consultation.patient,
        actes: consultation.actes || [],
        // ✅ Ajouter les champs pour l'affichage
        patientNomComplet: `${consultation.patient?.prenom} ${consultation.patient?.nom}`,
        patientName: `${consultation.patient?.prenom} ${consultation.patient?.nom}`,
        cabinetNom: 'Cabinet', // À adapter si tu as le nom du cabinet dans la réponse
        etat: 'COMPLETE' // À adapter selon ta logique
      }));

      set({
        consultations: transformedConsultations,
        currentPage: pageNumber,
        totalPages: totalPages,
        totalRecords: totalCount,
        loading: false,
        error: null,
      });
      
      console.log(`✅ Consultations loaded: ${transformedConsultations.length}/${totalCount} items`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors du chargement des consultations';
      console.error('❌ Error loading consultations:', errorMessage);
      set({
        loading: false,
        error: errorMessage,
        consultations: [],
      });
      throw err;
    }
  },

  setCurrentPage: (page: number) => {
    set({ currentPage: page });
  },

  setPageSize: (pageSize: number) => {
    set({ pageSize, currentPage: 1 });
  },

  setError: (error: string | null) => {
    set({ error });
  },
}));