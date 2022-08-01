//responsavel por executar o que tiver que ser executado
//as funcoes de lidar com o banco de dados
//os cruds - GetAll, GetById, Persistir, Delete
import { sequelize } from "../config/config";
import { Op } from "sequelize";
import  jwt  from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import Usuario from "../models/autenticacaoModel";

const getAll = async (req, res) => {
  try {
    const users = await Usuario.findAll()
    return res.status(200).send({
      type: "sucess",
      message: "Usuarios consultados com sucesso",
      data: users
    });
  }catch (err) {
    return res.status(200).send({
      type: "error",
      message: "Usuarios consultados sem sucesso",
      data: err
    });
  }
}

const create = async (req, res) => {
  try{
    let {password, username, name} = req.body;
    let passwordHash = await bcrypt.hash(password, 10);
    let createUser = {
      username: username,
      passwordHash: passwordHash,
      name: name
    }
    console.log(`a senha informada foi password: ${password}, e o hash criado foi password: ${passwordHash}`);
    let response = await Usuario.create(createUser,res)
    return res.status(200).send({
      type: "success",
      message: "Registrado com sucesso",
      data: response
    })
  }catch(error){
    return res.status(200).send({
      type: "error",
      message: "Registrado sem sucesso",
      data: error
    })
  }
}

const login = async (req, res) => {
  try {
    let {password, username} = req.body
    
    let usuario = await Usuario.findOne({
      where: {username: username},
    })
    if(!usuario) {
      return res.status(200).send({
        type: "error",
        message: "Usuario ou senha incorretos",
      })
    }
    console.log(password);
    console.log(usuario.dataValues.passwordHash);
    console.log(await bcrypt.compare(password, usuario.dataValues.passwordHash));
    
    if (await bcrypt.compare(password, usuario.dataValues.passwordHash.toString())) {
      let token = jwt.sign({username},process.env.PRIVATE_KEY, {expiresIn: 5})
      usuario.set({
        token: token,
      })
      console.log(usuario[token]);
      console.log(usuario.dataValues)
      await usuario.save()
      return res.status(200).send({
        type: "sucess",
        message: "você logou no sistema"
      })
   
    }else{
      return res.status(200).send({
        type: "error",
        message: "usuario ou senha invalido"
      })
    }

  } catch (error) {
    return res.status(200).send({
      type: "error",
      message: "erro",
      data: error
    })
  }
}

export default{
  getAll,
  create,
  login,
};  