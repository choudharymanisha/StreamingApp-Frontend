import React from "react";
import videoLogo from "../assets/upload.png"
import { Button, Card } from "flowbite-react";

function VideoUpload(){
    return(
        <>
        <div className="text-white"> 
       <Card className="flex flex-col items-center justify-center">
        <div>
        <h1> Upload Videos</h1>
        <form class="flex items-center space-x-6">
  <div class="shrink-0">
    <img class="h-16 w-16 object-cover rounded-full" src={videoLogo} alt="Current profile photo" />
  </div>
  <label class="block">
    <span class="sr-only">Choose profile photo</span>
    <input type="file" class="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "/>
  </label>

</form>
<div className="flex justify-center">
    <Button> Upload</Button>
  </div>
</div>
       </Card>
        </div>
        
        </>
    )
   
}
export default VideoUpload
