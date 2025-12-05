import { Link } from 'react-router';
import { PlusIcon } from '@/ui/Icons';
import { ROUTES } from '@/constants';
import styles from './AddPalette.module.scss'

export const AddPalette = () => {
  return (
    <Link to={ROUTES.newPalette()} className={styles['add-palette']}>
      <PlusIcon />
    </Link>
  );
};
