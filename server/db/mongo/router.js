import controllers from './controllers';
import { initDatabase } from './services/init_database';

const parentsController = controllers.parents;
const offerDetailsController = controllers.offerDetails;

export default function ( app ) {

    app.get( '/ping', (req, res)=>{
        res.send('pong');
    });

    generateCommonCRUDrouts(app, '/parents', parentsController);
    generateCommonCRUDrouts(app, '/offer_details', offerDetailsController);

    app.get('/init_database', initDatabase);

}

function generateCommonCRUDrouts(app, route, controller){
    app.get(route, controller.all);
    app.get(route+'/:id', controller.getOne);
    app.post(route, controller.add);
    app.put(route+'/:id', controller.update);
    app.delete(route+'/:id', controller.remove);

}