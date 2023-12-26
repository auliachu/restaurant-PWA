import UrlParser from "../../routes/url-parser";
import RestaurantSource from "../../data/restaurant-source";
import { createRestaurantDetailTemplate } from "../templates/template-creator";
import LikeButtonPresenter from "../../utils/like-button-presenter";
import FavoriteRestaurant from "../../data/favorite-restaurant";

const Detail = {
    async render(){
        return `
        <div id="container_detail" class="container_detail">
        </div>
        <div id="likeButtonContainer">
        </div>
        <div class="container_detail2">
            <div class="title">
                <h3 class="info_menu">Restaurant's Menu</h3>
            </div>
            <div class="food">
                <h3>Foods Menu</h3>
            </div>
            <div class="food_restaurant_menu">
            </div>
            <div class="drink">
                <h3>Drinks Menu</h3>
            </div>
            <div class="drink_restaurant_menu">
            </div>
            <div class="drink">
                <h3>Reviews from customers</h3>
            </div>
            <div class="customer-reviews">
            </div>
        </div>
        
        `;
    },

    async afterRender(){
        const url = UrlParser.parseActiveUrlWithoutCombiner();
        const restaurant = await RestaurantSource.detailRestaurant(url.id);
        const restaurantContainer = document.querySelector('#container_detail');
        restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);
        const menuFoodRestaurant = await RestaurantSource.detailMenuRestaurant(url.id);
        console.log(menuFoodRestaurant);
        const foodListContainer = document.querySelector('.food_restaurant_menu')
        menuFoodRestaurant.forEach((menus)=>{
            foodListContainer.innerHTML += `
            <div class="foods-menu">
                <p class="foodMenu">${menus.name}</p>
            </div>
            `;
        });
        const menuDrinkRestaurant = await RestaurantSource.detailDrinksMenuRestaurant(url.id);
        console.log(menuDrinkRestaurant);
        const drinkListContainer = document.querySelector('.drink_restaurant_menu');
        menuDrinkRestaurant.forEach((drinks)=>{
            drinkListContainer.innerHTML += `
            <div class="drinks-menu">
                <p class="drinkMenu">${drinks.name}</p>
            </div>
            `;
        });
        const custReviews = await RestaurantSource.detailCustomerReviews(url.id);
        console.log(custReviews);
        const customerListContainer = document.querySelector('.customer-reviews');
        custReviews.forEach((reviews)=>{
            customerListContainer.innerHTML += `
            <div class="customer_review">
                <p>${reviews.name} : ${reviews.review}</p>
            </div>
            `;
        });
        LikeButtonPresenter.init({
            likeButtonContainer: document.querySelector('#likeButtonContainer'),
            favoriteRestaurant: FavoriteRestaurant,
            restaurant: {
                id: restaurant.id,
                name: restaurant.name,
                rating: restaurant.rating,
                city: restaurant.city,
                address: restaurant.address,
                pictureId: restaurant.pictureId,
                description: restaurant.description,
            },
        });
    },
};

export default Detail;