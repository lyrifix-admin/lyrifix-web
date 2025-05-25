import React, { useState, useRef } from "react";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";

interface SingleFileUploaderProps {
  value: string;
  onChange: (url: string) => void;
}

export default function SingleFileUploader({
  value,
  onChange,
}: SingleFileUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setUploading(true);

      // Upload to Uploadcare
      const formData = new FormData();
      formData.append("UPLOADCARE_STORE", "1");
      formData.append(
        "UPLOADCARE_PUB_KEY",
        import.meta.env.VITE_UPLOADCARE_PUBLIC_KEY,
      );
      formData.append("file", selectedFile);

      const response = await fetch("https://upload.uploadcare.com/base/", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data && data.file) {
        // Compose the CDN URL
        const cdnUrl = `https://ucarecdn.com/${data.file}/`;
        onChange(cdnUrl);
      }
      setUploading(false);
    } else {
      setFile(null);
    }
  };

  return (
    <>
      <div className="background-gray-100 mb-4 flex flex-col rounded p-4">
        <input
          id="file"
          type="file"
          ref={inputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
        />
        <label
          htmlFor="file"
          className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-zinc-800 transition hover:bg-zinc-700"
          onClick={() => inputRef.current?.click()}
        >
          <Plus className="h-10 w-10 text-white" />
        </label>

        {uploading && (
          <span className="mt-2 text-xs text-zinc-400">Uploading...</span>
        )}
      </div>
    </>
  );
}
