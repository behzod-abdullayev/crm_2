import type { NextFunction, Request, Response } from "express"
import { Student } from "../model/student.model.js"
import type { CreateStudentDto, UpdateStudentDto } from "../dto/student.dto.js"


Student.sync({force: false})

 export const getAllStudents = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const student = await Student.findAll()
        res.status(200).json(student)
    } catch (error: any) {
       return res.status(500).json({
            message: error.message
        })
    }
}

export const getOneStudent = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const {id} = req.params
        const student = await Student.findByPk(Number(id as string))

        if(!student) {
            return res.status(404).json({
                message: "student not found"
            })
        }
        res.status(200).json(student)
    } catch (error: any) {
       return res.status(500).json({
            message: error.message
        })
    }
}

export const addStudent = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const {full_name, phone_number, profession, parent_name, parent_number, image_url} = req.body as CreateStudentDto
        await Student.create({full_name, phone_number, profession, parent_name, parent_number, image_url})
        res.status(201).json({
            message: "created"
        })
    } catch (error: any) {
       return res.status(500).json({
            message: error.message
        })
    }
}

export const UpdateStudent = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const {id} = req.params
        const {full_name, phone_number, profession, parent_name, parent_number, image_url} = req.body as UpdateStudentDto
        const newId = Number(id as string)
        const foundedStudent = await Student.findByPk(newId)

        if(!foundedStudent) {
            return res.status(404).json({
                message: "student not found"
            })
        }

        await Student.update({full_name, phone_number, profession, parent_name, parent_number, image_url}, {where: {id: newId}})
        res.status(200).json({
            message: "updated"
        })
    } catch (error: any) {
       return res.status(500).json({
            message: error.message
        })
    }
}

export const deleteStudent = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const {id} = req.params
        const newId = Number(id as string)
        const foundedStudent = await Student.findByPk(newId)

        if(!foundedStudent) {
            return res.status(404).json({
                message: "student not found"
            })
        }

        await Student.destroy({where: {id: newId}})
        res.status(200).json({
            message: "deleted"
        })

    } catch (error: any) {
       return res.status(500).json({
            message: error.message
        })
    }
}