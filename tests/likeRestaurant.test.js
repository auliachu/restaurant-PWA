import FavoriteRestaurant from "../src/scripts/data/favorite-restaurant";
import * as TestFactories from './helpers/testFactories';

describe('Liking A Movie', () => {
    const addLikeButtonContainer = () => {
        document.body.innerHTML = '<div id="likeButtonContainer"></div>';
    };
    //metode beforeEach sudah disediakan jest
    beforeEach(() => {
        addLikeButtonContainer();
    })
    it('Should show the like button when the restaurant has not been liked before', async () => {
        await TestFactories.createLikeButtonPresenterWithRestaurant({id: 1})
        expect(document.querySelector('[aria-label="like this restaurant"]')).toBeTruthy();
    });
    it('Should not show the unlike button when the restaurant has not been liked before', async () => {
        await TestFactories.createLikeButtonPresenterWithRestaurant({id: 1})
        expect(document.querySelector('[aria-label="unlike this restaurant]')).toBeFalsy();
    });
    it('should be able to like the restaurant', async () => {
        //TODO: Menyimulasikan widget ditekan, Memeriksa jika film memang disimpan dengan benar atau tidak
        await TestFactories.createLikeButtonPresenterWithRestaurant({id: 1})
        //untuk menyimulasikan widget ditekan bisa menggunakan dispatch event
        document.querySelector('#likeButton').dispatchEvent(new Event('click'));
        //setelah membangkitkan event 'click' asumsinya restaurant tersimpan di FavoriteRestaurant, jd perlu memiliki akses ke FavoriteRestaurant
        //untuk menguji restaurantnya tersimpan atau tidak, dapat memanfaatkan getRestaurant
        //memastikan restaurant berhasil disukai
        const movie = await FavoriteRestaurant.getRestaurant(1);
        expect(movie).toEqual({ id: 1 });

        await FavoriteRestaurant.deleteRestaurant(1);
    });

    //Test: Ternyata film sudah disukai
    it('Should not add a restaurant again when its already liked', async () => {
        await TestFactories.createLikeButtonPresenterWithRestaurant({id: 1});
        //tambahkan restaurant dengan ID 1 ke daftar restaurant yang disukai
        await FavoriteRestaurant.putRestaurant({ id: 1 });
        //simulasikan pengguna menekan tombol suka film
        document.querySelector('#likeButton').dispatchEvent(new Event('click'));
        //mau cek: apabila restaurant sudah berada dalam daftar restaurant yang disukai, maka tidak perlu menambahkannya kembali
        //untuk memeriksa bisa menggunakan method getAllRestaurant yang disediakan FavoriteRestaurant

        //tidak ada restaurant yang ganda
        expect(await FavoriteRestaurant.getAllRestaurant()).toEqual([{ id: 1 }]);
        await FavoriteRestaurant.deleteRestaurant(1);
    });

    //Test: Data film tidak memiliki ID
    it('Should not add a movie when it has no id', async () => {
        await TestFactories.createLikeButtonPresenterWithRestaurant({ });
        document.querySelector('#likeButton').dispatchEvent(new Event('click'));
        expect( await FavoriteRestaurant.getAllRestaurant()).toEqual([]);
    });
    
});



