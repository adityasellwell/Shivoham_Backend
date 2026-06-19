import prisma from '../../config/prisma.js';

export const getNavbar = async () => {
  const menus = await prisma.navbarItem.findMany({
    where: {
      isActive: true,
      parentId: null,
    },
    include: {
      children: {
        where: {
          isActive: true,
        },
        orderBy: {
          sortOrder: "asc",
        },
      },
    },
    orderBy: {
      sortOrder: "asc",
    },
  });

  return menus.map((menu) => ({
    name: menu.title,
    dropdown: menu.slug,
    path: menu.url,
    items: menu.children.map((child) => ({
      name: child.title,
      path: child.url,
    })),
  }));
};