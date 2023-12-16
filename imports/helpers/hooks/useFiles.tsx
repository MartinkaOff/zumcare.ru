import { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Files } from '../../api/files/Files';
import { File } from '../types/types';

export const useFiles = (): File[] => {
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    const subscription = Meteor.subscribe('files');
    if (subscription.ready()) {
      const filesData = Files.find().fetch() as File[];
      setFiles(filesData);
    }

    return () => subscription.stop();
  }, []);

  return files;
};
