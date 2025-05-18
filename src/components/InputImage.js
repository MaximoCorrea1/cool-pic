'use client'
 
import { useRef } from "react";
import Image from "next/image";

export default function InputImage({image, setImage, applyFilter, processedImage}) {
   const fileInputRef = useRef(null);

   const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);

      setImage({
        url: imageUrl,
        file: file,
      })
    }
   };
   const handleButtonClick = () => {
    // Trigger the hidden file input
    fileInputRef.current.click();
  };
  
  return (
    <div className="flex flex-col items-center justify-center">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        ref={fileInputRef}
      />
      
      <button
        onClick={handleButtonClick}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Select Image
      </button>
      
      {image && (<>
        <div className="mt-4 max-w-fit max-h-fit relative">
          <img
            src={image.url}
            alt="Selected Image"
            className="max-w-md max-h-96 object-contain  "

            
          />
        </div>
        <button
            onClick={() => applyFilter(image)}
            className=" px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-4"
            disabled={!image} >Apply Filter</button> </>
      )}
    </div>
  );
}
