import React, { useState } from "react";
import videoLogo from "../assets/upload.png";
import { Alert, Button, Card, Label, Progress, TextInput, Textarea } from "flowbite-react";
import axios from "axios";
import toast from "react-hot-toast";

function VideoUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);  // Define uploading state
  const [meta, setMeta] = useState({
    title: "",
    description: "",
  });
  const [message, setMessage] = useState("");

  function handleFileChange(event) {
    setSelectedFile(event.target.files[0]);
  }

  function formFieldChange(event) {
    setMeta({
      ...meta,
      [event.target.name]: event.target.value,
    });
  }

  function handleForm(formEvent) {
    formEvent.preventDefault();
    if (!selectedFile) {
      alert("Select a file, please");
      return;
    }
    saveVideoToServer(selectedFile, meta);
  }
  function resetForm(){
    setMeta({
      title:"",
      description:"",
    })
    setSelectedFile(null);
    setUploading(false);
  }

  async function saveVideoToServer(video, videoMetaData) {
    setUploading(true);
    try {
      let formData = new FormData();
      formData.append("title", videoMetaData.title);
      formData.append("description", videoMetaData.description);
      formData.append("file", video);

      let response = await axios.post(`http://localhost:8080/api/v1/videos`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(progress);
        },
      });
      setProgress(0);

      setMessage("File uploaded successfully!");
      setUploading(false);
      toast.success("File uploaded successfully");
      resetForm();
    } catch (error) {
      console.log("Error in uploading:", error);
      setUploading(false);
      toast.error("Error in file uploading");
    }
  }

  return (
    <div className="text-white">
      <Card className="flex flex-col items-center justify-center">
        <div className="flex flex-col space-y-6">
          <h1>Upload Videos</h1>
          <form noValidate className="space-y-5" onSubmit={handleForm}>
            <div>
              <Label htmlFor="file-upload" value="Upload file" />
              <TextInput  value = {meta.title}onChange={formFieldChange} name="title" placeholder="Enter title" />
            </div>
            <div className="max-w-md">
              <Label htmlFor="comment" value="Video description" />
              <Textarea
              value = {meta.description}
                onChange={formFieldChange}
                name="description"
                id="comment"
                placeholder="Write video description... here "
                required
                rows={4}
              />
            </div>
            <div className="flex items-center space-x-5 justify-center">
              <img className="h-16 w-16 object-cover rounded-full" src={videoLogo} alt="Upload" />
              <input
                name="file"
                onChange={handleFileChange}
                type="file"
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
              />
            </div>
            <Progress
              hidden={!uploading}
              progress={progress}
              textLabel="Uploading"
              size="lg"
            />
            {message && (
              <Alert color={"success"}
              rounded 
              withBorderAccent
              onDismiss={() => {
                setMessage("")
              }}


              >
                <span className="font-medium">{message}</span>
              </Alert>
            )}
            <div className="flex justify-center">
              <Button disabled = {uploading} type="submit">Submit</Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}

export default VideoUpload;
