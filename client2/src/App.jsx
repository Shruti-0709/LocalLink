import Login from './pages/auth/login'
import { Route,Routes } from 'react-router-dom'
import Register from './pages/auth/register'
import AuthLayout from './components/ui/auth/layout'
import AdminLayout from './components/admin-view/layout'
import AdminOrders from './pages/admin-view/orders'
import AdminFeatures from './pages/admin-view/features'
import AdminProducts from './pages/admin-view/products'
import AdminDashboard from './pages/admin-view/dashboard'
import NotFound from './pages/not-found'
import ShoppingLayout from './components/shopping-view/layout'
import ShoppingHome from './pages/shopping-view/home'
import ShoppingCheckout from './pages/shopping-view/checkout'
import ShoppingListing from './pages/shopping-view/listing'
import ShoppingAccount from './pages/shopping-view/account'
import CheckAuth from './components/common/check-auth'
import UnauthPage from './pages/unauth-page'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAuth } from './store/auth-slice'
import { Skeleton } from "@/components/ui/skeleton"


function App() {
  const {user,isAuthenticated,isLoading}=useSelector(state=>state.auth);
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(checkAuth());
  },[dispatch])
  if(isLoading)
    return <Skeleton className="w-[500px] h-[500px] rounded-lg m-auto mt-12" />

  return (

      <div className='flex flex-col overflow-hidden bg-white'>
      {/*common component*/}
    

      <Routes>
        <Route path="/auth" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><AuthLayout/></CheckAuth>}>
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
        </Route>
        <Route path='/admin' element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><AdminLayout/></CheckAuth>}> 
          <Route path='orders' element={<AdminOrders/>}/>
          <Route path='features' element={<AdminFeatures/>}/>
          <Route path='products' element={<AdminProducts/>}/>
          <Route path='dashboard' element={<AdminDashboard/>}/>
        </Route>
        <Route path='/shop' element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><ShoppingLayout/></CheckAuth>}>
          <Route path='home' element={<ShoppingHome/>}/>
          <Route path='listing' element={<ShoppingListing/>}/>
          <Route path='checkout' element={<ShoppingCheckout/>}/>  
          <Route path='account' element={<ShoppingAccount/>}/>  
        </Route>
        <Route path='/unauth-page' element={<UnauthPage/>}/>
      </Routes>
      </div>
    
  )
}

export default App
