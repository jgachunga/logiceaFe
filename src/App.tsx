import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import { PrivateRoute } from './services/PrivateRoutes'
import Nav from './components/Nav'
import React from 'react'
import JokesTable from './components/tables/JokesTable'
import './App.css'
import EditForm from './components/forms/EditForm'
import AddForm from './components/forms/AddForm '
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ThemeContextProps {
  isLight: boolean; toggleTheme: () => void;
}

export const ThemeContext = React.createContext({} as ThemeContextProps);
export default function App() {
const [isLight, setIsLight] = React.useState(true);

 const toggleTheme = () => {
    setIsLight((currentTheme) => (currentTheme === isLight ? !isLight : isLight));
    console.log("isLight",isLight)
 }
  return (
    <div className="mode">
      <ThemeContext.Provider value={{isLight,toggleTheme}} >
      <BrowserRouter>
        <Nav/>
      <Routes>
        <Route path="/" element={<PrivateRoute><Home isLight={isLight} /></PrivateRoute>}/>
            <Route path="/login" element={<Login isLight={isLight} />}/>
            <Route path="/jokes-table" element={<PrivateRoute><JokesTable isLight={isLight} /></PrivateRoute>}/>
            <Route path="/edit-form/:id" element={<PrivateRoute> <EditForm isLight={isLight} /></PrivateRoute>}/>
            <Route path="/add-jokes" element={<PrivateRoute><AddForm isLight={isLight} /> </PrivateRoute>}/>
        
      </Routes>
      </BrowserRouter>
      </ThemeContext.Provider>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  )
}
