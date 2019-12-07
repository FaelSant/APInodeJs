const repository = require('../repositories/order-repository');
const guid = require('guid');
const authService = require('../services/auth-services')
exports.get = async(req,res,next) =>{
    try{
        let data = await repository.get();
        res.status(200).send(data);
    }catch(e){
            res.status(500).send({
                message:'Houve um erro de execução'});
        }
}
exports.posts = async(req,res,next) => { 
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token']
        const data = await authService.decodeToken(token);


        await repository.posts({
        customer: data.id,
        number: guid.raw().substring(0,6),
        items: req.body.items
    })
        res.status(201).send({
            message:'Pedido cadastrado'});
    }catch(e){
        res.status(500).send({
            message:'Houve um erro na sua requisição'
        }); 
   
    }
}
