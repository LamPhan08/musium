import { mongoAPI } from "../axios/axios";

export const getExploreData = async () => {
    try {
        const response = await mongoAPI.get('/explore');

        return response.data;
    }
    catch (err) {
        console.log(err)
    }
}