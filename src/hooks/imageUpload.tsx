import axiosInstance from '@src/api/axiosClient';
import axios from 'axios';

export const useUploadImage = (endpoint:string) => {
  return async (file:any) => {
    const formData = new FormData();
    // Append the single file to formData
    formData.append('file', {
      uri: file,
      type: 'image/jpeg', // or match the file type dynamically
      name: 'image.jpg',
    });

    try {
      const response = await axiosInstance.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Return the uploaded file URL (or other response data)
      return response.data.data;
    } catch (error) {
      console.error("Image upload failed", error);
      throw error;
    }
  };
};
