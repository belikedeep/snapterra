import {
  generateUploadButton,
  generateUploadDropzone,
  generateReactHelpers,
} from "@uploadthing/react";

// Mocking the backend router type to prevent Vercel build from compiling the backend folder
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const UploadButton = generateUploadButton<any>();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const UploadDropzone = generateUploadDropzone<any>();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const { useUploadThing } = generateReactHelpers<any>();
