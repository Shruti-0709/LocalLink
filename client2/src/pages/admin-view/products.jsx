import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { addProductFormElements } from '@/config'
import { Fragment } from 'react'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle
  } from "@/components/ui/sheet"
import CommonForm from '@/components/common/form'  
import ProductImageUpload from '@/components/admin-view/image-upload'
import { useDispatch, useSelector } from 'react-redux'
import {
     addNewProduct, 
     deleteProduct, 
     editProduct, 
     fetchAllProducts
     } from '@/store/admin/products-slice'
import { useToast } from '@/hooks/use-toast'
import AdminProductTile from './product-tile'


 
const initialFormData ={
    image: null,
    title:'',
    description:'',
    category:'',
    brand:'',
    price:'',
    salePrice:'',
    totalStock:'',
}


function AdminProducts() {
   
    const [openCreateProductsDialog,setopenCreateProductsDialog]=useState(false);
    const [formData,setFormData]=useState(initialFormData);
    const [imageFile,setimageFile]=useState(null);
    const [uploadedImageUrl,setUploadedImageUrl]=useState('');
    const [imageLoadingState,setImageLoadingState]=useState(false);
    const dispatch=useDispatch()
    const {productList}=useSelector(state=>state.adminProducts);
    const {toast}=useToast();
    const [currentEditedId,setCurrentEditedId]=useState(null);

    function onSubmit(event) {
        event.preventDefault();
        
        if (currentEditedId !== null) {
            // Editing an existing product
            console.log("currentEditedId:", currentEditedId); 
            dispatch(editProduct({
                id: currentEditedId,
                formData
            }))
            .then((data) => {
                console.log(data, "edit");
    
                if(data?.payload?.success) {
                    dispatch(fetchAllProducts());
                    setFormData(initialFormData);
                    setopenCreateProductsDialog(false);
                    setCurrentEditedId(null);
                } else {
                    console.error("Edit failed:", data);
                }
            })
            .catch((err) => {
                console.error("Error editing product:", err);
            });
        } else {
            // Adding a new product
            dispatch(addNewProduct({
                ...formData,
                image: uploadedImageUrl,
            }))
            .then((data) => {
                console.log(data, "add");
    
                if (data?.payload?.success) {
                    dispatch(fetchAllProducts());
                    setopenCreateProductsDialog(false);
                    setimageFile(null);
                    setFormData(initialFormData);
                    toast({
                        title: 'Product added successfully'
                    });
                } else {
                    console.error("Add failed:", data);
                }
            })
            .catch((err) => {
                console.error("Error adding product:", err);
            });
        }
    }
    function handleDelete(getCurrentProductId){
        console.log(getCurrentProductId);
        dispatch(deleteProduct(getCurrentProductId)).then((data)=>{
            if(data?.payload?.success){
                dispatch(fetchAllProducts());
            }
        })
    }
    function isFormValid(){
        return Object.keys(formData)
        .map(key=>formData[key]!=='')
        .every(item=>item)
    }

    useEffect(()=>{
        dispatch(fetchAllProducts())
    },[dispatch])

        console.log(productList,"productList");
    console.log(formData,"formData");

    return (
       <Fragment>
        <div className='mb-5 flex justify-end w-full'>
            <Button onClick={()=>setopenCreateProductsDialog(true)} className="bg-black text-white hover:text-black">Add New Product</Button>
        </div>
        <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
  {productList && productList.length > 0 
    ? productList.map((productItem) => (
        <AdminProductTile 
          key={productItem._id} // Use _id as the unique key
          product={productItem} 
          setCurrentEditedId={setCurrentEditedId}
          setopenCreateProductsDialog={setopenCreateProductsDialog}
          setFormData={setFormData}
          handleDelete={handleDelete}
        />
      )) 
    : null}
</div>


       <Sheet open={openCreateProductsDialog} 
       onOpenChange={()=>{
        setopenCreateProducts(false);
        setCurrentEditedId(null);
        setFormData(initialFormData);
    }}>
       <SheetContent side="right" className="overflow-auto bg-white">
        <SheetHeader>
            <SheetTitle>
                {
                    currentEditedId !== null ? 
                    'Edit Product' : 'Add New Product'
                }
            </SheetTitle>
        </SheetHeader>
        <ProductImageUpload 
        imageFile={imageFile} 
        setimageFile={setimageFile} 
        uploadedImageUrl={uploadedImageUrl} 
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        currentEditedId={currentEditedId!==null}
        />
        <div className='py-6'>
            <CommonForm 
            onSubmit={onSubmit} 
            formData={formData} 
            setFormData={setFormData} 
            buttonText={currentEditedId !== null ? "Edit" : "Add" }
            formControls={addProductFormElements}
            isBtnDisabled={!isFormValid()}
            />
        </div>
       </SheetContent>
       </Sheet>
       </Fragment>
    )
}

export default AdminProducts
