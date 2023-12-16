import React, {useEffect, useRef, useState} from 'react';
import {Button, Container, Row, Image, Modal} from 'react-bootstrap';
import AvatarEditor from 'react-avatar-editor';
import imageCompression from 'browser-image-compression';
import {Photo} from '../../../helpers/types';
import Swal from 'sweetalert2';

export function UpdateAvatar({userId, name, surname, photo}: Photo) {
  const [open, setOpen] = useState(false);
  const [newAvatar, setNewAvatar] = useState<File | string | null>();
  const [editor, setEditor] = useState<AvatarEditor>();
  const fileRef = useRef<any>();

  useEffect(() => {
    setNewAvatar(photo);
    return () => {
      setNewAvatar(null);
    };
  }, [photo]);

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
        }
      );

      setNewAvatar(blobToFile);
    } catch (error) {
      console.log(error);
    }
  };

  const saveAvatar = async () => {
    const img = editor?.getImageScaledToCanvas().toDataURL();
    const userData = {
      name,
      surname,
      userId,
      photo: img,
    };
    if (img) {
      Meteor.call('photos.insert', userData, (err: object) => {
        if (err) console.log(err);
        Swal.fire({
          title: 'Success!',
          text: 'Your photo was saved!',
          icon: 'success',
          confirmButtonText: 'Cool',
        });
      });
      setOpen(false);
    }
  };

  const setEditorRef = (editor: AvatarEditor) => setEditor(editor);

  return (
    <div>
      <div style={{textAlign: 'center'}}>
        <Image
          className='responsive'
          rounded
          style={{/* width: 300, height: 300,  */cursor: 'pointer'}}
          src={
            photo ||
            'https://react.semantic-ui.com/images/wireframe/white-image.png'
          }
          onClick={() => setOpen(true)}
        />
      </div>
      <Modal
        onHide={() => setOpen(false)}
        show={open}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>Specialist Profile Photo</Modal.Header>
        <Modal.Body>
          <Container>
            <Row style={{justifyContent: 'center'}}>
              <AvatarEditor
                ref={setEditorRef}
                image={
                  newAvatar ||
                  'https://react.semantic-ui.com/images/wireframe/white-image.png'
                }
                width={300}
                height={300}
                border={50}
                color={[255, 255, 255, 0.6]} // RGBA
                scale={1}
                rotate={0}
              />
            </Row>
          </Container>
        </Modal.Body>

        <Modal.Footer>
          {/* <Button variant='danger' onClick={() => setOpen(false)}>
            Remove
          </Button> */}
          <Button onClick={() => fileRef?.current.click()}>Upload</Button>
          <input hidden type='file' ref={fileRef} onChange={handleNewImage} />

          <Button
            variant='success'
            disabled={!fileRef?.current?.files[0]}
            onClick={saveAvatar}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
