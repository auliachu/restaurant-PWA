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

        const foundRestaurant = await this._favoriteRestaurant.searchRestaurant(this._latestQuery);
        this._showFoundRestaurant(foundRestaurant);
    }

    _showFoundRestaurant(restaurants) {
        const html = restaurants.reduce(
          (carry, restaurant) => carry.concat(`
            <li class="restaurant">
              <span class="restaurant__title">${restaurant.title || '-'}</span>
            </li>
          `),
          '',
        );
     
        document.querySelector('.restaurants').innerHTML = html;
        document
            .getElementById('restaurant-search-container')
            .dispatchEvent(new Event('restaurants:searched:updated'));
    }
}

export default FavoriteRestaurantSearchPresenter;