import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  //@ts-expect-errorts-ignore
  if (!global.prisma) {
    //@ts-expect-errorts-ignore

    global.prisma = new PrismaClient();
  }
  //@ts-expect-errorts-ignore

  prisma = global.prisma;
}

export default prisma;
