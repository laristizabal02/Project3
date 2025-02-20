import PrivateRoute from './utils/PrivateRoutes.tsx';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import ErrorPage from './pages/error.tsx';
import Login from './pages/login.tsx';
import './index.css'
import App from './App.tsx'
import InstructorPage from './pages/instructorPage.tsx';
import ParentPage from './pages/parentPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Login />
      }, 
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/instructor',
        element: (<PrivateRoute>
          <InstructorPage />
        </PrivateRoute>),
      }, 
      {
        path: '/parent',
        element: <PrivateRoute>
        <ParentPage />
      </PrivateRoute>
      }, 
    ]
  }
])


/*
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);*/

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
