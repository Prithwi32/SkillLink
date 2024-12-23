// Store for managing registration state across component lifecycles
import { create } from 'zustand';

export const useRegistrationStore = create((set, get) => ({
  pendingRegistrations: {},
  setPending: (eventId) => {
    set((state) => ({
      pendingRegistrations: {
        ...state.pendingRegistrations,
        [eventId]: true,
      },
    }));
  },
  isPending: (eventId) => get().pendingRegistrations[eventId] || false,
}));
