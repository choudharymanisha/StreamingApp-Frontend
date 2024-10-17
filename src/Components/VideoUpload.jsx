import React, { useState } from "react";
import videoLogo from "../assets/upload.png";
import { Button, Card, Label, TextInput } from "flowbite-react";

function VideoUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadFile, setUploadFile] = useState(false);
  const [message, setMessage] = useState("");

  function handleFileChange(event) {
    console.log(event.target.files[0]);
  }

  function handleForm(formEvent) {
    console.log("button clicked");
  }

  return (
    <>
      <div className="text-white">
        <Card className="flex flex-col items-center justify-center">
          <div className="">
            <h1>Upload Videos</h1>
            <form className = "space-y-5" onSubmit={handleForm}>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="file-upload" value="Upload file" />
                </div>
                <TextInput placeholder="Enter title"/>
              </div>
              <div className="flex items-center space-x-5 justify-center">
                <div className="shrink-0">
                  <img className="h-16 w-16 object-cover rounded-full" src={videoLogo} alt="Current profile photo" />
                </div>
                <label className="block">
                  <span className="sr-only">Choose profile photo</span>
                  <input onChange={handleFileChange} type="file" className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100" />
                </label>
              </div>
            </form>
            <div className="flex justify-center">
              <Button>Upload</Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}

export default VideoUpload;
