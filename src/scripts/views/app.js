import DrawerInitiator from "../utils/drawer-initiator";
import UrlParser from "../routes/url-parser";
import routes from "../routes/routes";

class App {
    constructor({button, drawer, content}){
        this._button = button;
        this._drawer = drawer;
        this._content = content;
        this._initialAppShell();
    }

    _initialAppShell(){
        //adalah sebuah method yang bertujuan untuk menginisiasikan komponen appShell yang sudah dimasukkan pd properti class
        DrawerInitiator.init({
            button: this._button,
            drawer: this._drawer,
            content: this._content,
        });
    }

    async renderPage() {
        const url = UrlParser.parseActiveUrlWithCombiner();
        const page = routes[url];
        this._content.innerHTML = await page.render();
        await page.afterRender();
        //skip content
        const skipLinkElem = document.querySelector('.skip-link');    
        skipLinkElem.addEventListener('click', (event) => {      
        event.preventDefault();
        document.querySelector('#mainContent').focus();
});
    }
}

export default App;

//kelas App bertujuan menginisiasikan komponen-komponen App Shell, ketika web dimuat, AppShell yang pertama dijalankan adalah kelas App
//komponen AppShell yang di inisiasikan adalah komponen pembentuk fitur drawer
//hamburgerButton => untuk menampilkan drawer content
//drawerContent => untuk menampung list navigasi
//mainContent => untuk menyembunyikan drawerContent ketika di klik
//buat constructor App dengan 3 parameter => button, drawer, dan content

//Karena parameter lebih dari 2 tidak direkomendasikan oleh clean code, maka buat parameternya menjadi objek destructuring ES6