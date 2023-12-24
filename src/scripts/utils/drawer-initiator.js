//ini adalah logika drawer agar bisa berfungsi sebagaimana mestinya
const DrawerInitiator = {
    init({button, drawer, content}){
        button.addEventListener('click', (event) => {
            this._toggleDrawer(event, drawer);
            event.preventDefault();
        });
        content.addEventListener('click', (event) => {
            this._closeDrawer(event, drawer)
        });
    },

    _toggleDrawer(event, drawer){
        event.stopPropagation();
        drawer.classList.toggle('open');
        //console.log(drawer);
        //console.log("This hamburg-menu has been opened");
    },

    _closeDrawer(event, drawer){
        event.stopPropagation();
        drawer.classList.remove('open');
        //console.log("This hamburg-menu has been closed");
    },
};

export default DrawerInitiator;