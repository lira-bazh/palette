import { createSlice, type PayloadAction, type WritableDraft } from '@reduxjs/toolkit';
import { PalettesServices } from '@/services/palettes';
import type { IPalette } from '@/types';

export interface IPalettesSlice {
  data: IPalette[];
}

export const palettesSlice = createSlice({
  name: 'palettes',
  initialState: {
    data: PalettesServices.getPalettes(),
  } as IPalettesSlice,
  reducers: {
    addPalette: (
      state: WritableDraft<IPalettesSlice>,
      action: PayloadAction<Omit<IPalette, 'uuid'>>,
    ) => {
      state.data.push({ uuid: crypto.randomUUID(), ...action.payload });
      PalettesServices.savePalettes(state.data);
    },
  },
});

export const { addPalette } = palettesSlice.actions;
