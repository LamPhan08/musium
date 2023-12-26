import { PermissionsAndroid, ToastAndroid } from "react-native"

export const getWriteExternalStoragePermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
        }

        return false;
    }
    catch (err) {
        ToastAndroid.show('Có lỗi xảy ra!', ToastAndroid.BOTTOM);
    }
}