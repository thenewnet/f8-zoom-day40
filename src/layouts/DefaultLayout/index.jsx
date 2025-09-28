
import { Outlet } from 'react-router';
import Header from '../Header';
import styles from './DefaultLayout.module.scss';

function DefaultLayout() {
  return <div className={styles.container}>
    <Header />
    <div className={styles.content}>
      <Outlet />
    </div>
  </div>;
}

export default DefaultLayout;
