import HomePage from './components/pages/HomePage'
import AdminPage from './components/pages/AdminPage';
import UserPage from './components/pages/UserPage';
import PageNotFound from './components/pages/PageNotFound';

const routeConfig = () => ({
  home: {
    path: '/',
    component: HomePage
  },
  adminPage: {
    path: '/admin',
    component: AdminPage
  },
  userPage: {
    path: '/user',
    component: UserPage
  },
  pageNotFound: {
    path: '*',
    component: PageNotFound
  }
});

export default routeConfig;
