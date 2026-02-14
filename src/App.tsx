import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import ProtectedRoute from './components/auth/ProtectedRoute'
import ModuleLayout from './layouts/ModuleLayout'
import Home from './pages/user/Home'
import AssignmentPage from './pages/user/assignments/AssignmentPage'
import EditLayout from './layouts/EditLayout'
import CreateAssignment from './pages/user/assignments/CreateAssignment'
import AccountsPage from './pages/user/accounts/AccountsPage'
import CreateAccount from './pages/user/accounts/CreateAccount'
import CreateIncome from './pages/user/transactions/CreateIncome'
import CreateSpent from './pages/user/transactions/CreateSpent'
import Cards from './tests/Cards'
import AddToAssignment from './pages/user/assignments/AddToAssignment'
import CustomModuleLayout from './layouts/CustomModuleLayout'
import TransferAccount from './pages/user/accounts/TransferAccount'
import TransferAssignment from './pages/user/assignments/TransferAssignment'
import WelcomePage from './pages/public/Welcome'

function App() {
  const [count, setCount] = useState(0)

  return (  
    <Routes>
      <Route path='/' element={<WelcomePage />}/>
      <Route path='/login' element={ <LoginPage /> }/>
      <Route path='/register' element={ <RegisterPage /> }/>
      <Route path='/cards' element={ <Cards />}/>

      <Route element={<ProtectedRoute allowedRoles={['user']}/>}>
        <Route element={<ModuleLayout />}>
          <Route path='/home' element={<Home />}/>
          <Route path='/assignment' element={<AssignmentPage />}/>
          <Route path='/account' element={<AccountsPage />}/>
          <Route path='/profile' />
        </Route>
        
        <Route element={<EditLayout/>}>
          <Route path='/assignment/create' element={<CreateAssignment />}/>
          <Route path='/account/create' element={<CreateAccount />}/>
          <Route path='/income' element={<CreateIncome />}/>
          <Route path='/spent' element={<CreateSpent />}/>
          <Route path='/account/transfer' element={<TransferAccount />}/>
          <Route path='/assignment/transfer' element={<TransferAssignment />}/>
        </Route>

        <Route element={<CustomModuleLayout />}>
          <Route path='/assignment/assign' element={<AddToAssignment />}/>
        </Route>
      </Route>
    </Routes>
  );
}

export default App
