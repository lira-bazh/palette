import { type FC, useState, type Ref } from 'react';
import classNames from 'classnames';
import styles from './Input.module.scss';

interface IInputProps {
  label?: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: (value?: string) => void;
  className?: string;
  validation?: (value: string) => string;
  ref?: Ref<HTMLInputElement>;
  placeholder?: string;
}

export const Input: FC<IInputProps> = ({
  label = '',
  validation,
  onChange,
  onBlur,
  className,
  ...props
}) => {
  const [error, setError] = useState('');

  return (
    <div className={className}>
      <label className={styles.customLabel}>
        {label}
        <input
          {...props}
          className={classNames(styles.customInput, error && styles.invalidInput)}
          onChange={e => {
            if (typeof validation === 'function') {
              setError(validation(e.target.value));
            }

            onChange(e.target.value);
          }}
          onBlur={() => {
            if (typeof onBlur === 'function') {
              onBlur();
            }
          }}
          onKeyUp={(e) => {
            if (e.key == 'Enter' && typeof onBlur === 'function') {
              onBlur();
            }
          }}
        />
      </label>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};
