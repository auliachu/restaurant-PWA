class FavoriteRestaurantSearchPresenter {
    constructor({ favoriteRestaurant }){
        this._listenToSearchRequestByUser();
        this._favoriteRestaurant = favoriteRestaurant;
        this._view = view;
    }

    _listenToSearchRequestByUser() {
        this._view.runWhenUserIsSearching((latestQuery) => {
            this._searchRestaurant(latestQuery);
        });
    }

    get latestQuery(){
        return this._latestQuery;
    }

    async _searchRestaurant(latestQuery){
        this._latestQuery = latestQuery.trim();
        let foundRestaurant;
        if(this.latestQuery.length > 0) {
            foundRestaurant = await this._favoriteRestaurant.searchRestaurant(this.latestQuery);
        } else {
            foundRestaurant = await this._favoriteRestaurant.getAllRestaurant();
        }
        this._showFoundRestaurant(foundRestaurant);
    }

    _showFoundRestaurant(restaurants) { //lanjut disini 
        this._view._showFavoriteRestaurant(restaurants);
    }
    
}

export default FavoriteRestaurantSearchPresenter;