"use client";

import { Grid } from "@mui/material";
import { Plus, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addDataToFirestore, addUpload, deleteFromToFirestore, setUploads } from "@/redux/actions";
import { toast } from "react-toastify";
import { z } from "zod";
import { useForm } from "react-hook-form";


interface Upload {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface Props {
  onSave?: (data: any) => void;
  upload?: Upload;
  onDelete?: (id: string) => void;
}

const ImageUploadComponent: React.FC<Props> = ({ onSave, upload, onDelete }) => {
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState<string>(upload?.title || "");
  const [description, setDescription] = useState<string>(upload?.description || "");
  const [previewUrl, setPreviewUrl] = useState<string | null>(upload?.image || null);

  const dispatch = useDispatch();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  const handleRemoveImage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setImage(null);
    setPreviewUrl(null);
  };

  const handleSave = async () => {
    if (!image || !title || !description) {
      toast.error("All fields are required");
      console.log("All fields are required");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;
      const imageData = {
        title: title,
        description: description,
        image: base64Image,
      };

      console.log("Data to be saved:", imageData);

      try {
        await dispatch(addDataToFirestore(imageData) as any);
        toast.success("Upload saved successfully");
        setTitle("");
        setDescription("");
        setImage(null);
        setPreviewUrl(null);

        if (onSave) {
          onSave(imageData);
        }
      } catch (error) {
        toast.error("Upload could not be saved");
        console.error("Error in saving data:", error);
      }
    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };
    reader.readAsDataURL(image);
  };

  const handleDelete = async () => {
    if (upload?.id) {
      dispatch(deleteFromToFirestore(upload.id) as any)
        .then(() => {
          toast.error("Upload deleted successfully");
          console.log(`Upload with id ${upload.id} deleted.`);
          if (onDelete) {
            onDelete(upload.id);
          }
        })
        .catch((error: any) => {
          toast.error("Upload could not be deleted");
          console.error("Error in deleting data:", error);
        });
    }
  };

  return (
    <Grid
      item
      xs={12}
      sm={12}
      container
      spacing={2}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
    >
      <Card className="relative flex items-center justify-center flex-col mt-10 p-2 rounded-xl w-[350px] border border-black">
        <Input
          value={title}
          type="text"
          placeholder="New Title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className="w-full h-12 mb-4 text-sm font-semibold border-none rounded-xl placeholder:text-[#b97256] placeholder:text-base text-[#b97256] capitalize"
        />
        <Input
          value={description}
          type="text"
          multiline
          placeholder="New Description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          className="w-full h-24 mb-4 text-sm font-semibold border-none rounded-xl placeholder:text-[#666666]  text-[#666666] capitalize"
        />
        <Label className="w-full h-48 flex flex-col items-center justify-center bg-[#dcb8aa] cursor-pointer relative">
          {previewUrl && <Image src={previewUrl} alt="Preview" fill />}
          {!upload && (
            <>
              <div className="flex flex-col items-center justify-center">
                <Plus className="w-12 h-12" />
                <span className="text-center mt-1">GÖRSEL</span>
              </div>
              <Input
                type="file"
                onChange={handleImageChange}
                className="w-full h-full opacity-0 absolute"
                style={{ top: 0, left: 0, width: "100%", height: "100%", zIndex: 10 }}
              />
            </>
          )}
          {previewUrl && !upload && (
            <div className="absolute top-2 right-2" style={{ zIndex: 20 }}>
              <Button onClick={handleRemoveImage} className="bg-rose-500 text-white p-3 rounded-full shadow-sm" type="button">
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </Label>
        {!upload ? (
          <Button size={"sm"} className="text-white font-bold rounded mt-2 self-end" onClick={handleSave}>
            Kaydet
          </Button>
        ) : (
          <Button size={"sm"} className="text-white font-bold rounded mt-2 self-end" onClick={handleDelete}>
            Sil
          </Button>
        )}
      </Card>
    </Grid>
  );
};

export default ImageUploadComponent;