import FavoriteRestaurantSearchPresenter from "../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-presenter";
import FavoriteRestaurantSearchView from "../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-view";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";

describe('Searching movie', () => {
    let presenter;
    let favoriteRestaurant;
    let view;
    
    const searchRestaurant = (query) => {
        const queryElement = document.getElementById('query');
        queryElement.value = query;
        queryElement.dispatchEvent(new Event('change'));
    };
    
    const setRestaurantSearchContainer = () => {
        view = new FavoriteRestaurantSearchView();
        document.body.innerHTML = view.getTemplate();
    };
    const constructPresenter = () => {
        favoriteRestaurant = {
            getAllRestaurant: jest.fn(),
            searchRestaurant: jest.fn(),
        }
        
        presenter = new FavoriteRestaurantSearchPresenter({
          favoriteRestaurant,
          view,
        });
    };
     
    beforeEach(() => {
        setRestaurantSearchContainer()
        constructPresenter();
    });

    describe('when query is not empty', () => {
        it('should be able to capture the query typed by the user', () => {
            //simulasikan pengguna memasukkan nilai film yang ingin dicari
            favoriteRestaurant.searchRestaurant.mockImplementation(() => []);
            searchRestaurant('film a');
            expect(presenter.latestQuery).toEqual('film a');
        });
        it('should ask the model to search for liked restaurants', () => {
            favoriteRestaurant.searchRestaurant.mockImplementation(() => []);
            // eslint-disable-next-line no-unused-vars
            searchRestaurant('film a');
            expect(favoriteRestaurant.searchRestaurant).toHaveBeenCalledWith('film a');
        });
        it('should show the found restaurant', () => {
            presenter._showFoundRestaurant([{ id: 1 }]);
            expect(document.querySelectorAll('.restaurant').length).toEqual(1);
            
            presenter._showFoundRestaurant([
                {
                id: 1,
                title: 'Satu',
                },
                {
                id: 2,
                title: 'Dua',
                },
            ]);
            expect(document.querySelectorAll('.restaurant').length).toEqual(2);
        });
        it('should show the title of the found restaurant', () => {
            presenter._showFoundRestaurant([
                {
                id: 1,
                title: 'Satu',
                },
            ]);
            
            expect(document.querySelectorAll('.restaurant__title').item(0).textContent).toEqual('Satu');
            
            presenter._showFoundRestaurant([
                {
                id: 1,
                title: 'Satu',
                },
                {
                id: 2,
                title: 'Dua',
                },
            ]);
            
            const RestaurantTitles = document.querySelectorAll('.restaurant__title');
            
            expect(RestaurantTitles.item(0).textContent).toEqual('Satu');
            expect(RestaurantTitles.item(1).textContent).toEqual('Dua');
            });
            
        it('should show - for found restaurant without title', () => {
            presenter._showFoundRestaurant([{ id: 1 }]);
            
            expect(document.querySelectorAll('.restaurant__title').item(0).textContent).toEqual('-');
        });
        
        it('should show the restaurant found by Favorite Restaurant', (done) => {
            document
                .getElementById('restaurant-search-container')
                .addEventListener('restaurants:searched:updated', () => {
                expect(document.querySelectorAll('.restaurant').length).toEqual(3);
            
                done();
                });
            
            favoriteRestaurant.searchRestaurant.mockImplementation((query) => {
                if (query === 'film a') {
                return [
                    { id: 111, title: 'film abc' },
                    { id: 222, title: 'ada juga film abcde' },
                    { id: 333, title: 'ini juga boleh film a' },
                ];
                }
            
                return [];
            });
            
            searchRestaurant('film a');
            });
            
        it('should show the name of the restaurant found by Favorite Restaurant', (done) => {
            document
                .getElementById('restaurant-search-container')
                .addEventListener('restaurants:searched:updated', () => {
                const restaurantTitles = document.querySelectorAll('.restaurant__title');
            
                expect(restaurantTitles.item(0).textContent).toEqual('film abc');
                expect(restaurantTitles.item(1).textContent).toEqual('ada juga film abcde');
                expect(restaurantTitles.item(2).textContent).toEqual('ini juga boleh film a');
            
                done();
                });
            
            favoriteRestaurant.searchRestaurant.mockImplementation((query) => {
                if (query === 'film a') {
                return [
                    { id: 111, title: 'film abc' },
                    { id: 222, title: 'ada juga film abcde' },
                    { id: 333, title: 'ini juga boleh film a' },
                ];
                }
            
                return [];
            });
            
            searchRestaurant('film a');
        });
    });

    describe('when query is empty', () => {
        it('should capture the query as empty', () => {
            favoriteRestaurant.getAllRestaurant.mockImplementation(() => []);
            searchRestaurant(' ');
            expect(presenter.latestQuery.length).toEqual(0);

            searchRestaurant('    ');
            expect(presenter.latestQuery.length).toEqual(0);

            searchRestaurant('');
            expect(presenter.latestQuery.length).toEqual(0);

            searchRestaurant('\t');
            expect(presenter.latestQuery.length).toEqual(0);
        });

        it('should show all favorite restaurants', () => {
            favoriteRestaurant.getAllRestaurant.mockImplementation(() => []);
            searchRestaurant('       ');
            expect(favoriteRestaurant.getAllRestaurant).toHaveBeenCalled();
        })
    });

    describe('when no favorite restaurants could be found', () => {
        it('should show the empty message', (done) => {
            document
                .getElementById('restaurant-search-container')
                .addEventListener('restaurants:searched:updated', () => {
                    expect(document.querySelectorAll('.restaurant__not__found').length).toEqual(1);
                    done();
                });
            favoriteRestaurant.searchRestaurant.mockImplementation((query) => []);
            searchRestaurant('film a');
        });
        it('should not show any movie', (done) => {
            document.getElementById('restaurant-search-container')
                .addEventListener('restaurants:searched:updated', () => {
                    expect(document.querySelectorAll('.restaurant').length).toEqual(0);
                    done();
                });
            favoriteRestaurant.searchRestaurant.mockImplementation((query) => []);
            searchRestaurant('film a');
        });
    });
});

