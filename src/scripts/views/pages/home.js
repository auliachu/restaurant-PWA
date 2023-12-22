const Home = {
    async render() {
        return `
        <div class="hero" id="hero">
            <div class="hero__inner">
            <h4 class="hero_title">Let's Find Your Favorite Food With Us</h4>
            <p class="hero__tagline">always serving the best quality</p>
            </div>
        </div>

        <div id="main-title" class="main-title">
            <h4>Explore Restaurant</h4>
        </div>

        <div id="container" class="container">
        </div>
        `;
    },

    async afterRender(){

    },
};

export default Home;