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
    changeColorComment: (
      state: WritableDraft<IPalettesSlice>,
      action: PayloadAction<{ uuidPalette: string; uuidColor: string; comment: string }>,
    ) => {
      const { uuidPalette, uuidColor, comment } = action.payload;
      state.data[uuidPalette].colors = state.data[uuidPalette].colors.map(item =>
        item.uuid === uuidColor ? { ...item, comment } : item,
      );
      PalettesServices.savePalettes(state.data);
    },
    addColor: (
      state: WritableDraft<IPalettesSlice>,
      action: PayloadAction<{ uuidPalette: string; color: string }>,
    ) => {
      const { uuidPalette, color } = action.payload;
      state.data[uuidPalette].colors.push({ uuid: crypto.randomUUID(), hex: color });
      PalettesServices.savePalettes(state.data);
    },
    removeColor: (
      state: WritableDraft<IPalettesSlice>,
      action: PayloadAction<{ uuidPalette: string; uuidColor: string }>,
    ) => {
      const { uuidPalette, uuidColor } = action.payload;
      state.data[uuidPalette].colors = state.data[uuidPalette].colors.filter(
        item => item.uuid !== uuidColor,
      );
      PalettesServices.savePalettes(state.data);
    },
    moveColor: (
      state: WritableDraft<IPalettesSlice>,
      action: PayloadAction<{ uuidPalette: string; upperUuid: string; movedUuid: string }>,
    ) => {
      const { uuidPalette, upperUuid, movedUuid } = action.payload;
      PalettesServices.moveColors(state.data[uuidPalette].colors, upperUuid, movedUuid);
      PalettesServices.savePalettes(state.data);
    },
    removePalette: (state: WritableDraft<IPalettesSlice>, action: PayloadAction<string>) => {
      const uuid = action.payload;
      delete state.data[uuid];
      PalettesServices.savePalettes(state.data);
    }
  },
});

export const {
  addPalette,
  changePaletteName,
  changeColor,
  addColor,
  removeColor,
  changeColorComment,
  moveColor,
  removePalette,
} = palettesSlice.actions;
