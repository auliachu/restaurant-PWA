import FavoriteRestaurantSearchView from "../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-view";
import FavoriteRestaurantShowPresenter from "../src/scripts/views/pages/liked-restaurants/favorite-restaurant-show-presenter";

describe('Showing all favorite restaurants', () => {
    let view;
    const renderTemplate = () => {
        view = new FavoriteRestaurantSearchView();
        document.body.innerHTML = view.getFavoriteRestaurantTemplate();
    };

    beforeEach(() => {
        renderTemplate();
    });

    describe('When no restaurants have been liked', () => {

      it('should render the information that no restaurants have been liked', () => {
        const presenter = new FavoriteRestaurantShowPresenter({
            view,
        });

        const restaurants = [];
        presenter._displayRestaurants(restaurants);
        expect(document.querySelectorAll('.restaurant-item__not__found').length).toEqual(1);
      });

      it('should ask for the favorite restaurants', () => {
        const favoriteRestaurants = {
          getAllRestaurant: jest.fn().mockImplementation(() => []),
        };

        new FavoriteRestaurantShowPresenter({
          view,
          favoriteRestaurants,
        });

        expect(favoriteRestaurants.getAllRestaurant).toHaveBeenCalledTimes(1);
      });
    });
  });