import React from 'react'
import { House, LogOut, UserCog} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Sheet,SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { shoppingViewHeaderMenuItems } from '@/config'
import { Menu } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { ShoppingCart } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogoutUser } from '@/store/auth-slice'



function MenuItems(){
    return <nav className='flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row'>
        {
            shoppingViewHeaderMenuItems.map(menuItem => <Link className='text-sm font-medium' key={menuItem.id} to={menuItem.path}>{menuItem.label}</Link>)
        }
    </nav>
}

function HeaderRightContent(){
    const {user} = useSelector((state)=>state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleLogout(){
        dispatch(LogoutUser());
    }

    // if (!user) return null;

    return <div className='flex lg:items-center lg:flex-row flex-col gap-4'>
        <Button>
        <ShoppingCart className="h-6 w-6"/>
        <span className='sr-only'>User Cart</span>
        </Button> 
        <DropdownMenu>
            <DropdownMenuTrigger asChild> 
                <Avatar className="bg-lime-600">
                    <AvatarFallback className="bg-black text-lime-600 font-extrabold">{user?.userName[0].toUpperCase()}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" className="w-56">
                <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem onClick={()=>navigate("/shop/account")}>
                    <UserCog className='mr-2 h-4 w-4'/>
                    Account 
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem onClick={handleLogout}>
                <LogOut className='mr-2 h-4 w-4'/>
                LogOut
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
}   

function ShoppingHeader() {
    const {isAuthenticated,user}=useSelector((state)=>state.auth);
        // Check if authentication is loading or user data is missing
        if (isAuthenticated && !user) {
            return <div>Loading...</div>;
        }
    console.log(user,'useruseruser');
    return (
       <header className='sticky top-0 z-40 w-full border-b bg-background bg-lime-600'>
        <div className='flex h-16 items-center justify-between px-4 md:px-6'>
            <Link to='/shop/home' className='flex items-center gap-6 text-lg'>
            <House className='h-6 w-6 '/>
            <span className='font-bold'>LocalLink</span>
            </Link>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="lg:hidden">
                    <Menu className="h-6 w-6"/>
                        <span className='sr-only'>Toggle header <menu></menu></span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full max-w-xs bg-white p-4">
                 <MenuItems />
                 <HeaderRightContent/>
                </SheetContent>
                </Sheet>
                
                <div className='hidden lg:block'>
                <MenuItems/>
                </div>
             
           
         <div className='hidden lg:block'>
            <HeaderRightContent />
        </div> 
   


        </div>

       </header>
    )
}

export default ShoppingHeader
