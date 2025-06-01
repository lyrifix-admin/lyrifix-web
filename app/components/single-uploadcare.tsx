import { FileUploaderRegular } from "@uploadcare/react-uploader";
import type { OutputFileEntry } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";

interface SingleFileUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  publicKey: string;
  ctxName?: string;
}

export function SingleFileUploader({
  publicKey,
  value,
  onChange,
  ctxName,
}: SingleFileUploaderProps) {
  const handleChange = (data: { allEntries: OutputFileEntry[] }) => {
    const file = data.allEntries.find((f) => f.status === "success");
    if (file && file.cdnUrl) {
      onChange(file.cdnUrl);
    }
  };

  return (
    <>
      <div className="mb-4 flex flex-col items-center">
        <FileUploaderRegular
          ctxName={ctxName || "single-file-uploader"}
          classNameUploader="uc-dark"
          className="fileUploaderWrapper"
          pubkey={publicKey}
          multiple={false}
          imgOnly
          onChange={handleChange}
        />
        {value && (
          <img
            src={value}
            alt="Preview"
            className="mt-4 max-h-40 rounded shadow"
          />
        )}
      </div>
    </>
  );
}
