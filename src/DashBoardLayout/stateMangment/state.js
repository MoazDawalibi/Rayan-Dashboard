import { create } from 'zustand'

export const useStatePage = create((set) => ({
  isOpenAddModel: false,
  isOpenEditModel: false,
  objectToEdit:null,
  setIsOpenAddModel: () => set((state) => ({ isOpenAddModel: !state.isOpenAddModel })),
  setIsOpenEditModel: () => set((state) => ({ isOpenEditModel: !state.isOpenEditModel })),
  CloseAllModal: () => set((state) => ({ isOpenAddModel: false ,isOpenEditModel:false  })),
  setObjectToEdit: (data) => set((state) => ({ objectToEdit: data })),

}))