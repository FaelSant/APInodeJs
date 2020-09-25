const guid = require('guid')
const azure = require('azure-storage');
const repository = require('../repositories/product-repository')
const config = require('../config')
//metodo para listar os produtos
exports.get = async(req,res,next) =>{
    try{
        let data = await repository.get();
        res.status(200).send(data);
    }catch(e){
            res.status(500).send({
                message:'Houve um erro de execução'});
        }
}
//metodo para listar os produtos passando um slug
exports.getBySlugs = async(req,res,next) =>{
   try{
    let data = await repository.getBySlugs(req.params.slug);
         res.status(200).send(data);
   }catch(e){
       res.status(500).send({
           message:'Houve um erro na sua requisição'
       })
   }
    
}
//metodo para listar os produtos passando um id
exports.getById = async(req,res,next) => {
try{
    let data = await repository.getById(req.params.id);
    res.status(200).send(data)
}catch(e){
    res.status(500).send({
        message:'Houve um erro na sua requisição'
    });
}  
}
exports.getByTags = async(req,res,next) => {
        try{
        let data = await repository.getByTags(req.params.tags);
        res.status(200).send(data)
        }catch(e){
            res.status(500).send({
                message:'Houve um erro na sua requisição'
            });
    }
}

//metodo para lançar os produtos passando os parametros por req.body
exports.posts = async(req,res,next) => {
    //Criando blob Service
    // const blobServ = azure.createBlobService(config.containerConnectionString)
   //  let filename = guid.raw().substring(0,6).toString()+ '.png';
   //  let rawData = req.body.image;
    // let matches = rawData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
   // let type = matches[1];
    // let buffer = new Buffer(matches[2],'base64');
     //Salva imagem
    try{
        await repository.posts({
            title:req.body.title,
            //slug:req.body.slug,
            description: req.body.description,
            price: req.body.price,
            active:true,
            tags:req.body.tags,
           // image: 'https://nodestr1.blob.core.windows.net/product-image/' + filename
        })
        res.status(201).send({message:'Produto cadastrado'});

         /*    await blobServ.createAppendBlobFromText('product-image',filename,buffer,{
                 contentType: type
             },(error,result,response)=>{
                 if(error){
                     filename = 'default-product.png'
                 }
             })*/
    }catch(e){
        console.log(e);
        res.status(500).send({
            message:'Houve um erro na sua requisição'
        }); 
    }
    }
//metodo para atualizar um produto, localizanando - o pelo ID
exports.put = async(req,res,next) => {
  try {
      await repository.put(req.params.id,req.body);
      res.status(200).send({
          message:'Produto atualizado com sucesso!'
      })
  }catch(e){
      res.status(500).send({
          message:'Houve um erro na sua solicitação'
      })
  }
}

//Remover um produto passando o ID do mesmo
exports.delete = async(req,res,next) => {
    try{
    await repository.delete(req.params.id);
    res.status(200).send({
        message:'Produto removido com sucesso'})
    }catch(e){
        res.status(500).send({
            message:'Houve um erro na sua solicitação'
        })
    }
    
};


