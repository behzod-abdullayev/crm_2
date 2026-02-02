import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config.js";
export class Bot extends Model {
    id;
    full_name;
    phone_number;
    chat_id;
    message;
}
Bot.init({
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
}, {
    tableName: "Bots",
    timestamps: true,
    sequelize,
});
//# sourceMappingURL=bot.model.js.map