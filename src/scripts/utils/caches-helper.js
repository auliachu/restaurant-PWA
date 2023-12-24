import CONFIG from "../globals/config";

const CacheHelper = {
    async cachingAppShell(requests){
        //tujuan nya untuk caching appshell supaya tersedia offline
        const cache = await this._openCache();
        cache.addAll(requests);
    },

    async deleteOldCache(){
        //menghapus caches lama
        const cacheNames = await caches.keys(); //mengembalikan promise
        cacheNames.filter((name)=> name !== CONFIG.CACHE_NAME).map((filteredName) => caches.delete(filteredName));
    },

    async revalidateCache(request){
        //menambahkan fetch request ke caches menggunakan state while revalidate
        const response = await caches.match(request);
        
        if (response) {
            this._fetchRequest(request);
            return response;
        }
        return this._fetchRequest(request);
    },

    async _openCache(){ //fungsi untuk membuka/membuat cache yang dituju
        return caches.open(CONFIG.CACHE_NAME);
    },

    async _fetchRequest(request) {
        //melakukan fetch request sebelum le revaliate state
        const response = await fetch(request);

        if(!response || response.status !== 200 ){
            return response;
        }

        await this._addCache(request);
        return response;
    },

    async _addCache(request){
        const cache = await this._openCache();
        cache.add(request);
    },
};

export default CacheHelper;