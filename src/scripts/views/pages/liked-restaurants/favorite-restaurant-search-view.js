class FavoriteRestaurantSearchView {
    getTemplate() {
        return `
            <div id="restaurant-search-container">
                <input id="query" type="text">
                
                <div class="restaurant-result-container">
                    <ul class="restaurants">
                    </ul>
                </div>
            </div>
        `;
    }

    getFavoriteRestaurantTemplate() {
        return `
            <div class="content">
                <h2 class="content__heading">Your Liked Movie</h2>
                <div id="restaurants" class="restaurants">
                </div>
            </div>
        `;
    }

    runWhenUserIsSearching(callback) {
        document.getElementById('query').addEventListener('change', (event) => {
            callback(event.target.value);
        });
    }

    showFavoriteRestaurant(restaurants) {
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
    
    showFavoriteRestaurants(restaurants) [
        document.getElementById('restaurants').innerHTML = '<div class="restaurant-item__not__found"></div>'
    ]

}

export default FavoriteRestaurantSearchView;