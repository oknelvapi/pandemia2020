import React from 'react';

import styles from './DustEffect.module.scss';

export const DustEffect: React.FC = () => {
  return (
    <>
      <div id={styles.stars}></div>
      <div id={styles.stars2}></div>
      <div id={styles.stars3}></div>
      <div id={styles.stars4}></div>
    </>
  );
};
