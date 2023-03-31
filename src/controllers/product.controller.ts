import { Context, helpers, config, MongoClient, ObjectId } from "../../depts.ts";
import { productRouter } from "../routes/product.routes.ts";
import { Product } from "../types/product.ts";

const {MONGO_URL, DATABASE_NAME} = config()

const client = new MongoClient();
try {
    await client.connect(MONGO_URL)
    console.log("Conexion a la base de datos exitosa")
} catch (error) {
    console.log(error)
}

const db = client.database(DATABASE_NAME);
const productModel = db.collection<Product>("product")

const products:Product[]=[]

export const findProduct = async(ctx:Context)=>{
    try {
        const products = await productModel.find().toArray()
        ctx.response.status = 200;
        ctx.response.body = {status:"success", data:products}
    } catch (error) {
        ctx.response.status = 401;
        ctx.response.body = `Hubo un error ${error}`
    }
}

export const findProductById = async(ctx:Context)=>{
    try {
        const {id} = helpers.getQuery(ctx, {mergeParams:true});
        const product = await productModel.findOne({_id: new ObjectId(id)})
        ctx.response.status = 200;
        ctx.response.body = {status:"success", data:product}
    } catch (error) {
        ctx.response.status = 401;
        ctx.response.body = `Hubo un error ${error}`
    }
}

export const createProduct = async(ctx:Context)=>{
    try {
        const body = await ctx.request.body().value;
        const productCreated = await productModel.insertOne(body)
        ctx.response.status = 200;
        ctx.response.body = {status:"success",data:productCreated, message:"Product created"}
    } catch (error) {
        ctx.response.status = 401;
        ctx.response.body = `Hubo un error ${error}`
    }
}

export const updateProduct = async(ctx:Context)=>{
    try {
        const body = await ctx.request.body().value
        const {id} = helpers.getQuery(ctx, {mergeParams:true});
        const product = await productModel.updateOne({_id: new ObjectId(id)}, body)
        ctx.response.status = 200;
        ctx.response.body = {status:"success",data:product, message:"Producto eliminado"}
    } catch (error) {
        ctx.response.status = 401;
        ctx.response.body = `Hubo un error ${error}`
    }
}

export const deleteProduct = async(ctx:Context)=>{
    try {
        const {id} = helpers.getQuery(ctx, {mergeParams:true});
        const product = await productModel.deleteOne({_id: new ObjectId(id)})
        ctx.response.status = 200;
        ctx.response.body = {status:"success",data:product, message:"Producto eliminado"}
    } catch (error) {
        ctx.response.status = 401;
        ctx.response.body = `Hubo un error ${error}`
    }
}