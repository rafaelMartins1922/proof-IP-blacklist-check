const { response } = require('express');
const User = require('../models/User');
 
/* Cria um novo registro*/
const create = async(req,res) => {
    try{
        const user = await User.create(req.body);
        return res.status(200).json({
            user
        });
    }catch(e) {
        return res.status(500).send(e);
    }
};
 
/*Lista todos os registros de uma tabela*/
const index = async(req,res) => {
    const user = await User.findAll();
    return res.status(200).json({user});
};
 
/* Busca um registro por seu id*/
const show = async(req,res) => {
    const {id} = req.params;
    const user = await User.findByPk(id);
    return res.status(200).json({user});
};
 
/* Atualiza/modifica informações de um registro*/
const update = async(req,res) => {
      const {id} = req.params;
      const [updated] = await User.update(req.body,{
        where: {id:id}
      });
     
      if(updated){
        const user = await User.findByPk(id);
        return res.status(200).send(user);
      }
  
      return res.status(500).send("Registro não encontrado.");
  };
 
/* Deleta um registro*/
const destroy = async(req,res) => {
    const {id} = req.params;
    const deleted = await User.destroy({where: {id: id}});
    if(deleted) {
        return res.status(200).json("Registro deletado com sucesso.");
    }
    return res.status(500).json("Registro não encontrado");
};
 
module.exports = {
    index,
    show,
    create,
    update,
    destroy
};
