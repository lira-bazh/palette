import { Link } from 'react-router';
import { Card, CardActionArea } from '@mui/material';
import { PlusIcon } from '@/ui/Icons';
import { ROUTES } from '@/constants';
import styles from './AddPalette.module.scss'

export const AddPalette = () => {
  return (
    <Card className={styles['add-palette']}>
      <CardActionArea>
        <Link to={ROUTES.newPalette()} className={styles['add-palette__link']}>
          <PlusIcon />
        </Link>
      </CardActionArea>
    </Card>
  );
};
