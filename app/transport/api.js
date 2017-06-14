export default {

    fetchOffers: function(){
        return new Promise( resolve => {
            setTimeout(
                ()=>{ resolve( mockOffersData ) },
                1000
            )
        } )
    }

};

const mockOffersData =
    {
        "contentType":null,
        "id":"wei4oinr-6546-4dewf-87ae-8d91abffe242",
        "properties":null,
        "createdAt":null,

        "offers":[
            {
                "id":"c482b0fb-ca01-4200-ba10-61a16f8597ae",
                "properties":{
                    "name":"Acer computer",
                    "reducedPrice":{
                        "amount":888,
                        "currencyCode":"USD"
                    },
                    "originalPrice":{
                        "amount":999,
                        "currencyCode":"USD"
                    },
                    "productImagePointer":{
                        "itemName":"main.jpg"
                    }
                },
                "createdAt":"2017-03-07T17:12:21.177Z"
            },
            {
                "id":"c482b234-3a01-4500-ba10-61a16f8597ae",
                "properties":{
                    "name":"Apple computer",
                    "reducedPrice":{
                        "amount":1999,
                        "currencyCode":"USD"
                    },
                    "originalPrice":{
                        "amount":1998,
                        "currencyCode":"USD"
                    },
                    "productImagePointer":{
                        "itemName":"apple.jpg"
                    }
                },
                "createdAt":"2017-03-07T17:12:21.177Z"
            }
        ]
    };