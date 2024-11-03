import React, { useState } from "react";
import videoLogo from "../assets/upload.png";
import { Button, Card, Label, TextInput,Textarea } from "flowbite-react";
import axios from "axios";

function VideoUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadFile, setUploadFile] = useState(false);
  const[meta,setMeta] = useState({
    title:"",
    description:"",
  });
  const [message, setMessage] = useState("");

  function handleFileChange(event) {
    console.log(event.target.files[0]);
  }
  function formFieldChange(event){
   
    setMeta({
        ...meta,
        [event.target.name]:event.target.value
    })
  }

  function handleForm(formEvent) {
    formEvent.preventDefault();
    if(!selectedFile){
      alert("Select file please");
      return;
    }
    saveVideoToServer(selectedFile,meta)
  }
  function VideoUpload(){
    async function saveVideoToServer(video,videoMetData){
      setUploading(true);

      try{
        let formData = new FormData();
        formData.append("title",videoMetData.title);
        formData.append("description", videoMetData.description);
        formData.append("file",selectedFile)
    



        let response = await axios.post(` http://localhost:8080/api/v1/videos` , formData,{
          headers:{
            "Content-Type":"multipart/form-data",

          },
          onUploadProgress:(progressEvent) =>{
            console.log(progressEvent);
          },
        });
        console.log(response)
        setMessage("File uploaded");
      }
      catch(error){
        console.log(error);

      }
    }
 
  }

  return (
    <>
      <div className="text-white">
        <Card className="flex flex-col items-center justify-center">
          <div className="flex flex-col space-y-6">
            <h1>Upload Videos</h1>
            <form  noValidate className = "space-y-5" onSubmit={handleForm}>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="file-upload" value="upload file" />
                </div>
                <TextInput onChange = {formFieldChange} name = "title" placeholder="Enter title"/>
              </div>
              <div className="max-w-md">
      <div className="mb-2 block">
        <Label htmlFor="comment" value="Video description" />
      </div>
      <Textarea onChange = {formFieldChange} name = "description " id="comment" placeholder="  Write video description...." required rows={4} />
    </div>
              <div className="flex items-center space-x-5 justify-center">
                <div className="shrink-0">
                  <img className="h-16 w-16 object-cover rounded-full" src={videoLogo} alt="Current profile photo" />
                </div>
                <label className="block">
                  <span className="sr-only">Choose profile photo</span>
                  <input name = "file" onChange={handleFileChange} type="file" className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100" />
                </label>
              </div>
              <div className="flex justify-center">
              <Button type = "submit">Submit</Button>
            </div>
            </form>
           
          </div>
        </Card>
      </div>
    </>
  );
}

export default VideoUpload;
