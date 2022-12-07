import { RouterProvider } from 'react-router-dom';
import './App.css';
import { route } from './routes/routes';
import 'react-day-picker/dist/style.css';


function App() {
  return (
    <>
      <RouterProvider router={route}></RouterProvider>
    </>
  );
}

export default App;
