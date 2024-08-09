import { Model, DataTypes } from "sequelize";
import sequelize from "../database/Connection.js";

class Pedido extends Model {}


Pedido.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    restaurante: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cliente: {
        type: DataTypes.STRING,
        allowNull:false,
        unique: false,
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    descricaoPedido: {
        type:DataTypes.STRING,
        allowNull:false,
        unique: false
    },
     localizacao: {
        type:DataTypes.GEOMETRY,
        allowNull:false
     }   
    }, {
        sequelize,
        modelName: 'Pedido'        
    });

export default Pedido;