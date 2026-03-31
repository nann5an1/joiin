import prisma from "../database/prismaClient.js";

export async function loginModel(data) {
    const { email } = data;
    const result = await prisma.user.findUnique({
        where: { email },
        select: { id: true, name: true, password: true }
    });
    console.log("result in loginModel", result);
    // Return as array to preserve existing controller behaviour
    return result ? [result] : [];
}
