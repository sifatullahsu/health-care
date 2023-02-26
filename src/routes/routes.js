import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import AppointmentPage from "../pages/AppointmentPage";
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
import Settings from "../pages/Dashboard/Settings";
import HomePage from "../pages/HomePage";
import DashboardTemp from "../templates/Dashboard";
import Main from "../templates/Main";
import PrivateRoute from "./PrivateRoute";

export const route = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <HomePage></HomePage>
      },
      {
        path: '/appointment',
        element: <AppointmentPage></AppointmentPage>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'signup',
        element: <SignUp></SignUp>
      }
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardTemp /></PrivateRoute>,
    children: [
      {
        path: '',
        element: <Dashboard></Dashboard>,
      },
      {
        path: 'hospital-services',
        element: <HospitalServices></HospitalServices>
      },
      {
        path: 'hospital-services/:id',
        element: <HospitalServicesDetails></HospitalServicesDetails>,
        loader: ({ params }) => params.id
      },
      {
        path: 'doctors',
        element: <AllDoctors></AllDoctors>
      },
      {
        path: 'doctors/add-new',
        element: <AddDoctor></AddDoctor>
      },
      {
        path: 'doctors/:id',
        element: <EditDoctor></EditDoctor>,
        loader: ({ params }) => fetch(`http://localhost:5000/api/v1/doctors/single/${params.id}`)
      },
      {
        path: 'services',
        element: <AllServices></AllServices>
      },
      {
        path: 'services/add-new',
        element: <AddService></AddService>
      },
      {
        path: 'services/:id',
        element: <EditService></EditService>,
        loader: ({ params }) => fetch(`http://localhost:5000/api/v1/services/single/${params.id}`)
      },
      {
        path: 'appointments',
        element: <AllAppointments></AllAppointments>
      },
      {
        path: 'appointments/add-new',
        element: <AddDoctor></AddDoctor>
      },
      {
        path: 'users',
        element: <AllUsers></AllUsers>
      },
      {
        path: 'users/add-new',
        element: <AddDoctor></AddDoctor>
      },
      {
        path: 'my-appointments',
        element: <MyAppointments></MyAppointments>
      },
      {
        path: 'settings',
        element: <Settings></Settings>
      },
      {
        path: 'checkout',
        element: <Checkout></Checkout>,
      }
    ]
  }
]);