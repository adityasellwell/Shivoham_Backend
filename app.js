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
import faqRoutes from "./modules/faqs/faqs.routes.js";
import adminFaqRoutes from "./modules/admin/faqs/faqs.routes.js";
import quoteConfigRoutes from "./modules/quoteConfig/quoteConfig.routes.js";
import adminQuoteConfigRoutes from "./modules/admin/quoteConfig/quoteConfig.routes.js";
import partnerLogosRoutes from "./modules/partnerLogos/partnerLogos.routes.js";
import adminPartnerLogosRoutes from "./modules/admin/partnerLogos/partnerLogos.routes.js";
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "https://test.shivoham.biz",
      "https://shivoham.biz",
      "http://localhost:5173"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use('/api/navbar', navbarRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/quotes', quotesRoutes);
app.use('/api/consultations', consultationsRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/quote-config', quoteConfigRoutes);
app.use('/api/partner-logos', partnerLogosRoutes);


// ADMIN
app.use('/api/admin/', adminLoginRoute)
app.use('/api/admin/navbar', adminNavbarRoutes);
app.use('/api/admin/stats', adminStatsRoutes);
app.use('/api/admin/testimonials', adminTestimonialsRoutes);
app.use('/api/admin/quotes', adminQuotesRoutes);
app.use('/api/admin/consultations', adminConsultationsRoutes);
app.use('/api/admin/faqs', adminFaqRoutes);
app.use('/api/admin/quote-config', adminQuoteConfigRoutes);
app.use('/api/admin/partner-logos', adminPartnerLogosRoutes);

app.get('/', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'API Running'
  });
});

export default app;