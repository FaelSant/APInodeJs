const repository = require('../repositories/customer-repository')
const md5 = require('md5');
const emailService = require('../services/email-services')
const authService = require('../services/auth-services');
exports.posts = async(req,res,next) => {
    try{
        await repository.posts({
            name:req.body.name,
            email:req.body.email,
            password: md5(req.body.password + global.SALT_KEY),
            roles:["user"]
        })

        // emailService.send(req.body.email,
        //     'Bem vindo a Node Store', 
        //     global.EMAIL.replace('{0}',req.body.name))
        res.status(201).send({
            message:'Cliente cadastrado'});
    }catch(e){
        res.status(500).send({
            message:'Houve um erro na sua requisição'
        }); 
   
    }
}
exports.delete = async(req,res,next) => {
    try{
    await repository.delete(req.params.id);
    res.status(200).send({
        message:'Cliente removido com sucesso!'})
    }catch(e){
        res.status(500).send({
            message:'Houve um erro na sua solicitação'
        })
    }
    
};
exports.get = async(req,res,next) =>{
    try{
        let data = await repository.get();
        res.status(200).send(data);
    }catch(e){
            res.status(500).send({
                message:'Houve um erro de execução'});
        }
}

exports.authenticate = async(req,res,next) => {
    try{
        const customer = await repository.authenticate({
            email:req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        })
        if(!customer){
            res.status(404).send({
                message:"Usuário ou senha invalidos"}
                )
                return
                
        }
        const token = await authService.generateToken({
            id:customer._id,
            email:customer.email,
            name: customer.name,
            roles: customer.roles
        })
        res.status(201).send({
            token:token,
            data:{
                name:customer.name,
                email:customer.email
            }
        });
    }catch(e){
        res.status(500).send({
            message:'Houve um erro na sua requisição'
        }); 
   
    }
}

exports.refreshToken = async(req,res,next) => {
    try{

        const token = req.body.token || req.query.token || req.headers['x-access-token']
        const data = await authService.decodeToken(token);


        const customer = await repository.getById(data.id)
        if(!customer){
            res.status(404).send({
                message:"Cliente nao encontrado"}
                )
                return
        }
        const tokenData = await authService.generateToken({
            id:customer._id,
            email:customer.email,
            name: customer.name,
            roles: customer.roles
        })
        res.status(201).send({
            token:token,
            data:{
                name:customer.name,
                email:customer.email
            }
        });
    }catch(e){
        console.log(e)
        res.status(500).send({
            message:'Houve um erro na sua requisição'
        }); 
   
    }
}