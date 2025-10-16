import { create } from 'zustand'

type AdminRole = 'superadmin' | 'admin' | 'user' | undefined

type AppState = {
  theme: 'light' | 'dark'
  setTheme: (t: 'light' | 'dark') => void
  adminRole: AdminRole
  setAdminRole: (r: AdminRole) => void
}

export const useZustandStore = create<AppState>((set) => ({
  theme: 'light',
  setTheme: (theme) => set({ theme }),
  adminRole: 'admin',
  setAdminRole: (role) => set({ adminRole: role }),
}))


