import {Platform} from 'react-native';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import {v4 as uuidv4} from 'uuid';
import Config from 'react-native-config';

// Initialize S3 client using environment variables
const s3Client = new S3Client({
  region: Config.AWS_REGION,
  credentials: {
    accessKeyId: Config.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: Config.AWS_SECRET_ACCESS_KEY || '',
  },
});

const bucketName = Config.AWS_BUCKET_NAME || '';

/**
 * Upload a file to AWS S3
 * @param uri - Local file URI
 * @param fileType - MIME type of the file
 * @param folder - Optional folder path in the bucket
 * @returns Promise with the URL of the uploaded file
 */
export const uploadToS3 = async (
  uri: string,
  fileType: string,
  folder: string = 'uploads',
): Promise<string> => {
  try {
    // Generate a unique file name
    const fileName = `${folder}/${uuidv4()}.${fileType.split('/')[1]}`;

    // For React Native, we need to handle file paths differently based on platform
    let fileUri = uri;
    if (Platform.OS === 'ios' && uri.startsWith('file://')) {
      fileUri = uri.substring(7);
    }

    // Read the file
    const response = await fetch(fileUri);
    const blob = await response.blob();

    // Upload to S3
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: blob,
      ContentType: fileType,
    });

    await s3Client.send(command);

    // Return the public URL
    return `https://${bucketName}.s3.${Config.AWS_REGION}.amazonaws.com/${fileName}`;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete a file from AWS S3
 * @param fileUrl - Full URL of the file to delete
 * @returns Promise indicating success
 */
export const deleteFromS3 = async (fileUrl: string): Promise<boolean> => {
  try {
    // Extract the key from the URL
    const urlParts = fileUrl.split(
      `https://${bucketName}.s3.${Config.AWS_REGION}.amazonaws.com/`,
    );
    if (urlParts.length !== 2) {
      throw new Error('Invalid S3 URL format');
    }

    const key = urlParts[1];

    // Delete from S3
    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    await s3Client.send(command);
    return true;
  } catch (error) {
    throw error;
  }
};
