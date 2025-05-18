
"use client"
import InputImage from "../components/InputImage";
import ColorGradingFilter  from "@/backend/filters/ColorGradingFilter";
import { NextResponse } from 'next/server';
import { useState,useRef } from 'react'


export default function Home() {
  const [image, setImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);

  
  const processImage = async (image) => {
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

      setImage(processedUrl);
    }catch(error){
      console.error("Error processing image:", error);
    }
    finally{
      setIsProcessing(false);
    }
  };
  

  

  return (
      <main >
        <div className="flex flex-col items-center mt-20 min-h-screen bg-black ">
         <h1 className="font-bold text-4xl mb-5">KoolPix</h1>
         <InputImage image={image} setImage={setImage} applyFilter={processImage} processedImage={processedImage} />
          
        </div>
        
        
         
      </main>
      
    
  );
}
