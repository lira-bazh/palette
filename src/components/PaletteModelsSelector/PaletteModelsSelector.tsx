import { EColorModel } from "@/types";
import type { FC } from "react";

interface IPaletteModelsSelectorProps {
  models: EColorModel[] | undefined;
  onChange: (models: EColorModel[]) => void;
}

export const PaletteModelsSelector: FC<IPaletteModelsSelectorProps> = ({  }) => {
  return <div>PaletteModelsSelector</div>;
};