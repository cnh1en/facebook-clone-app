import * as ImagePicker from 'expo-image-picker';
import { app } from './env';
import * as FileSystem from 'expo-file-system';

const pickImage = async () => {
  try {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

const createFormData = (uri) => {
  const fileName = uri.split('/').pop();
  const fileType = fileName.split('.').pop();
  const formData = new FormData();
  formData.append('file', JSON.stringify({
    uri,
    name: fileName,
    type: `image/${fileType}`
  }));

  return formData;
}

const uploadAsyncFile = async (uri) => {
  try {
    const fileName = uri.split('/').pop();
    const uploadResult = await FileSystem.uploadAsync(app.api_url + 'action/upload', uri, {
      httpMethod: 'POST',
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      fieldName: fileName
    });
    return uploadResult
  } catch (error) {
    console.log("uploadAsyncFile error", error)
    return null
  }
}

export { pickImage, createFormData, uploadAsyncFile };
