"use client";

import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import ImageUploadComponent from "@/components/upload-file";

function HomePage() {
  const [uploads, setUploads] = useState<any[]>([]);

  const addUpload = (newUpload: any) => {
    const newUploadWithId = { ...newUpload, id: uuidv4() };
    setUploads((prevUploads) => {
      const updatedUploads = [...prevUploads, newUploadWithId];
      localStorage.setItem("uploads", JSON.stringify(updatedUploads));
      return updatedUploads;
    });
  };

  const removeUpload = (id: string) => {
    setUploads((prevUploads) => {
      const updatedUploads = prevUploads.filter((upload) => upload.id !== id);
      localStorage.setItem("uploads", JSON.stringify(updatedUploads));
      return updatedUploads;
    });
  };

  useEffect(() => {
    const savedUploads = localStorage.getItem("uploads");
    if (savedUploads) {
      setUploads(JSON.parse(savedUploads));
    }
  }, []);

  return (
    <Grid container justifyContent="center" spacing={2}>
      <ImageUploadComponent onSave={addUpload} />
      {uploads.map((upload) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={upload.id}>
          <ImageUploadComponent key={upload.id} upload={upload} onDelete={removeUpload} />
        </Grid>
      ))}
    </Grid>
  );
}

export default HomePage;
