import { getNavbar } from './navbar.service.js';

export const getNavbarController = async (req, res) => {
  try {
    const data = await getNavbar();

    return res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: 'Something went wrong'
    });
  }
};