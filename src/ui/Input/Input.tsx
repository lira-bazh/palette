import { type FC, useState, type Ref } from 'react';
import classNames from 'classnames';
import styles from './Input.module.scss';

interface IInputProps {
  label?: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: (value: string) => void;
  className?: string;
  type?: 'text' | 'number';
  validation?: (value: string) => string;
  ref?: Ref<HTMLInputElement>;
}

export const Input: FC<IInputProps> = ({
  label = '',
  validation,
  onChange,
  onBlur,
  className,
  type = 'text',
  ...props
}) => {
  const [error, setError] = useState('');

  return (
    <div className={className}>
      <label className={styles.customLabel}>
        {label}
        <input
          {...props}
          pattern={type == 'number' ? '[0-9]*' : undefined}
          className={classNames(styles.customInput, error && styles.invalidInput)}
          onChange={e => {
            if (typeof validation === 'function') {
              setError(validation(e.target.value));
            }

            onChange(e.target.value);
          }}
          onBlur={e => {
            if (typeof onBlur === 'function') {
              onBlur(e.target.value);
            }
          }}
        />
      </label>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};
