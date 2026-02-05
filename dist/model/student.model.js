import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config.js";
export class Student extends Model {
    full_name;
    phone_number;
    profession;
    parent_name;
    parent_number;
    image_url;
    joinedAt;
    leftAt;
}
Student.init({
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
        allowNull: false,
    },
    profession: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    parent_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    parent_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    joinedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    leftAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    },
}, {
    tableName: "students",
    timestamps: true,
    sequelize,
});
//# sourceMappingURL=student.model.js.map