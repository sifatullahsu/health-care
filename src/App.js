import { RouterProvider } from 'react-router-dom';
import './App.css';
import { route } from './routes/routes';
import 'react-day-picker/dist/style.css';
import 'react-loading-skeleton/dist/skeleton.css'
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <RouterProvider router={route}></RouterProvider>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </>
  );
}

export default App;
