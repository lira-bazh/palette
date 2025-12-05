import type { FC, ReactNode } from "react";
import classNames from 'classnames';
import styles from './Tooltip.module.scss';

interface ITooltipProps {
  id: string;
  children: ReactNode;
  text: string;
  disabled?: boolean;
}

export const Tooltip: FC<ITooltipProps> = ({ id, children, text, disabled }) => {
  return (
    <div aria-describedby={id} className={classNames(styles['custom-tooltip'], disabled && styles.disabled)}>
      {children}
      <div role="tooltip" id={id} data-position="top">
        {text}
      </div>
    </div>
  );
};