// import React, { useState } from 'react';
// import { Meteor } from 'meteor/meteor';
// import { useFiles } from '../../../helpers/hooks/useFiles';

// export const UploadFile = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const files = useFiles();

//   const handleFileChange = (event) => {
//     const file = event.target.files && event.target.files[0];
//     if (file) {
//       setSelectedFile({
//         name: file.name,
//         type: file.type,
//         data: new Uint8Array(),
//       });
//     }
//   };

//   const handleFileUpload = () => {
//     if (!selectedFile) {
//       return;
//     }

//     const reader = new FileReader();
//     reader.onload = (event) => {
//       const fileData = {
//         name: selectedFile.name,
//         type: selectedFile.type,
//         data: new Uint8Array(event.target?.result),
//       };

//       Meteor.call('files.upload', fileData, (error, fileId) => {
//         if (error) {
//           console.error('File upload error:', error);
//         } else {
//           console.log('File uploaded successfully. File ID:', fileId);
//         }
//       });
//     };

//     reader.readAsArrayBuffer(selectedFile.data);
//   };

//   const handleFileRemove = (fileId) => {
//     Meteor.call('files.remove', fileId, (error) => {
//       if (error) {
//         console.error('File remove error:', error);
//       } else {
//         console.log('File removed successfully. File ID:', fileId);
//       }
//     });
//   };

//   return (
//     <div>
//       <input type='file' onChange={handleFileChange} />
//       <button onClick={handleFileUpload}>Upload</button>
//       <div>
//         {files.map((file) => (
//           <div key={file._id}>
//             <img src={file.url} alt={file.name} width={100} height={100} />
//             <button onClick={() => handleFileRemove(file._id)}>Remove</button>
//           </div>
//         ))}
//       </div>
//       {selectedFile && (
//         <div>
//           <img
//             src={URL.createObjectURL(
//               new Blob([selectedFile.data], { type: selectedFile.type }),
//             )}
//             alt={selectedFile.name}
//             width={100}
//             height={100}
//           />
//         </div>
//       )}
//     </div>
//   );
// };
