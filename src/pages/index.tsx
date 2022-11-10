import React from 'react';
import { Link } from 'umi';
import styles from './index.css';

export default function() {
  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />
      <h2>Welcome to UMI</h2>
      <Link to="/users">Users</Link>       
    </div>
  );
}
