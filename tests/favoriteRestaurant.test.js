import { itActsAsFavoriteRestaurantModel } from "./contracts/favoriteRestaurantContract";
import FavoriteRestaurant from "../src/scripts/data/favorite-restaurant";

describe('favorite restaurant contract implementation', () => {
    afterEach(async () => {
        (await FavoriteRestaurant.getAllRestaurant()).forEach(async (restaurant) => {
            await FavoriteRestaurant.deleteRestaurant(restaurant.id);
        });
    });
    itActsAsFavoriteRestaurantModel(FavoriteRestaurant);
});