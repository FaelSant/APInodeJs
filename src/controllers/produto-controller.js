import guid from "guid"
import azure from "azure-storage"
import ProductRepository from "../repositories/product-repository"
import config from "../config"
//metodo para listar os produtos
const ProdoductController = {
  //metodo para listar os produtos passando um id
  async get(req, res, next) {
    try {
      let data = await ProductRepository.get()
      res.status(200).send(data)
    } catch (e) {
      console.log("error: ", e)
      res.status(500).send({
        message: "Houve um erro de execução",
      })
    }
  },
  //metodo para listar os produtos passando um slug
  async getBySlugs(req, res, next) {
    try {
      let data = await ProductRepository.getBySlugs(req.params.slug)
      res.status(200).send(data)
    } catch (e) {
      res.status(500).send({
        message: "Houve um erro na sua requisição",
      })
    }
  },
  async getById(req, res, next) {
    try {
      let data = await ProductRepository.getById(req.params.id)
      res.status(200).send(data)
    } catch (e) {
      res.status(500).send({
        message: "Houve um erro na sua requisição",
      })
    }
  },
  async getByTags(req, res, next) {
    try {
      let data = await ProductRepository.getByTags(req.params.tags)
      res.status(200).send(data)
    } catch (e) {
      res.status(500).send({
        message: "Houve um erro na sua requisição",
      })
    }
  },
  async posts(req, res, next) {
    //metodo para lançar os produtos passando os parametros por req.body
    //Criando blob Service
    // const blobServ = azure.createBlobService(config.containerConnectionString)
    //  let filename = guid.raw().substring(0,6).toString()+ '.png';
    //  let rawData = req.body.image;
    // let matches = rawData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    // let type = matches[1];
    // let buffer = new Buffer(matches[2],'base64');
    //Salva imagem
    try {
      await ProductRepository.posts({
        title: req.body.title,
        //slug:req.body.slug,
        description: req.body.description,
        price: req.body.price,
        active: true,
        tags: req.body.tags,
        // image: 'https://nodestr1.blob.core.windows.net/product-image/' + filename
      })
      res.status(201).send({ message: "Produto cadastrado" })

      /*    await blobServ.createAppendBlobFromText('product-image',filename,buffer,{
                contentType: type
            },(error,result,response)=>{
                if(error){
                    filename = 'default-product.png'
                }
            })*/
    } catch (e) {
      console.log(e)
      res.status(500).send({
        message: "Houve um erro na sua requisição",
      })
    }
  },
  async put(req, res, next) {
    //metodo para atualizar um produto, localizanando - o pelo ID
    try {
      await ProductRepository.put(req.params.id, req.body)
      res.status(200).send({
        message: "Produto atualizado com sucesso!",
      })
    } catch (e) {
      res.status(500).send({
        message: "Houve um erro na sua solicitação",
      })
    }
  },
  async delete(req, res, next) {
    //Remover um produto passando o ID do mesmo

    try {
      await ProductRepository.delete(req.params.id)
      res.status(200).send({
        message: "Produto removido com sucesso",
      })
    } catch (e) {
      res.status(500).send({
        message: "Houve um erro na sua solicitação",
      })
    }
  },
}
export default ProdoductController
