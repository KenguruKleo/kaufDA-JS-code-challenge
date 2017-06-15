import Urls from './urls';

export default {

    fetchOffers: function(){
        return fetch(Urls.offers)
            .then(function (res) {
                return res.json();
            })
            .then(
                data => data
            )
    },

    fetchOfferDetail: function(id){
        return fetch( Urls.offerDetail + '/' + id)
            .then(function (res) {
                if( res.status === 200 ){
                    return res.json();
                } else {
                    throw ({message: "error fetching data"});
                }
            })
            .then(
                data => data
            )
    },

    saveOfferDetail: function(id, data){
        return fetch(
            Urls.offerDetail + '/' + id, {
                method: 'put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
         }).then(function (res) {
            if( res.status === 200 ){
                return res.json();
            } else {
                throw ({message: "error saving data"});
            }
        })
        .then(
            data => data
        )
    },

    deleteOfferDetail: function(id){
        return fetch( Urls.offerDetail + '/' + id, { method: 'delete' } )
            .then(function (res) {
                if( res.status === 200 ){
                    return res.json();
                } else {
                    throw ({message: "error deleting data"});
                }
            })
            .then(
                data => data
            )
    },

};
