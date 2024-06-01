import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface UploadProfileImageProps {
    onImageChange: (base64String: string) => void;
  }

export default function UploadProfileImage({ onImageChange }: UploadProfileImageProps) {
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
      <input {...getInputProps()} />
      {
        image ? (
          <img src={image} alt="Uploaded" className='rounded-full border border-4 border-custom-medium-blue' style={{ width: '210px', height: '210px' }}/>
        ) : (
          (
            <img src='/assets/profileImagePlaceholder.png' alt="Placeholder" className='rounded-full'
            style={{ width: '210px', height: '210px' }}/>
          ) 
        )
      }
    </div>
  );
}


