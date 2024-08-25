"use client";
import React from "react";

import { UploadDropzone } from "@/utils/uploadthing";
import { uploadRouter } from "@/app/api/uploadthing/core";
import { useToast } from "@chakra-ui/react";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endPoint: keyof typeof uploadRouter;
}
export default function FileUpload({ endPoint, onChange }: FileUploadProps) {
  const toast = useToast();
  return (
    <UploadDropzone
      endpoint={endPoint}
      onClientUploadComplete={(res) => {
        onChange(res[0].url);
      }}
      onUploadError={(err) => {
        toast({
          title: "Could not upload the document",
          status: "error",
          isClosable: true,
          duration: 3000,
          description: `${err?.message}`,
        });
      }}
    />
  );
}
