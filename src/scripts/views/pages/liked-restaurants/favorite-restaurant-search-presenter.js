class FavoriteRestaurantSearchPresenter {
    constructor({ favoriteRestaurant }){
        this._listenToSearchRequestByUser();
        this._favoriteRestaurant = favoriteRestaurant;
    }

    _listenToSearchRequestByUser() {
        this._queryElement = document.getElementById('query');
        this._queryElement.addEventListener('change', (event) => {
            //console.log(event);
            this._searchRestaurant(event.target.value);
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
        let html;
        if (restaurants.length > 0) {
            html = restaurants.reduce(
                (carry, restaurant) => carry.concat(`
                  <li class="restaurant">
                    <span class="restaurant__title">${restaurant.title || '-'}</span>
                  </li>
                `),
                '',
            );
        } else {
            html = '<div class="restaurant__not__found">Film tidak ditemukan</div>';
        }
     
        document.querySelector('.restaurants').innerHTML = html;
        document
            .getElementById('restaurant-search-container')
            .dispatchEvent(new Event('restaurants:searched:updated'));
    }
    
}

export default FavoriteRestaurantSearchPresenter;