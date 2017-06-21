import controllers from './controllers';

const parentsController = controllers.parents;

export default function ( app ) {

    app.get( '/ping', (req, res)=>{
        res.send('pong');
    });

    app.get('/parents', parentsController.all);
    app.get('/parents/:id', parentsController.getOne);
    app.post('/parents/:id', parentsController.add);
    app.put('/parents/:id', parentsController.update);
    app.delete('/parents/:id', parentsController.remove);

}