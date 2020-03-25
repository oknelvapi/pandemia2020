import React from 'react';

import { LocalHospital, Public, AddLocation } from '@material-ui/icons';

import styles from './Spinner.module.scss';

export const Spinner: React.FC = () => (
  <div className={styles.Container}>
    <div className={styles.Container_Spinner}>
      <div className={styles.Container_Spinner_Icons}>
        <LocalHospital />
        <AddLocation />
        <Public />
        <div className={styles.Container_Spinner_Loader} />
      </div>
    </div>
  </div>
);
