import React, { lazy, Suspense } from 'react';
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import { Layout, Menu, Spin } from 'antd';

const AppRouter = () => {
  const { Header, Content, Footer } = Layout;

  const routes = [
    {
      path: '/',
      exact: true,
      component: lazy(() => import('../views/public/main')),
    },
    {
      path: '/sign-in',
      component: lazy(() => import('../views/public/login')),
    },
    {
      path: '/sign-up',
      component: lazy(() => import('../views/public/register')),
    },
    {
      path: '/dashboard',
      component: lazy(() => import('../views/private/dashboard')),
    }
  ];

  return (
    <Suspense fallback={<Spin />}>
      <Router>
        <Layout className="site-layout">          
          <Content style={{ margin: '0 16px' }}>
            <Switch>
              {routes.map((route, idx) => {
                return <Route exact={route.exact} key={idx} path={route.path}>
                  <route.component />
                </Route>
              })}
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ammo Content ©{new Date().getFullYear()}</Footer>
        </Layout>
      </Router>
    </Suspense>

  );
}

export default AppRouter;