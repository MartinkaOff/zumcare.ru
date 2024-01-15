import React, { useEffect, useRef, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import Swal from 'sweetalert2';
import imageCompression from 'browser-image-compression';
import { useTranslation } from 'react-i18next';
import { Certificate, Specialist } from '../../../../helpers/types';

type Props = {
  specialist: Specialist;
  onHide(): void;
  certificate?: Certificate;
};

export function CertificateUploadContent({
  specialist,
  onHide,
  certificate,
}: Props) {
  const [newImage, setNewImage] = useState<string | null>();
  const fileRef = useRef<any>();

  const { t } = useTranslation();

  useEffect(() => {
    setNewImage(certificate?.certificateUrl);
    return () => {
      setNewImage(null);
    };
  }, [certificate]);

  const getBase64 = async (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      // @ts-ignore
      setNewImage(reader?.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  };

  const handleNewImage = async (e: any) => {
    // if (e.target.files[0].size > 6 * 1024 * 1024) {
    //   alert('No greater than 6 MB!);
    //   return;
    // }

    const image = e.target.files[0];
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
    };
    try {
      const compressedFile = await imageCompression(image, options);
      const blobToFile = new File(
        [compressedFile],
        'compressed/' + fileRef?.current?.files[0].name,
        {
          type: 'image',
        },
      );
      await getBase64(blobToFile);
    } catch (error) {
      console.log(error);
    }
  };

  const saveImage = async () => {
    const userData = {
      _id: certificate?._id,
      specialistUserId: specialist.userId,
      certificateUrl: newImage,
    };

    if (newImage) {
      Meteor.call('certificates.insert', userData, (err: object) => {
        if (err) console.log(err);
        Swal.fire({
          title: 'Success!',
          text: 'Certificate data was saved!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      });

      setNewImage(null);
      onHide();
    }
  };

  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <Image
          className='responsive'
          rounded
          style={{ /* width: 300, height: 300,  */ cursor: 'pointer' }}
          src={
            newImage ||
            'https://react.semantic-ui.com/images/wireframe/white-image.png'
          }
        />
      </div>
      <br />
      <div>
        <Button className='btn-btn-main' onClick={() => fileRef?.current.click()}>{t("download")}</Button>
        <input hidden type='file' ref={fileRef} onChange={handleNewImage} />
        <Button
          variant='success'
          disabled={!fileRef?.current?.files[0]}
          onClick={saveImage}
          className='btn-btn-main'
        >
          {t("save")}
        </Button>
      </div>
    </div>
  );
}
