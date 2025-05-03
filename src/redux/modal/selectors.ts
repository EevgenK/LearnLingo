import { RootState } from '../store';

export const selectModalStatus = (state: RootState) => state.modal.isOpenModal;
export const selectModalType = (state: RootState) => state.modal.type;
export const selectIsVisible = (state: RootState) => state.modal.isVisible;
