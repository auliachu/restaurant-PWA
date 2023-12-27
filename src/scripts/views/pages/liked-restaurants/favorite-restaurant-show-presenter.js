class FavoriteRestaurantShowPresenter {
    constructor({ view }) {
        this._view = view;
    }
    _displayRestaurants(restaurants) {
        this._view.showFavoriteRestaurants(restaurants);
    }

}
export default FavoriteRestaurantShowPresenter;