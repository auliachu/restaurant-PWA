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
        const favoriteRestaurants = {
          getAllRestaurant: jest.fn().mockImplementation(() => []),
        };

        const presenter = new FavoriteRestaurantShowPresenter({
            view,
            favoriteRestaurants,
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

      it('should show the information that no restaurants have been liked', (done) => {
        document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
          expect(document.querySelectorAll('.restaurant-item__not__found').length).toEqual(1);

          done();
        });

        const favoriteRestaurants = {
          getAllRestaurant: jest.fn().mockImplementation(() => []),
        };

        new FavoriteRestaurantShowPresenter({
          view,
          favoriteRestaurants,
        });
      });
    });

    describe('when favorite restaurants exist', () => {
      it('should render the restaurants', () => {
        const favoriteRestaurants = {
          getAllRestaurant: jest.fn().mockImplementation(() => []),
        };
        const presenter = new FavoriteRestaurantShowPresenter({
          view,
          favoriteRestaurants,
        });

        presenter._displayRestaurants([
          {
            id: 11,
            title: 'A',
            vote_average: 4,
            overview: 'Sebuah film B',
          },
          {
            id: 22,
            title: 'B',
            vote_average: 4,
            overview: 'Sebuah film B',
          },
        ]);
        
        expect(document.querySelectorAll('.restaurant-item').length).toEqual(2);
      });
    });
  });