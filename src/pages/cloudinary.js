const Apart = () => {

    const handleFileUpload = async (event) => {
        const file = event.target.files[0]; // Get the first file
        if (!file) return;
      
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "GHS_Cloudinary");
        data.append("cloud_name", "dvh9j4utq");
        data.append("folder", "FIRST_FOLDER"); // Specify the folder name here
      
        try {
          const res = await fetch("https://api.cloudinary.com/v1_1/dvh9j4utq/image/upload", {
            method: 'POST',
            body: data
          });
      
          const uploadedImageURL = await res.json();
          console.log(uploadedImageURL.url);
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      };

  return (
    <div>
        <input
  type="file"
  className="file-input"
  onChange={handleFileUpload}
/>

    </div>
  );
}

export default Apart;