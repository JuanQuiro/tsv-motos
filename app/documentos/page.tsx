'use client'
import { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";


const Formulario = () => {
  const [resource, setResource] = useState('') as any
  const [Uploads, setUploads] = useState(1);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
    <div className='grid place-content-around grid-cols-3 gap-5 pt-60'>
  <div className='col-span-3 mx-auto'>
    <h3 className='font-medium text-xl my-3'>Antes de Finalizar</h3>
    <p>Se necesitará los documentos de <strong>Cédula de Identidad</strong> , <strong>RIF</strong> , <strong>Capture de dashboard de Yummy</strong> y <strong>una foto del Solicitante con la cedula en mano</strong></p>
  </div>
  <div className='mx-auto col-span-3'>
    <CldUploadWidget
      uploadPreset="p15cdzof"
      options={{
        sources: ['local'],
        multiple: true,
        maxFiles: 4
      }}
      onSuccess={(result, { widget }) => {
        setResource(result?.info);
        console.log(result, widget);
      }}
    >
      {({ open }) => {
        function handleOnClick() {
          setResource(undefined);
          open();
        }
        return (
          <button className="btn btn-success bg-blue-700 hover:bg-black text-gray-50" onClick={handleOnClick}>
            Subir Documentos
          </button>
        );
      }}
    </CldUploadWidget>
  </div>
  <div className='grid col-span-3 mx-auto'>
    <Button onPress={onOpen}>Tutorial</Button>
  </div>
</div>
<Modal size='5xl' isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Tutorial Subida Documentos</ModalHeader>
              <ModalBody>
              <video controls src={"/10.mp4"} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
</>
  );
};

export default Formulario;
