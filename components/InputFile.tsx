import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dispatch, SetStateAction } from "react";
import { toast } from 'sonner'; 

interface Props {
  setPackageJsonContent: Dispatch<SetStateAction<string>>;
}

export function InputFile({setPackageJsonContent}:Props) {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    const file = event.target.files?.[0];

    if (file) {
      if (file.name !== 'package.json') {
        toast.error('Only package.json files are allowed'); 
        setPackageJsonContent('');
        return;
      }
      fileReader.onload = (e) => {
        const content = e.target?.result;
        if (typeof content === 'string') {
          setPackageJsonContent(content);
          toast.success('package.json file uploaded successfully'); 
        }
      };
      fileReader.readAsText(file);
    }
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="file-upload">
          Upload your package.json:
      </Label>
      <Input id="file-upload" type="file" 
      accept=".json" onChange={handleFileUpload}  
      className="cursor-pointer"
      />
    </div>
  )
}