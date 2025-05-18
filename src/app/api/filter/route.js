import { NextResponse } from 'next/server'; 
import sharp from 'sharp';
import ColorGradingFilter from '@/backend/filters/ColorGradingFilter';

export async function POST(request) {

    try{
       const formData = await request.formData();
       const imageFile = formData.get('image');

       if(!imageFile){
         return NextResponse.json({ error: 'No image file provided' }, { status: 400 });
       }

       const redFactor = parseFloat(formData.get("redFactor") || "1.2");
       const greenFactor = parseFloat(formData.get("greenFactor") || "1.0");
       const blueFactor = parseFloat(formData.get("blueFactor") || "0.8");

       const imageBuffer = Buffer.from(await imageFile.arrayBuffer());

         // Apply the color grading filter
         const processedBuffer = await ColorGradingFilter(
            { redFactor, greenFactor, blueFactor }, imageBuffer);

       return new NextResponse(processedBuffer,{
        headers: {
            'Content-Type': 'image/jpeg',
            "Cache-Control": "public, max-age-31536000, immutable",
          },
       });


    }catch(error){
        console.error('Error processing image:', error);
        return NextResponse.json({ error: 'Failed to process image' }, { status: 500 });
    }

}