import { akcje } from "./akcje.js";
import { Router } from 'express';

const myRouter = Router();

myRouter.get('/products/', akcje.getAllProducts);

myRouter.get('/products/:id', akcje.getProductById);

myRouter.post('/products/', akcje.createProduct);

myRouter.put('/products/:id', akcje.updateProduct);

myRouter.delete('/products/:id', akcje.deleteProduct);

myRouter.put('/products/zmianaCeny/:wartosc', akcje.changePrice);

export default myRouter;
