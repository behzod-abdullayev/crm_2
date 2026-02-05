import { Student } from "../model/student.model.js";
import { Op } from "sequelize";
Student.sync({ force: false });
export const getAllStudents = async (req, res, next) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const search = req.query.search ? String(req.query.search).trim() : "";
        let whereClause = {};
        if (search) {
            whereClause = {
                [Op.or]: [
                    { full_name: { [Op.iLike]: `%${search}%` } },
                    { phone_number: { [Op.iLike]: `%${search}%` } },
                    { profession: { [Op.iLike]: `%${search}%` } },
                    { parent_name: { [Op.iLike]: `%${search}%` } },
                ],
            };
        }
        const { count, rows: students } = await Student.findAndCountAll({
            where: whereClause,
            offset,
            limit,
            raw: true,
            order: [['createdAt', 'ASC']]
        });
        // 5. Sahifalar sonini hisoblash
        const totalPage = Math.ceil(count / limit) || 0;
        // 6. Javob qaytarish
        return res.status(200).json({
            success: true,
            totalItems: count,
            totalPage,
            currentPage: page,
            prev: page > 1 ? { page: page - 1, limit } : null,
            next: page < totalPage ? { page: page + 1, limit } : null,
            students,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
export const getOneStudent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const student = await Student.findByPk(Number(id));
        if (!student) {
            return res.status(404).json({
                message: "student not found",
            });
        }
        res.status(200).json(student);
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
export const addStudent = async (req, res, next) => {
    try {
        const { full_name, phone_number, profession, parent_name, parent_number, image_url } = req.body;
        await Student.create({
            full_name,
            phone_number,
            profession,
            parent_name,
            parent_number,
            image_url,
            joinedAt: new Date(),
        });
        res.status(201).json({
            message: "created",
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
export const UpdateStudent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { full_name, phone_number, profession, parent_name, parent_number, image_url, leftAt, joinedAt } = req.body;
        const newId = Number(id);
        const foundedStudent = await Student.findByPk(newId);
        if (!foundedStudent) {
            return res.status(404).json({
                message: "student not found",
            });
        }
        await Student.update({ full_name, phone_number, profession, parent_name, parent_number, image_url, leftAt, joinedAt }, { where: { id: newId } });
        res.status(200).json({
            message: "updated",
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
export const deleteStudent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const newId = Number(id);
        const foundedStudent = await Student.findByPk(newId);
        if (!foundedStudent) {
            return res.status(404).json({
                message: "student not found",
            });
        }
        await Student.destroy({ where: { id: newId } });
        res.status(200).json({
            message: "deleted",
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
export const leftStudent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const newId = Number(id);
        const foundedStudent = await Student.findByPk(newId);
        if (!foundedStudent) {
            return res.status(404).json({
                message: "student not found",
            });
        }
        await Student.update({ leftAt: new Date() }, { where: { id: newId } });
        res.status(200).json({
            message: "left student",
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};
//# sourceMappingURL=student.controller.js.map