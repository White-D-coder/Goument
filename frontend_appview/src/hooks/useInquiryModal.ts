import { create } from 'zustand';

export interface InquiryModalOptions {
  occasion?: string;
  source?: string;
  defaultBudget?: string;
  defaultQuantity?: string;
}

interface InquiryModalState {
  isOpen: boolean;
  options: InquiryModalOptions;
  openInquiryModal: (options?: InquiryModalOptions) => void;
  closeInquiryModal: () => void;
}

export const useInquiryModal = create<InquiryModalState>((set) => ({
  isOpen: false,
  options: {},
  openInquiryModal: (options = {}) => set({ isOpen: true, options }),
  closeInquiryModal: () => set({ isOpen: false, options: {} }),
}));
