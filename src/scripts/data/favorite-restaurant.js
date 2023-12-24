import { openDB } from "idb";
import CONFIG from "../globals/config";

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
    upgrade(database){
        database.createObjectStore(OBJECT_STORE_NAME, {keyPath: 'id'});
    },
});

//membuat fungsi asynchronous untuk get, add, put, delete favo restaurant
const FavoriteRestaurant = {
    async getRestaurant(id){
        return (await dbPromise).get(OBJECT_STORE_NAME,id);
    },
    async getAllRestaurant(){
        return (await dbPromise).getAll(OBJECT_STORE_NAME);
    },
    async putRestaurant(restaurant){
        return (await dbPromise).put(OBJECT_STORE_NAME, restaurant);
    },
    async deleteRestaurant(restaurant){
        return (await dbPromise).delete(OBJECT_STORE_NAME, restaurant);
    },
};

export default FavoriteRestaurant;