import { Route, Routes } from 'react-router-dom';
import PrivateRoute from 'src/components/Auth/privateRoute';
import LayoutDefault from 'src/layouts/LayoutDefault';
import { privateRoutes, publicRoutes } from './index';
const RouterComponent = () => {
  return (
    <div className="App">
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          if (!route.children) {
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <LayoutDefault>
                    <Page />
                  </LayoutDefault>
                }
              />
            );
          } else {
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <LayoutDefault>
                    <Page />
                  </LayoutDefault>
                }
              >
                {route?.children.map((item, index) => {
                  const PageChild = item?.component;
                  return (
                    <Route
                      key={index}
                      index={item?.index}
                      path={item?.path}
                      element={<PageChild />}
                    />
                  );
                })}
              </Route>
            );
          }
        })}
        {privateRoutes.map((route, index) => {
          const Page = route.component;
          if (!route.children) {
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <PrivateRoute>
                    <Page />
                  </PrivateRoute>
                }
              />
            );
          } else {
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <PrivateRoute>
                    <Page />
                  </PrivateRoute>
                }
              >
                {route?.children.map((item, index) => {
                  const PageChild = item?.component;
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      element={
                        <PrivateRoute>
                          <PageChild />
                        </PrivateRoute>
                      }
                    />
                  );
                })}
              </Route>
            );
          }
        })}
      </Routes>
    </div>
  );
};

export default RouterComponent;
