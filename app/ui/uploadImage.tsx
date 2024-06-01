import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface UploadImageProps {
    onImageChange: (base64String: string) => void;
    placeholderImage?: string; 
  }

export default function UploadImage({ onImageChange, placeholderImage }: UploadImageProps) {
  const [image, setImage] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    // Aqui você pode realizar alguma validação, como verificar o tipo de arquivo, tamanho etc.
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;;
      setImage(base64String);
      onImageChange(base64String)
      // Aqui você pode enviar a imagem para o seu servidor ou fazer o que for necessário com ela.
    };
    reader.readAsDataURL(file);
  };
 

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} style={{ width: '400px', height: '450px' }}>
      <input {...getInputProps()}/>
      {
        image ? (
          <img src={image} alt="Uploaded"  />
        ) : (
          placeholderImage ? (
            <img src={placeholderImage} alt="Placeholder"/>
          ) : (
            <p>Arraste e solte uma imagem aqui, ou clique para selecionar uma imagem.</p>
          )
        )
      }
    </div>
  );
}


