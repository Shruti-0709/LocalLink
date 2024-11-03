import React, { useEffect, useRef } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { UploadCloudIcon, FileIcon, XIcon } from 'lucide-react';
import { Button } from '../ui/button';
import axios from 'axios';
import { Skeleton } from '../ui/skeleton';


function ProductImageUpload({ 
    imageFile, 
    setimageFile, 
    uploadedImageUrl, 
    setUploadedImageUrl,
    imageLoadingState,
    setImageLoadingState,
    isEditMode,
}) {
    const inputRef = useRef(null);

    function handleImageFileChange(event) {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) setimageFile(selectedFile);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDrop(event) {
        event.preventDefault(); 
        const droppedFile = event.dataTransfer.files?.[0];
        if (droppedFile) setimageFile(droppedFile);
    }

    function handleRemoveImage() {
        setimageFile(null);
        if (inputRef.current) {
            inputRef.current.value = '';  // Reset input
        }
    }
    console.log(imageFile);

    // async function uploadImageToCloudinary() {
    //     const data = new FormData();
    //     data.append('my_file',imageFile);
    //     const response=await axios.post('http://localhost:5000/api/admin',data);
    //     console.log(response,'response');
    //     if(response?.data?.success) setUploadedImageUrl(response.data.result.url);
    // }

    // useEffect(()=>{
    //     if(imageFile!==null) uploadImageToCloudinary();
    // },[imageFile])

    async function uploadImageToCloudinary(){
        setImageLoadingState(true);
        const data=new FormData();
        data.append('my_file',imageFile);
        const response=await axios.post('http://localhost:5000/api/admin/products/upload-image',data); 
        console.log(response,'response');
        if(response?.data?.success){
             setUploadedImageUrl(response.data.result.url);
             setImageLoadingState(false);
       }
}
    useEffect(()=>{
        if(imageFile!==null) uploadImageToCloudinary()
    },[imageFile])
    return (
        <div className='w-full max-w-md mx-auto mt-4'>
            <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
            <div 
                onDragOver={handleDragOver} 
                onDrop={handleDrop} 
                className={`${isEditMode?"opacity-60":""}border-2 border-dashed rounded-lg p-4`}
            >
                {/* Hidden input field */}
                <Input
                    id="image-upload"
                    type="file"
                    ref={inputRef}
                    onChange={handleImageFileChange}
                    style={{ display: 'none' }}  // Hide the default file input
                    disabled={isEditMode}
                />

                {!imageFile ? (
                    // Placeholder when no file is selected
                    <Label
                        htmlFor="image-upload"
                        className={`${isEditMode ? "cursor-not-allowed":""} flex flex-col items-center justify-center h-32 cursor-pointer`}
                        onClick={() => inputRef.current.click()} // Trigger file input on click
                    >
                        <UploadCloudIcon className='w-10 h-10 text-muted-foreground mb-2'/>
                        <span>Drag & Drop or Click to Upload</span>
                    </Label>
                ) : (
                    // Show selected file details
                    imageLoadingState ?
                     <Skeleton className='h-10 bg-gray-100'/> :
                    <div className='flex items-center justify-between'>
                        <div className="flex item-center">
                            <FileIcon className="w-8 text-primary mr-2 h-8"/>
                        </div>
                        <p className='text-sm font-md'>{imageFile.name}</p>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-foreground"
                            onClick={handleRemoveImage}
                        >
                            <XIcon className="w-4 h-4"/>
                            <span className='sr-only'>Remove File</span>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductImageUpload;
