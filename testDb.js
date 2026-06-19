// import { PrismaClient } from "./generated/prisma/index.js";

// const prisma = new PrismaClient();

// async function test() {
//   try {
//     const users = await prisma.user.findMany();
//     console.log(users);
//   } catch (err) {
//     console.error(err);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// test();

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function test() {
  try {
    const users = await prisma.user.findMany();
    console.log(users);
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

test();