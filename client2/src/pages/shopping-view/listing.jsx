import ProductFilter from '@/components/shopping-view/filter'
import { ArrowUpDownIcon } from 'lucide-react'
import { 
    DropdownMenu,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
    DropdownMenuContent
 } from '@radix-ui/react-dropdown-menu'
import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllFilteredProducts } from '@/store/shop/products-slice'
import { sortOptions } from '@/config'

function ShoppingListing() {
    const dispatch = useDispatch()
    const {productList} = useSelector(state => state.shopProducts)

    useEffect(()=>{
        dispatch(fetchAllFilteredProducts());
    },[dispatch])
    console.log(productList);
    return (
        <div className='grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6'>
            <ProductFilter  />
            <div className='bg-background w-full rounded-lg shadow-sm'>
                <div className='p-4 border-b flex items-center justify-between'>
                    <h2 className='text-lg font-extrabold '>All products</h2>
                    <div className='flex items-center gap-3'>
                        <span className='text-muted-foreground'>10 Products </span>
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                                <ArrowUpDownIcon className='h-4 w-4'/>
                                <span>Sort by</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[200px]">
                            <DropdownMenuRadioGroup>
                                {
                                    sortOptions.map(sortItems=>
                                    <DropdownMenuRadioItem key={sortItems.id}>
                                        {sortItems.label}
                                        </DropdownMenuRadioItem> 
                                        )
                                }
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </div>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4'>
                     
                </div>
            </div>
        </div>
    )
}

export default ShoppingListing
