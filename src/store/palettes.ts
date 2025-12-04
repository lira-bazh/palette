import { createSlice, type PayloadAction, type WritableDraft } from '@reduxjs/toolkit';
import { PalettesServices } from '@/services/palettes';
import type { IPalette } from '@/types';

export interface IPalettesSlice {
  data: Record<string, IPalette>;
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
      const uuid = crypto.randomUUID();
      state.data[uuid] = { uuid, ...action.payload };
      PalettesServices.savePalettes(state.data);
    },
    changePaletteName: (
      state: WritableDraft<IPalettesSlice>,
      action: PayloadAction<{ uuid: string; name: string }>,
    ) => {
      const { uuid, name } = action.payload;
      state.data[uuid].name = name;
      PalettesServices.savePalettes(state.data);
    },
    changeColor: (
      state: WritableDraft<IPalettesSlice>,
      action: PayloadAction<{ uuidPalette: string; uuidColor: string; newColor: string }>,
    ) => {
      const { uuidPalette, uuidColor, newColor } = action.payload;
      state.data[uuidPalette].colors = state.data[uuidPalette].colors.map(item =>
        item.uuid === uuidColor ? { ...item, hex: newColor } : item,
      );
      PalettesServices.savePalettes(state.data);
    },
  },
});

export const { addPalette, changePaletteName, changeColor } = palettesSlice.actions;
