class FavoriteRestaurantShowPresenter {
    constructor({ view, favoriteRestaurants }) {
        this._view = view;
        this._favoriteRestaurants = favoriteRestaurants;
        this._favoriteRestaurants.getAllRestaurant();
    }
    _displayRestaurants(restaurants) {
        this._view.showFavoriteRestaurants(restaurants);
    }

}
export default FavoriteRestaurantShowPresenter;