import Urls from './urls';

export default {

    fetchOffers: function(){
        return fetch(Urls.offers)
            .then(function (res) {
                return res.json();
            })
            .then(
                ( data )=>{ return data }
            )
    },

    fetchOfferDetail: function(id){
        return fetch(Urls.offerDetail)
            .then(function (res) {
                return res.json();
            })
            .then(
                ( data )=>{ return data }
            )
    }

};
