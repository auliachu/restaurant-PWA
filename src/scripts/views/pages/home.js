import RestaurantSource from "../../data/restaurant-source";
import { createRestaurantItemTemplate } from "../templates/template-creator";

const Home = {
    async render() {
        return `
        <div class="hero" id="hero">
            <div class="hero__inner">
            <h4 class="hero_title">Let's Find Your Favorite Food With Us</h4>
            <p class="hero__tagline">always serving the best quality</p>
            </div>
        </div>

        <div id="main-title" class="main-title">
            <h4>Explore Restaurant</h4>
        </div>

        <div id="container" class="container">
        </div>
        `;
    },

    async afterRender(){
        //fungsi afterRender dijalankan persis setelah fungsi render dijalankan
        const restaurants = await RestaurantSource.resturantList();
        console.log(restaurants);
        const restaurantContainer = document.querySelector('#container');
        restaurants.forEach((restaurant)=>{
            restaurantContainer.innerHTML += createRestaurantItemTemplate(restaurant);
        });

    },
};

export default Home;