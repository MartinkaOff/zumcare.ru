//@ts-ignore
import { FilesCollection } from 'meteor/ostrio:files';

export const Files = new FilesCollection({
  collectionName: 'files',
  storagePath: () => {
    return `${process.env.PWD}/design_uploads`;
  },
  onBeforeUpload(file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 10485760 && /png|jpg|jpeg|pdf/i.test(file.extension)) {
      return true;
    }
    return 'Следует загружать файл формата png, jpg, jpeg, pdf и не больше 10MB!';
  },
});
