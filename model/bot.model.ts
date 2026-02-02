import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config.js";

export class Bot extends Model {
  public id!: number;
  public full_name!: string;
  public phone_number?: string;
  public chat_id?: bigint;
  public message!: string;
}

Bot.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    chat_id: {
      type: DataTypes.BIGINT, 
      allowNull: true,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Bots",
    timestamps: true,
    sequelize,
  },
);