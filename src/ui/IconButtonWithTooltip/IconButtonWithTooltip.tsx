import type { FC } from 'react';
import { IconButton, Tooltip, type IconButtonProps } from '@mui/material';

interface IIconButtonWithTooltipProps {
  tooltip: string;
  icon: React.ReactNode;
  iconProps?: IconButtonProps;
}

export const IconButtonWithTooltip: FC<IIconButtonWithTooltipProps> = ({
  tooltip,
  icon,
  iconProps = {},
}) => {
  return (
    <Tooltip title={tooltip}>
      <IconButton {...iconProps}>{icon}</IconButton>
    </Tooltip>
  );
};
