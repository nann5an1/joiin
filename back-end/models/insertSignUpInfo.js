import prisma from "../database/prismaClient.js";
import bcrypt from "bcryptjs";

export async function signUpModel(data) {
    const { name, email, password } = data;

    const existingCount = await prisma.user.count({ where: { email } });
    if (existingCount > 0) {
        return { success: false, msg: "Email already exists" };
    }

    const saltRounds = 11;
    try {
        const hashed = await bcrypt.hash(password, saltRounds);
        if (hashed.length > 0) {
            console.log("hashed password", hashed);
            const result = await prisma.user.create({
                data: { name, email, password: hashed }
            });
            console.log(result);
            return { success: true, result };
        }
    } catch (error) {
        console.error("Error in hashing password", error);
        throw error;
    }
}
