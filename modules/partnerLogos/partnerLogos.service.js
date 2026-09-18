import prisma from "../../config/prisma.js";

const DEFAULT_LOGOS = [
  { id: 1, name: "Airavat", image: "/img/airavat.png", sortOrder: 1, isActive: true },
  { id: 2, name: "Airpride", image: "/img/Airpride.png", sortOrder: 2, isActive: true },
  { id: 3, name: "Bakhla", image: "/img/Bakhla.png", sortOrder: 3, isActive: true },
  { id: 4, name: "BellWether", image: "/img/BellWether.png", sortOrder: 4, isActive: true },
  { id: 5, name: "Bhatkar", image: "/img/Bhatkar.png", sortOrder: 5, isActive: true },
  { id: 6, name: "Chheda", image: "/img/Chheda.png", sortOrder: 6, isActive: true },
  { id: 7, name: "Dhanak", image: "/img/Dhanak.png", sortOrder: 7, isActive: true },
  { id: 8, name: "Dimension", image: "/img/Dimension.png", sortOrder: 8, isActive: true },
  { id: 9, name: "FitsyFun", image: "/img/fistyfun.png", sortOrder: 9, isActive: true },
  { id: 10, name: "HUP", image: "/img/Hup.png", sortOrder: 10, isActive: true },
  { id: 11, name: "Jaynis", image: "/img/Jaynis.png", sortOrder: 11, isActive: true },
  { id: 12, name: "Phondaghat", image: "/img/Phondaghat.png", sortOrder: 12, isActive: true },
];

let tableChecked = false;
const ensureTableExists = async () => {
  if (tableChecked) return;
  try {
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS \`partner_logos\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`name\` VARCHAR(255) NOT NULL,
        \`image\` VARCHAR(500) NOT NULL,
        \`sortOrder\` INT DEFAULT 0,
        \`isActive\` TINYINT(1) DEFAULT 1,
        \`createdAt\` DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3),
        \`updatedAt\` DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Check existing logo names in database
    const existing = await prisma.$queryRawUnsafe(
      "SELECT `name` FROM `partner_logos`"
    );
    const existingNames = new Set(
      (existing || []).map((row) => (row.name || "").toLowerCase().trim())
    );

    // Insert any missing default logos into database so all logos exist together
    for (const logo of DEFAULT_LOGOS) {
      if (!existingNames.has(logo.name.toLowerCase().trim())) {
        await prisma.$executeRawUnsafe(
          "INSERT INTO `partner_logos` (`name`, `image`, `sortOrder`, `isActive`) VALUES (?, ?, ?, 1)",
          logo.name,
          logo.image,
          logo.sortOrder
        );
      }
    }

    tableChecked = true;
  } catch (err) {
    console.error("Error ensuring partner_logos table exists:", err.message);
  }
};

export const getPartnerLogos = async () => {
  await ensureTableExists();
  try {
    if (prisma.partnerLogo) {
      const list = await prisma.partnerLogo.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
      });
      if (list && list.length > 0) return list;
    }
    const rows = await prisma.$queryRawUnsafe(
      "SELECT * FROM `partner_logos` WHERE `isActive` = 1 ORDER BY `sortOrder` ASC"
    );
    if (rows && rows.length > 0) return rows;
    return DEFAULT_LOGOS;
  } catch (err) {
    console.error("Error in getPartnerLogos:", err.message);
    return DEFAULT_LOGOS;
  }
};

export const getAdminPartnerLogos = async () => {
  await ensureTableExists();
  try {
    if (prisma.partnerLogo) {
      const list = await prisma.partnerLogo.findMany({
        orderBy: { sortOrder: "asc" },
      });
      if (list && list.length > 0) return list;
    }
    const rows = await prisma.$queryRawUnsafe(
      "SELECT * FROM `partner_logos` ORDER BY `sortOrder` ASC"
    );
    if (rows && rows.length > 0) return rows;
    return DEFAULT_LOGOS;
  } catch (err) {
    console.error("Error in getAdminPartnerLogos:", err.message);
    return DEFAULT_LOGOS;
  }
};

export const createPartnerLogo = async (data) => {
  await ensureTableExists();
  const name = data.name || "";
  const image = data.image || "";
  const sortOrder = parseInt(data.sortOrder) || 0;
  const isActive = data.isActive !== undefined ? (data.isActive ? 1 : 0) : 1;

  try {
    if (prisma.partnerLogo) {
      return await prisma.partnerLogo.create({
        data: { name, image, sortOrder, isActive: Boolean(isActive) },
      });
    }
  } catch (err) {
    console.warn("Prisma model fallback to raw insert:", err.message);
  }

  await prisma.$executeRawUnsafe(
    "INSERT INTO `partner_logos` (`name`, `image`, `sortOrder`, `isActive`) VALUES (?, ?, ?, ?)",
    name,
    image,
    sortOrder,
    isActive
  );
  return { name, image, sortOrder, isActive };
};

export const updatePartnerLogo = async (id, data) => {
  await ensureTableExists();
  const numId = parseInt(id);
  const name = data.name || "";
  const image = data.image || "";
  const sortOrder = parseInt(data.sortOrder) || 0;
  const isActive = data.isActive !== undefined ? (data.isActive ? 1 : 0) : 1;

  try {
    if (prisma.partnerLogo) {
      return await prisma.partnerLogo.update({
        where: { id: numId },
        data: { name, image, sortOrder, isActive: Boolean(isActive) },
      });
    }
  } catch (err) {
    console.warn("Prisma model fallback to raw update:", err.message);
  }

  await prisma.$executeRawUnsafe(
    "UPDATE `partner_logos` SET `name` = ?, `image` = ?, `sortOrder` = ?, `isActive` = ? WHERE `id` = ?",
    name,
    image,
    sortOrder,
    isActive,
    numId
  );
  return { id: numId, name, image, sortOrder, isActive };
};

export const deletePartnerLogo = async (id) => {
  await ensureTableExists();
  const numId = parseInt(id);
  try {
    if (prisma.partnerLogo) {
      return await prisma.partnerLogo.delete({
        where: { id: numId },
      });
    }
  } catch (err) {
    console.warn("Prisma model fallback to raw delete:", err.message);
  }

  await prisma.$executeRawUnsafe(
    "DELETE FROM `partner_logos` WHERE `id` = ?",
    numId
  );
  return { id: numId };
};
