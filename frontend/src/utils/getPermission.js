import { PermissionsAndroid, ToastAndroid } from "react-native"

export const getPermissions = async () => {
    try {
        const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
          ]);

        return granted
    }
    catch (err) {
        ToastAndroid.show('Có lỗi xảy ra!', ToastAndroid.BOTTOM);
    }
}