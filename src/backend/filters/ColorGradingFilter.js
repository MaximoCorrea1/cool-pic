"use server"
const sharp = require('sharp');

export default async function ColorGradingFilter (options = {}, inputBuffer) {
    
     const redFactor = options.redFactor || 1.0;
     const greenFactor = options.greeenFactor || 1.0;
     const blueFactor = options.blueFactor || 1.0;
    

    //apply the filter to the image
   
       //get the image metada and raw pixel data
       const {data, info} = await sharp(inputBuffer).raw().toBuffer({resolveWithObject: true});

       //create a new buffer for the modified image
       const outputBuffer = Buffer.alloc(data.length);

       //process each pixel
       for(let i = 0; i<data.length; i+=info.channels){
        //get the RGB values  
        const r = data[i];
        const g = data[i+1];
        const b = data[i+2];

        //apply the color grading
        outputBuffer[i] = Math.min(255, Math.max(0, r*redFactor));
        outputBuffer[i+1] = Math.min(255, Math.max(0, g*greenFactor));
        outputBuffer[i+2] = Math.min(255, Math.max(0, b*blueFactor));
        //copy the alpha channel if it exists
        if(info.channels === 4){
            outputBuffer[i+3] = data[i+3];
        }
       }
         //create a new image with the modified pixel data
         return sharp(outputBuffer, {
            raw:{
                width: info.width,
                height: info.height,
                channels: info.channels
            }
         }).jpeg();
    
}
module.exports = ColorGradingFilter;