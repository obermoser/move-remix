import { withAccelerate } from '@prisma/extension-accelerate';
import { PrismaClient } from "@prisma/client";
let prisma: PrismaClient;

declare global {
    let prisma: PrismaClient;
}

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
// in production we'll have a single connection to the DB.
if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient().$extends(withOptimize({ apiKey: process.env.PRISMA_OPTIMIZE_KEY as string })).$extends(withAccelerate());
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient().$extends(withAccelerate());
        //$extends(withOptimize({ apiKey: process.env.PRISMA_OPTIMIZE_KEY as string }))
    }
    prisma = global.prisma;
    prisma.$connect();
}

export { prisma };