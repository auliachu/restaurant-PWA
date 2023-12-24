import FavoriteRestaurant from "../../data/favorite-restaurant";
import { createRestaurantItemTemplate } from "../templates/template-creator";

const Like = {
    async render(){
        return `
        <div id="container" class="container">
        </div>
        `;
    },
    async afterRender(){
        //mengambil data dari FavoriteRestaurant bukan dari restaurant-source
        const restaurants = await FavoriteRestaurant.getAllRestaurant();
        console.log(restaurants);
        const restaurantContainer = document.querySelector('#container');
        restaurants.forEach((restaurant)=>{
            restaurantContainer.innerHTML += createRestaurantItemTemplate(restaurant);
        });
    },
};
export default Like;