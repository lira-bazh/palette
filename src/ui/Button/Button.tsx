import { type FC, type ReactNode } from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

interface IButtonProps {
  className?: string;
  text: ReactNode;
  onClick?: () => void;
  id?: string;
  popoverTarget?: string;
  disabled?: boolean;
  title?: string;
}

export const Button: FC<IButtonProps> = ({ className, text, onClick, ...props }) => {
  return (
    <button
      {...props}
      className={classNames(styles.customButton, className)}
      onClick={() => {
        if (typeof onClick === 'function') {
          onClick();
        }
      }}>
      {text}
    </button>
  );
};
