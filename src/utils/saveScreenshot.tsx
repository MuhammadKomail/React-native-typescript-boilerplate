import { View, PermissionsAndroid, Platform, Alert } from "react-native";
import { makeImageFromView, SkImage, ImageFormat } from "@shopify/react-native-skia";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";

interface SaveScreenshotOptions {
  ref: React.RefObject<View>;
  onSuccess?: (snapshot: SkImage) => void;
  onError?: (error: Error) => void;
}

/**
 * Captures a screenshot of a view and saves it to the gallery using CameraRoll.
 * @param options - Configuration object with view ref and optional callbacks
 * @returns Promise<void>
 */
export const saveScreenshotToGallery = async ({
  ref,
  onSuccess,
  onError,
}: SaveScreenshotOptions): Promise<void> => {
  try {
    // Check if ref is valid
    if (!ref.current) {
      throw new Error("View reference is not available");
    }

    // Request storage permission for Android API < 30
    if (Platform.OS === "android" && Platform.Version < 30) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Storage Permission Required",
          message: "App needs access to your storage to save the screenshot",
          buttonPositive: "OK",
        }
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        throw new Error("Storage permission denied");
      }
    }

    // Capture the view as an SkImage
    const snapshot = await makeImageFromView(ref);
    if (!snapshot) {
      throw new Error("Failed to capture the view");
    }

    // Convert SkImage to base64
    const format: ImageFormat = ImageFormat.PNG;
    const quality = 100;
    const dataUri = snapshot.encodeToBase64(format, quality);
    if (!dataUri) {
      throw new Error("Failed to encode image to base64");
    }
    const base64Data = `data:image/png;base64,${dataUri}`;

    // Save to CameraRoll with error handling
    try {
      await CameraRoll.save(base64Data, {
        type: "photo",
        album: "Screenshots",
      });
    } catch (cameraRollError) {
      if (cameraRollError instanceof Error) {
        throw new Error(`CameraRoll save failed: ${cameraRollError.message}`);
      } else {
        throw new Error("CameraRoll save failed: Unknown error");
      }
    }

    // Call success callback
    onSuccess?.(snapshot);
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Unknown error";
    if (onError) {
      onError(new Error(errorMsg));
    } else {
      console.error("Failed to save screenshot:", error);
      Alert.alert("Error", `Failed to save screenshot: ${errorMsg}`);
    }
  }
};