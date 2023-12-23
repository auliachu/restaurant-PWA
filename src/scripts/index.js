import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import '../styles/responsive.css';
// import DATA from "../public/data/DATA.json";
import App from './views/app';
import swRegister from './utils/sw-register';

// Request data 

// console.log(DATA.restaurants)

// const getDataRestaurant = (data)=>{
//     data.restaurants.forEach(restaurant=>{
//          const restaurantDataItem = document.querySelector('.container')
//        restaurantDataItem.innerHTML+=`
//         <div class="content">
//             <img
//             class="content-item"
//             src="${restaurant.pictureId}" 
//             alt="ini adalah gambar ${restaurant.name}"
//             />
//             <h4 class="content-item_title">${restaurant.name}</h4>
//             <div class="content-item_details">
//             <p class="content-item_city">${restaurant.city}</p>
//             <p class="content-item_rating">${restaurant.rating}</p>
//             </div>
//             <p class="content-item_description">${restaurant.description}</p>
//         </div>
//         `;
//     })
// }

// getDataRestaurant(DATA);

const app = new App({
    button: document.querySelector('#hamburger'),
    drawer: document.querySelector('.nav-list ul'),
    content: document.querySelector('#mainContent'),
});

window.addEventListener('hashchange',()=>{
    app.renderPage();
});

window.addEventListener('load', ()=>{
    app.renderPage();
    swRegister();
});