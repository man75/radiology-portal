import { create } from 'zustand';
import { User, RadiologyImage } from '@/types/index';
import { mockRadiologyImages } from '@/data/mockData';
import { getUserRoles, decodeJWT } from '@/lib/tokenService';

interface RadiologyStore {
  user: User | null;
  images: RadiologyImage[];
  isAuthenticated: boolean;
  loading: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  error: string | null;
  userRoles: string[];
  
  login: (userName: string, password: string) => Promise<void>;
  logout: () => void;
  deleteImage: (imageId: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  refreshAccessToken: () => Promise<void>;
  hasRole: (role: string) => boolean;
}

export const useRadiologyStore = create<RadiologyStore>((set, get) => ({
  user: null,
  images: [],
  isAuthenticated: false,
  loading: false,
  accessToken: null,
  refreshToken: null,
  error: null,
  userRoles: [],

  login: async (userName: string, password: string) => {
    set({ loading: true, error: null });
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const loginEndpoint = `${apiUrl}/api/auth/login`;

      const response = await fetch(loginEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Erreur de connexion');
      }

      const data = await response.json();

      // Sauvegarder les tokens
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
      }

      // Décoder le JWT pour extraire les infos utilisateur et les rôles
      const userInfo = decodeJWT(data.accessToken);
      const roles = getUserRoles(data.accessToken);

      const user: User = {
        id: userInfo?.sub || '',
        patient: {
          id: userInfo?.sub || '',
          firstName: userInfo?.given_name || '',
          lastName: userInfo?.family_name || '',
          email: userInfo?.email || userName,
          dateOfBirth: '1985-01-01',
          medicalRecordNumber: userInfo?.preferred_username || '',
        },
        isAuthenticated: true,
      };

      set({
        user,
        isAuthenticated: true,
        images: mockRadiologyImages,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        userRoles: roles,
        loading: false,
        error: null,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur de connexion';
      set({ 
        loading: false, 
        error: errorMessage,
        isAuthenticated: false,
        userRoles: [],
      });
      throw err;
    }
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }

    set({
      user: null,
      isAuthenticated: false,
      images: [],
      loading: false,
      accessToken: null,
      refreshToken: null,
      error: null,
      userRoles: [],
    });
  },

  refreshAccessToken: async () => {
    const { refreshToken } = get();
    
    if (!refreshToken) {
      set({ isAuthenticated: false });
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const refreshEndpoint = `${apiUrl}/api/auth/refresh`;

      const response = await fetch(refreshEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${refreshToken}`,
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        throw new Error('Refresh token échoué');
      }

      const data = await response.json();

      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', data.accessToken);
        if (data.refreshToken) {
          localStorage.setItem('refreshToken', data.refreshToken);
        }
      }

      set({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken || refreshToken,
      });
    } catch (err) {
      set({ isAuthenticated: false });
      get().logout();
    }
  },

  deleteImage: (imageId: string) => {
    set((state) => ({
      images: state.images.filter((img) => img.id !== imageId),
    }));
  },

  setLoading: (loading: boolean) => {
    set({ loading });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  hasRole: (role: string) => {
    const { userRoles } = get();
    return userRoles.includes(role);
  },
}));
