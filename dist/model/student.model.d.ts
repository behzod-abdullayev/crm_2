import { Model } from "sequelize";
export declare class Student extends Model {
    full_name: string;
    phone_number: string;
    profession: string;
    parent_name: string;
    parent_number: string;
    image_url: string;
    joinedAt: Date;
    leftAt?: Date;
}
//# sourceMappingURL=student.model.d.ts.map