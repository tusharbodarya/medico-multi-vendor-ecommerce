import express from 'express';
import dotenv from 'dotenv';
import { dbConnect } from './src/utils/utils.js';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import { errorHandler, notFoundErrorHandler } from './src/middlewares/errorHandler.js';
import userRouter from './src/routes/api/userRoutes.js';
import vendorRouter from './src/routes/api/vendorRoutes.js';
import productRouter from './src/routes/api/productRoutes.js';
import categoryRouter from './src/routes/api/categoryRoutes.js';
import subCategoryRouter from './src/routes/api/subCategoryRoutes.js';
import wishlistRouter from './src/routes/api/wishlistRoutes.js';

// Load environment variables
dotenv.config();

// Connect to the database
dbConnect();

const app = express();

// Middleware setup
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// Api routes
app.use('/api/users', userRouter);
app.use('/api/vendors', vendorRouter);
app.use('/api/products', productRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/subcategories', subCategoryRouter);
app.use('/api/wishlists', wishlistRouter);




// Error handling middleware
app.use(notFoundErrorHandler);
app.use(errorHandler);





// Starting the server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});