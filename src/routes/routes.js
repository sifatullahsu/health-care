import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import AppointmentPage from "../pages/AppointmentPage";
import AddDoctor from "../pages/Dashboard/AddDoctor";
import AddService from "../pages/Dashboard/AddService";
import AllDoctors from "../pages/Dashboard/AllDoctors";
import AllServices from "../pages/Dashboard/AllServices";
import Checkout from "../pages/Dashboard/Checkout";
import Dashboard from "../pages/Dashboard/Dashboard";
import EditDoctor from "../pages/Dashboard/EditDoctor";
import EditService from "../pages/Dashboard/EditService";
import HospitalServices from "../pages/Dashboard/HospitalServices";
import MyAppointments from "../pages/Dashboard/MyAppointments";
import ServiceAddNew from "../pages/Dashboard/ServiceAddNew";
import ServicesSingle from "../pages/Dashboard/ServicesSingle";
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
    element: <DashboardTemp></DashboardTemp>,
    children: [
      {
        path: '',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      },
      {
        path: 'hospital-services',
        element: <HospitalServices></HospitalServices>
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
        loader: ({ params }) => fetch(`http://localhost:5001/doctors/${params.id}`)
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
        loader: ({ params }) => fetch(`http://localhost:5001/services/${params.id}`)
      },
      {
        path: 'appointments',
        element: <AllDoctors></AllDoctors>
      },
      {
        path: 'appointments/add-new',
        element: <AddDoctor></AddDoctor>
      },
      {
        path: 'users',
        element: <AllDoctors></AllDoctors>
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
        path: 'checkout/:id',
        element: <Checkout></Checkout>,
        loader: ({ params }) => params.id
      }
    ]
  }
]);