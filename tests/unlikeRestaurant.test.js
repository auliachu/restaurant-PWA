import LikeButtonInitiator from "../src/scripts/utils/like-button-initiator";
import FavoriteRestaurant from "../src/scripts/data/favorite-restaurant";

describe('Unliking A Restaurant', () => {
    const addLikeButtonContainer = () => {
        document.body.innerHTML = '<div id="likeButtonContainer"></div>';
    };

    beforeEach(async () => {
        addLikeButtonContainer();
        await FavoriteRestaurant.putRestaurant({ id: 1 });
    });

    afterEach(async () => {
        await FavoriteRestaurant.deleteRestaurant(1);
    });
    
    it('should display unlike widget when the restaurant has been liked', async () => {
        await LikeButtonInitiator.init({
            likeButtonContainer: document.querySelector('#likeButtonContainer'),
            restaurant: {
                id: 1,
            },
        });
        expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeTruthy();
    });
    it('should not display like widget when the restaurant has been liked', async () => {
        await LikeButtonInitiator.init({
            likeButtonContainer: document.querySelector('#likeButtonContainer'),
            restaurant: {
                id: 1,
            },
        });
        expect(document.querySelector('[aria-label="like this restaurant"]')).toBeFalsy();
    });
    xit('should not throw error when user click unlike widget if the unliked movie is not in the list', async () => {
        await LikeButtonInitiator.init({
            likeButtonContainer: document.querySelector('#likeButtonContainer'),
            restaurant: {
                id: 1,
            },
        });
        //hapus dulu restaurant dari daftar restaurant yang disukai
        await FavoriteRestaurant.deleteRestaurant(1);
        //kemudian simulasikan pengguna menekan widget batal menyukai restaurant
        document.querySelector('[aria-label="unlike this movie"]').dispatchEvent(new Event('click'));
        expect(await FavoriteRestaurant.getAllRestaurant()).toEqual([]);
    });
});