import jwt from "jsonwebtoken";
import { headers } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}

export const verifyToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
        return decoded.id;
    } catch (error) {
        return null;
    }
};

export const getUserIdFromRequest = async () => {
    const headersList = await headers();
    const authHeader = headersList.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
        return null;
    }

    return verifyToken(token);
};

export const createToken = (userId: number) => {
    return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "30d" });
};
