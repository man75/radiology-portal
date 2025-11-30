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

  fetchConsultations: (page: number) => Promise<void>;
  setCurrentPage: (page: number) => void;
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

  fetchConsultations: async (page: number = 1) => {
    set({ loading: true, error: null });

    try {
      const pageSize = get().pageSize;
      console.log(`🔄 Fetching consultations: page=${page}, pageSize=${pageSize}`);
      
      const result: PagedResult<Consultation> = await getConsultationsAPI(page, pageSize);

      set({
        consultations: result.items,  // ✅ Changé de "data" à "items"
        currentPage: result.currentPage,  // ✅ Changé de "pageNumber"
        totalPages: result.totalPages,
        totalRecords: result.totalItems,  // ✅ Changé de "totalRecords" à "totalItems"
        loading: false,
        error: null,
      });
      
      console.log(`✅ Consultations loaded: ${result.items.length} items`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors du chargement des consultations';
      console.error('❌ Error loading consultations:', errorMessage);
      set({
        loading: false,
        error: errorMessage,
      });
      throw err;
    }
  },

  setCurrentPage: (page: number) => {
    set({ currentPage: page });
  },

  setError: (error: string | null) => {
    set({ error });
  },
}));