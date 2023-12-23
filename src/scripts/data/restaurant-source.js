import API_ENDPOINT from "../globals/api-endpoint";

class RestaurantSource {
    static async resturantList(){
        const response = await fetch(API_ENDPOINT.HOME);
        const responseJson = await response.json();
        return responseJson.restaurants;
    }

    static async detailRestaurant(id){
        const response = await fetch(API_ENDPOINT.DETAIL(id));
        const responseJson = await response.json();
        return responseJson.restaurant;
    }

    static async detailMenuRestaurant(id){
        const response = await fetch(API_ENDPOINT.DETAIL(id));
        const responseJson = await response.json()
        const AllMenu = responseJson.restaurant;
        const foodsMenu = AllMenu.menus;
        return foodsMenu.foods;
    }

    static async detailDrinksMenuRestaurant(id){
        const response = await fetch(API_ENDPOINT.DETAIL(id));
        const responseJson = await response.json();
        const AllMenu = responseJson.restaurant;
        const drinkMenu = AllMenu.menus;
        return drinkMenu.drinks;
    }

    static async detailCustomerReviews(id){
        const response = await fetch(API_ENDPOINT.DETAIL(id));
        const responseJson = await response.json();
        const responseRestaurant = responseJson.restaurant;
        return responseRestaurant.customerReviews;
    }
}
export default RestaurantSource;
