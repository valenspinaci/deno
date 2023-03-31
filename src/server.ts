import { Application, config, Context } from "../depts.ts";
import { productRouter } from "./routes/product.routes.ts";

console.log(config())
const {PORT} = config();
const port = parseInt(PORT)

//Crear aplicacion del servidor de oak
const app = new Application();

app.use((ctx:Context)=>{
    ctx.response.body = "Hello from oak server"
});
app.use(productRouter.routes())

await app.listen({port});
console.log(`Server listening on port ${port}`)