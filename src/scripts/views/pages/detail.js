const Detail = {
    async render(){
        return `
        <div class="hero" id="hero">
            <div class="hero__inner">
            <h4 class="hero_title">Let's Find Your Favorite Food With Us</h4>
            <p class="hero__tagline">always serving the best quality</p>
            </div>
        </div>

        <div id="detail-title" class="detail-title">
            <h4>Detail Restaurant</h4>
        </div>

        <div id="container_detail" class="container_detail">
        </div>
        `;
    },

    async afterRender(){

    },
};

export default Detail;