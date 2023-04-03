import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import "module-alias/register";

export const dbclient = new PrismaClient();
import { authRouter } from "./routes/auth";
import { userRouter } from "./routes/user";

const PORT = process.env.PORT || 5000;

async function main() {
    const app = express();
    app.use(express.json());
    app.use(
        cors({
            origin: ["https://hoppscotch.io", "http://localhost:3000"],
        })
    );
    app.use("/api/v1/auth", authRouter);
    app.use("/api/v1/user", userRouter);

    app.get("/", (__, rs) => {
        rs.json({
            app: "running",
        });
    });

    app.listen(PORT, () => {
        console.log("running on port ", PORT);
    });
}

main()
    .catch((e) => {
        throw e;
    })
    .finally(async () => {
        await dbclient.$disconnect();
    });
