import type { NextFunction, Request, Response } from "express";
export declare const getAllStudents: (req: Request, res: Response, next: NextFunction) => Promise<Response>;
export declare const getOneStudent: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
export declare const addStudent: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
export declare const UpdateStudent: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
export declare const deleteStudent: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
export declare const leftStudent: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
//# sourceMappingURL=student.controller.d.ts.map