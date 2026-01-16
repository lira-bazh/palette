import { useMemo } from 'react';
import { useColorScheme } from '@mui/material';
import Color, { type ColorInstance } from 'color';
import { TEXT_COLOR } from '@/constants';

export function useTextColor(backgroundColor: ColorInstance | undefined) {
  const { mode } = useColorScheme();

  const colorText = useMemo(() => {
    const currentColorText = mode === 'dark' ? TEXT_COLOR.black : TEXT_COLOR.white;

    if (
      typeof backgroundColor === 'object' &&
      backgroundColor.contrast(Color(currentColorText)) < 7
    ) {
      return mode === 'dark' ? TEXT_COLOR.white : TEXT_COLOR.black;
    }

    return undefined;
  }, [backgroundColor, mode]);

  return colorText;
}
