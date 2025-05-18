
"use client"
import InputImage from "../components/InputImage";
import ColorGradingFilter  from "@/backend/filters/ColorGradingFilter";

import { useState,useRef } from 'react'


export default function Home() {
  const [image, setImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);

  
  const processImage = async () => {
    if (!image?.file) return;

    setIsProcessing(true);

    try{
      const formData = new FormData();

      formData.append('image', image.file);

      formData.append('redFactor', 0.1);
      formData.append('greenFactor', 2.2);
      formData.append('blueFactor', 2.1);

      const response = await fetch("/api/filter",{
        method: "POST",
        body: formData,
      });

      if(!response.ok){
        throw new Error("Failed to process image");
      }

      const processedBlob = await response.blob();
      const processedUrl = URL.createObjectURL(processedBlob);

      setProcessedImage(processedUrl);
    }catch(error){
      console.error("Error processing image:", error);
    }
    finally{
      setIsProcessing(false);
    }
  };
  

  

  return (
      <main >
        <div className="flex flex-col items-center justify-center min-h-screen bg-black">
         <h1 className="font-bold text-4xl mb-5">KoolPix</h1>
         <InputImage image={image} setImage={setImage} />
          {/* <button
            onClick={() => processImage()}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-4"
            disabled={!image} >Apply Filter</button> */}
        </div>
        
        
         
      </main>
      
    
  );
}
