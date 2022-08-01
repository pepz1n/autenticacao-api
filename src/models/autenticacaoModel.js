import { DataTypes, UniqueConstraintError } from "sequelize";
import { sequelize } from "../config/config";


const Usuario = sequelize.define(
    'usuarios',
    {
        id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		  },
      name:{
        type: DataTypes.CHAR,
        allowNull: false
      },
      username: {
        type: DataTypes.CHAR,
        allowNull: false,
        unique: true
      },
      passwordHash: {
        type: DataTypes.CHAR,
        allowNull: false,
        field: 'password_hash'
      },
      token: {
        type: DataTypes.CHAR,
      },
      role: {
        type: DataTypes.CHAR,
        allowNull: false,
        defaultValue: 'customer'
      }
    },
    
    {
        freezeTableName: true,
		timestamps: true,
		createdAt: 'created_at',
		updatedAt: 'updated_at'
    }

)


export default Usuario;