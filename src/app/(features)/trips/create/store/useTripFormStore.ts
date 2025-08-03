import { create } from 'zustand'

interface TripFormState {
  formData: Record<string, unknown>
  currentStep: number
  setFormData: (data: Record<string, unknown>) => void
  setCurrentStep: (step: number) => void
}

export const useTripFormStore = create<TripFormState>((set) => ({
  formData: {},
  currentStep: 0,
  setFormData: (data) => set({ formData: data }),
  setCurrentStep: (step) => set({ currentStep: step }),
}))
