import { createLikeMovieButtonTemplate, createUnlikeMovieButtonTemplate } from "../views/templates/template-creator";

const LikeButtonPresenter ={
    //butuh container yang menampung tombol like diletakkan, dan objek restaurant yang dimasukkan ke dalam database
    async init({likeButtonContainer, favoriteRestaurant, restaurant}){
        this._likeButtonContainer = likeButtonContainer;
        this._restaurant = restaurant;
        this._favoriteRestaurant = favoriteRestaurant;
        await this._renderButton();
    },
    async _renderButton(){
        //tombol dirender berdasarkan keadaan apakah restaurant telah berada di database disukai atau belum
        //ketika restaurant disukai, maka tombol like menampilkan dengan icon hati penuh
        //jika belum disukai akan menampilkan icon hati outline saja
        //sehingga kita periksa dulu apakah restaurant sudah di database atau belum
        //jika sudah buat dgn hati penuh, jika belum buat dengan hati kosong
        const { id } = this._restaurant;

        if (await this._isRestaurantExist(id)){
            this._renderLiked();
        }else{
            this._renderLike();
        }
    },
    async _isRestaurantExist(id){
        const restaurant = await this._favoriteRestaurant.getRestaurant(id);
        return !!restaurant;
    },
    
    _renderLike(){
        this._likeButtonContainer.innerHTML = createLikeMovieButtonTemplate();

        const likeButton = document.querySelector('#likeButton');
        likeButton.addEventListener('click', async () => {
            await this._favoriteRestaurant.putRestaurant(this._restaurant);
            this._renderButton();
        });
    },
    
    _renderLiked(){
        this._likeButtonContainer.innerHTML = createUnlikeMovieButtonTemplate();

        const likeButton = document.querySelector('#likeButton');
        likeButton.addEventListener('click', async ()=>{
            await this._favoriteRestaurant.deleteRestaurant(this._restaurant.id);
            this._renderButton();
        });
    },
};

export default LikeButtonPresenter;