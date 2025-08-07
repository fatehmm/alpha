import { create } from "zustand";

interface Organization {
  id: string;
  name: string;
  slug: string;
  logo?: string | null;
  metadata?: string | null;
  createdAt: string;
}

interface ActiveOrganizationState {
  activeOrganization: Organization | null;
  setActiveOrganization: (organization: Organization | null) => void;
  clearActiveOrganization: () => void;
}

export const useActiveOrganizationStore = create<ActiveOrganizationState>()(
  (set) => ({
    activeOrganization: null,
    setActiveOrganization: (organization) =>
      set({ activeOrganization: organization }),
    clearActiveOrganization: () => set({ activeOrganization: null }),
  })
);
