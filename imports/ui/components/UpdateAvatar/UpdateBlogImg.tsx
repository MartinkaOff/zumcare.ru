import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Row, Image, Modal } from "react-bootstrap";
import AvatarEditor from "react-avatar-editor";
import imageCompression from "browser-image-compression";
import { Blog } from "../../../helpers/types";

import Swal from "sweetalert2";

export function UpdateBlogImg({ _id, title, photo }: Blog) {
  const [open, setOpen] = useState(false);
  const [newPhoto, setNewPhoto] = useState<File | string | null>();
  const [editor, setEditor] = useState<AvatarEditor>();
  const fileRef = useRef<any>();

  useEffect(() => {
    setNewPhoto(photo);
    return () => {
      setNewPhoto(null);
    };
  }, [photo]);

  const handleNewImage = async (e: any) => {
    const image = e.target.files[0];
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
    };
    try {
      const compressedFile = await imageCompression(image, options);
      const blobToFile = new File(
        [compressedFile],
        "compressed/" + fileRef?.current?.files[0].name,
        {
          type: "image",
        }
      );

      setNewPhoto(blobToFile);
    } catch (error) {
      console.log(error);
    }
  };

  const savePhoto = async () => {
    const img = editor?.getImageScaledToCanvas().toDataURL();
    const blogData = {
      title,
      _id,
      photo: img,
    };
    if (img) {
      Meteor.call("blogs.updatePhoto", blogData, (err: object) => {
        if (err) console.log(err);
        Swal.fire({
          title: "Success!",
          text: "Your photo was saved!",
          icon: "success",
          confirmButtonText: "Cool",
        });
      });
      setOpen(false);
    }
  };

  const setEditorRef = (editor: AvatarEditor) => setEditor(editor);

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <Image
          className="responsive"
          rounded
          style={{ width: 400, height: 270, cursor: "pointer" }}
          src={
            photo ||
            "https://react.semantic-ui.com/images/wireframe/white-image.png"
          }
          onClick={() => setOpen(true)}
        />
      </div>
      <Modal
        onHide={() => setOpen(false)}
        show={open}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>Blog Photo</Modal.Header>
        <Modal.Body>
          <Container>
            <Row style={{ justifyContent: "center" }}>
              <AvatarEditor
                ref={setEditorRef}
                image={
                  newPhoto ||
                  "https://react.semantic-ui.com/images/wireframe/white-image.png"
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
          <input hidden type="file" ref={fileRef} onChange={handleNewImage} />

          <Button
            variant="success"
            disabled={!fileRef?.current?.files[0]}
            onClick={savePhoto}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
