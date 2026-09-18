const DEFAULT_SEED_DATA = [
  {
    keyId: "ipr",
    title: "Intellectual Property Rights (IPR)",
    description: "Protect your brand, inventions, creative works, and designs with our expert IP advisory and filing.",
    icon: "Shield",
    sortOrder: 1,
    services: [
      { title: "Trademark Registration", sortOrder: 1 },
      { title: "Copyright Registration", sortOrder: 2 },
      { title: "Patent Filing & Advisory", sortOrder: 3 },
      { title: "Industrial Design Protection", sortOrder: 4 },
      { title: "IPR Opposition & Rectification", sortOrder: 5 },
    ],
  },
  {
    keyId: "incorporation",
    title: "Company Formation",
    description: "Incorporate your business legally with the right corporate structure for scaling and investor readiness.",
    icon: "Briefcase",
    sortOrder: 2,
    services: [
      { title: "Private Limited Company", sortOrder: 1 },
      { title: "Limited Liability Partnership (LLP)", sortOrder: 2 },
      { title: "One Person Company (OPC)", sortOrder: 3 },
      { title: "Partnership Firm", sortOrder: 4 },
      { title: "Sole Proprietorship", sortOrder: 5 },
      { title: "Section 8 / NGO / Trust", sortOrder: 6 },
    ],
  },
  {
    keyId: "licenses",
    title: "Company Licenses & Compliance",
    description: "Ensure absolute compliance and smooth operations with mandatory business registrations and licenses.",
    icon: "FileCheck",
    sortOrder: 3,
    services: [
      { title: "GST Registration & Returns", sortOrder: 1 },
      { title: "Shop & Establishment (Gumasta)", sortOrder: 2 },
      { title: "MSME / Udyam Registration", sortOrder: 3 },
      { title: "FSSAI Food License", sortOrder: 4 },
      { title: "Import Export Code (IEC)", sortOrder: 5 },
      { title: "Digital Signature Certificate (DSC)", sortOrder: 6 },
      { title: "ISO / CE / BIS Certifications", sortOrder: 7 },
    ],
  },
];

const DEFAULT_TURNOVERS = [
  { label: "Less than ₹20 Lakhs", sortOrder: 1 },
  { label: "₹20 Lakhs to ₹1 Crore", sortOrder: 2 },
  { label: "₹1 Crore to ₹5 Crores", sortOrder: 3 },
  { label: "₹5 Crores+", sortOrder: 4 },
];

export const seedDefaultQuoteConfig = async () => {
  const count = await prisma.quoteCategory.count();
  if (count === 0) {
    for (const cat of DEFAULT_SEED_DATA) {
      await prisma.quoteCategory.create({
        data: {
          keyId: cat.keyId,
          title: cat.title,
          description: cat.description,
          icon: cat.icon,
          sortOrder: cat.sortOrder,
          isActive: true,
          services: {
            create: cat.services.map((s) => ({
              title: s.title,
              sortOrder: s.sortOrder,
              isActive: true,
            })),
          },
        },
      });
    }
  }

  const turnCount = await prisma.turnoverOption.count();
  if (turnCount === 0) {
    for (const t of DEFAULT_TURNOVERS) {
      await prisma.turnoverOption.create({
        data: {
          label: t.label,
          sortOrder: t.sortOrder,
          isActive: true,
        },
      });
    }
  }
};

/* ============ CATEGORIES ============ */

export const getQuoteCategories = async () => {
  let categories = await prisma.quoteCategory.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    include: {
      services: {
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
      },
    },
  });

  if (categories.length === 0) {
    await seedDefaultQuoteConfig();
    categories = await prisma.quoteCategory.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      include: {
        services: {
          where: { isActive: true },
          orderBy: { sortOrder: "asc" },
        },
      },
    });
  }

  return categories;
};

export const getAdminQuoteCategories = async () => {
  const count = await prisma.quoteCategory.count();
  if (count === 0) {
    await seedDefaultQuoteConfig();
  }
  return await prisma.quoteCategory.findMany({
    orderBy: { sortOrder: "asc" },
    include: { services: { orderBy: { sortOrder: "asc" } } },
  });
};

export const createQuoteCategory = async (data) => {
  // Normalize keyId: lowercase, no spaces, fallback to slugified title if missing
  const keyId = (data.keyId || data.title || "").trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  return await prisma.quoteCategory.create({
    data: {
      keyId,
      title: data.title,
      description: data.description || "",
      icon: data.icon || "FiShoppingCart",
      sortOrder: parseInt(data.sortOrder) || 0,
      isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
    },
  });
};

export const updateQuoteCategory = async (id, data) => {
  const updateData = {};
  if (data.keyId !== undefined) {
    updateData.keyId = data.keyId.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  }
  if (data.title !== undefined) updateData.title = data.title;
  if (data.description !== undefined) updateData.description = data.description;
  if (data.icon !== undefined) updateData.icon = data.icon;
  if (data.sortOrder !== undefined) updateData.sortOrder = parseInt(data.sortOrder);
  if (data.isActive !== undefined) updateData.isActive = Boolean(data.isActive);

  return await prisma.quoteCategory.update({
    where: { id: parseInt(id) },
    data: updateData,
  });
};

export const deleteQuoteCategory = async (id) => {
  await prisma.quoteService.deleteMany({ where: { quoteCategoryId: parseInt(id) } });
  return await prisma.quoteCategory.delete({ where: { id: parseInt(id) } });
};

/* ============ SERVICES ============ */

export const getQuoteServices = async (categoryId) => {
  const where = { isActive: true };
  if (categoryId) where.quoteCategoryId = parseInt(categoryId);
  return await prisma.quoteService.findMany({
    where,
    orderBy: { sortOrder: "asc" },
    include: { category: { select: { id: true, keyId: true, title: true } } },
  });
};

export const getAdminQuoteServices = async () => {
  return await prisma.quoteService.findMany({
    orderBy: { sortOrder: "asc" },
    include: { category: { select: { id: true, keyId: true, title: true } } },
  });
};

export const createQuoteService = async (data) => {
  return await prisma.quoteService.create({
    data: {
      quoteCategoryId: parseInt(data.quoteCategoryId),
      title: data.title,
      sortOrder: parseInt(data.sortOrder) || 0,
      isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
    },
  });
};

export const updateQuoteService = async (id, data) => {
  const updateData = {};
  if (data.quoteCategoryId !== undefined) updateData.quoteCategoryId = parseInt(data.quoteCategoryId);
  if (data.title !== undefined) updateData.title = data.title;
  if (data.sortOrder !== undefined) updateData.sortOrder = parseInt(data.sortOrder);
  if (data.isActive !== undefined) updateData.isActive = Boolean(data.isActive);

  return await prisma.quoteService.update({
    where: { id: parseInt(id) },
    data: updateData,
  });
};

export const deleteQuoteService = async (id) => {
  return await prisma.quoteService.delete({ where: { id: parseInt(id) } });
};

/* ============ TURNOVER OPTIONS ============ */

export const getTurnoverOptions = async () => {
  return await prisma.turnoverOption.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });
};

export const getAdminTurnoverOptions = async () => {
  return await prisma.turnoverOption.findMany({
    orderBy: { sortOrder: "asc" },
  });
};

export const createTurnoverOption = async (data) => {
  return await prisma.turnoverOption.create({
    data: {
      label: data.label,
      sortOrder: parseInt(data.sortOrder) || 0,
      isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
    },
  });
};

export const updateTurnoverOption = async (id, data) => {
  const updateData = {};
  if (data.label !== undefined) updateData.label = data.label;
  if (data.sortOrder !== undefined) updateData.sortOrder = parseInt(data.sortOrder);
  if (data.isActive !== undefined) updateData.isActive = Boolean(data.isActive);

  return await prisma.turnoverOption.update({
    where: { id: parseInt(id) },
    data: updateData,
  });
};

export const deleteTurnoverOption = async (id) => {
  return await prisma.turnoverOption.delete({ where: { id: parseInt(id) } });
};
