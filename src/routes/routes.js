import { createBrowserRouter } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import AddDoctor from "../pages/Dashboard/AddDoctor";
import AddService from "../pages/Dashboard/AddService";
import AllAppointments from "../pages/Dashboard/AllAppointments";
import AllDoctors from "../pages/Dashboard/AllDoctors";
import AllServices from "../pages/Dashboard/AllServices";
import AllUsers from "../pages/Dashboard/AllUsers";
import Checkout from "../pages/Dashboard/Checkout";
import Dashboard from "../pages/Dashboard/Dashboard";
import EditDoctor from "../pages/Dashboard/EditDoctor";
import EditService from "../pages/Dashboard/EditService";
import HospitalServices from "../pages/Dashboard/HospitalServices";
import HospitalServicesDetails from "../pages/Dashboard/HospitalServicesDetails";
import MyAppointments from "../pages/Dashboard/MyAppointments";
import MyAppointmentsDetails from "../pages/Dashboard/MyAppointmentsDetails";
import Settings from "../pages/Dashboard/Settings";
import DoctorsPage from "../pages/DoctorsPage";
import HomePage from "../pages/HomePage";
import DashboardTemp from "../templates/Dashboard";
import Main from "../templates/Main";
import PrivateRoute from "./PrivateRoute";
import RoleBaseRoute from "./RoleBaseRoute";

export const route = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: 'hospital-services',
        element:
          <section style={{ backgroundColor: "rgb(245, 247, 248)" }}>
            <div className='container py-16'>
              <HospitalServices />
            </div>
          </section>
      },
      {
        path: 'doctors',
        element: <DoctorsPage />
      },
      {
        path: 'authentication',
        element: <AuthPage />
      },

    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardTemp /></PrivateRoute>,
    children: [
      {
        path: '',
        element: <Dashboard />
      },
      {
        path: 'hospital-services',
        element: <HospitalServices />
      },
      {
        path: 'hospital-services/:id',
        element: <HospitalServicesDetails />,
        loader: ({ params }) => params.id
      },
      {
        path: 'doctors',
        element: <RoleBaseRoute role={['admin']}><AllDoctors /></RoleBaseRoute>
      },
      {
        path: 'doctors/add-new',
        element: <RoleBaseRoute role={['admin']}><AddDoctor /></RoleBaseRoute>
      },
      {
        path: 'doctors/:id',
        element: <RoleBaseRoute role={['admin']}><EditDoctor /></RoleBaseRoute>,
        loader: ({ params }) => fetch(`https://the-health-care.vercel.app/api/v1/doctors/single/${params.id}`)
      },
      {
        path: 'services',
        element: <RoleBaseRoute role={['admin']}><AllServices /></RoleBaseRoute>
      },
      {
        path: 'services/add-new',
        element: <RoleBaseRoute role={['admin']}><AddService /></RoleBaseRoute>
      },
      {
        path: 'services/:id',
        element: <RoleBaseRoute role={['admin']}><EditService /></RoleBaseRoute>,
        loader: ({ params }) => fetch(`https://the-health-care.vercel.app/api/v1/services/single/${params.id}`)
      },
      {
        path: 'appointments',
        element: <RoleBaseRoute role={['admin', 'doctor']}><AllAppointments /></RoleBaseRoute>
      },
      {
        path: 'appointments/add-new',
        element: <RoleBaseRoute role={['admin']}><AddDoctor /></RoleBaseRoute>
      },
      {
        path: 'appointments/:id',
        element: <RoleBaseRoute role={['admin', 'doctor']}><MyAppointmentsDetails /></RoleBaseRoute>,
        loader: ({ params }) => params.id
      },
      {
        path: 'users',
        element: <RoleBaseRoute role={['admin']}><AllUsers /></RoleBaseRoute>
      },
      {
        path: 'users/add-new',
        element: <RoleBaseRoute role={['admin']}><AddDoctor /></RoleBaseRoute>
      },
      {
        path: 'my-appointments',
        element: <MyAppointments />
      },
      {
        path: 'my-appointments/:id',
        element: <MyAppointmentsDetails />,
        loader: ({ params }) => params.id
      },
      {
        path: 'settings',
        element: <Settings />
      },
      {
        path: 'checkout',
        element: <Checkout />
      }
    ]
  }
]);