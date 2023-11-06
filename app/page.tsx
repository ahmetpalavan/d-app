"use client";

import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import ImageUploadComponent from "@/components/upload-file";

function HomePage() {
  const [uploads, setUploads] = useState<any[]>([]);

  const addUpload = (newUpload: any) => {
    setUploads([...uploads, { ...newUpload, id: uuidv4() }]);
  };

  return (
    <Grid container justifyContent="center" spacing={2}>
      <ImageUploadComponent onSave={addUpload} />
      {uploads.map((upload) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={upload.id}>
          <ImageUploadComponent {...upload} />
        </Grid>
      ))}
    </Grid>
  );
}

export default HomePage;
