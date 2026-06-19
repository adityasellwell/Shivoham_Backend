import express from 'express';
import navbarRoutes from './modules/navbar/navbar.routes.js';
import statsRoutes from './modules/stats/stats.routes.js';
import testimonialRoutes from './modules/testimonials/testimonial.routes.js';
import quotesRoutes from './modules/quotes/quotes.routes.js';
import consultationsRoutes from './modules/consultations/consultations.routes.js';
import adminNavbarRoutes from './modules/admin/navbar/navbar.routes.js'
import searchRoutes from "./modules/tradeMarkSearch/search.routes.js";
import adminStatsRoutes from './modules/admin/stats/stats.routes.js';
import adminTestimonialsRoutes from './modules/admin/testimonials/testimonials.routes.js';
import adminQuotesRoutes from './modules/admin/quotes/quotes.routes.js';
import adminConsultationsRoutes from './modules/admin/consultations/consultations.routes.js';
import adminLoginRoute from "./modules/admin/login/login.routes.js"
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }))

app.use('/api/navbar', navbarRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/quotes', quotesRoutes);
app.use('/api/consultations', consultationsRoutes);
app.use('/api/search',searchRoutes);


// ADMIN
app.use('/api/admin/',adminLoginRoute)
app.use('/api/admin/navbar', adminNavbarRoutes);
app.use('/api/admin/stats', adminStatsRoutes);
app.use('/api/admin/testimonials', adminTestimonialsRoutes);
app.use('/api/admin/quotes', adminQuotesRoutes);
app.use('/api/admin/consultations', adminConsultationsRoutes);
app.get('/', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'API Running'
  });
});

export default app;