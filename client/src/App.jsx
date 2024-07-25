import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import { lazy } from 'react';
import { useRecoilValue } from 'recoil'
import { adminTokenAtom } from './recoil/adminAtoms';

import Home from "./pages/Home";
import SignIn from "./pages/admin/SignIn";
import Dashboard from "./pages/admin/Dashboard";
import Error from "./pages/Error";

// const Home = lazy(() => import("./pages/Home"));
// const SignIn = lazy(() => import("./pages/admin/SignIn"));
// const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
// const Error = lazy(() => import("./pages/Error"));


const App = () => {
  const token = useRecoilValue(adminTokenAtom)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={token ? <Dashboard /> : <SignIn />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App