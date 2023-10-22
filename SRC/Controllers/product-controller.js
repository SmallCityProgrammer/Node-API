'use strict';

const ValidationContract = require('../validators/fluent-validator')
const repository = require("../repositories/product-repository")

exports.get = async (req,res,next) => {
  try {
    var data = await repository.get();
  res.status(200).send(data);
  } catch (e) {
    res.status(500).send({message: "Erro! 505"})
  }
}

exports.getBySlug = async (req,res,next) => {
  try {
    var data = await repository
    .getBySlug(req.params.slug)
    .then(data => {
      res.status(200).send(data);
    });
  } catch (e) {
    res.status(500).send({message: "Erro!"})
  }
}

exports.getById = async (req,res,next) => {
  try {
      const data = await repository
    .getById(req.params.id)
    .then(data => {
      res.status(200).send(data);
    })
  } catch (error) {
    res.status(500).send({message: "Erro!"})
  }
};

exports.getByTag = async (req,res,next) => {
  try {
      const data = await repository
    .getByTag(req.params.tag)
    .then(data => {
      res.status(200).send(data);
    });
  } catch (e) {
    res.status(500).send({message: "Erro!"})
  }
}

exports.post = async (req,res,next) => {
  let contract = new ValidationContract();
  contract.hasMinLen(req.body.title, 3, 'O titulo deve conter pelo menos 3 caracteres');
  contract.hasMinLen(req.body.slug, 3, 'O titulo deve conter pelo menos 3 caracteres');
  contract.hasMinLen(req.body.description, 3, 'O titulo deve conter pelo menos 3 caracteres');

    if(!contract.isValid()){
      res.status(400).send(contract.errors()).end();
      return;
    }
    try {
      await repository.create(req.body)

      res.status(201).send({
        message: 'Produto cadastrado com sucesso!'

      });
    } catch (e) {
      res.status(500).send({message: "Erro"})
    }
};

exports.put = async (req,res,next) => {
  try {
    await repository.update(req.params.id, req.body)
  .then(x => {
      res.status(200).send({
        message: 'Produto atualizado com sucesso!'
      });
    })
  } catch (e) {
    res.status(500).send({message: "Erro"})
  }
  
};


exports.delete = async (req,res,next) => {
  try {
    await repository
  .delete(req.body.id)
  .then(x => {
    res.status(200).send({
      message: 'Produto removido com sucesso!'
    });
  })
  } catch (e) {
    res.status(400).send({
      message:'Falha ao remover produto',
      data: e})
}}
