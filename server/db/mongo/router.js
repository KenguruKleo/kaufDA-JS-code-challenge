import controllers from './controllers';

const parentsController = controllers.parents;
const offerDetailsController = controllers.offerDetails;

export default function ( app ) {

    app.get( '/ping', (req, res)=>{
        res.send('pong');
    });

    app.get('/parents', parentsController.all);
    app.get('/parents/:id', parentsController.getOne);
    app.post('/parents/:id', parentsController.add);
    app.put('/parents/:id', parentsController.update);
    app.delete('/parents/:id', parentsController.remove);

    app.get('/offer_details', offerDetailsController.all);
    app.get('/offer_details/:id', offerDetailsController.getOne);
    app.post('/offer_details/:id', offerDetailsController.add);
    app.put('/offer_details/:id', offerDetailsController.update);
    app.delete('/offer_details/:id', offerDetailsController.remove);

}