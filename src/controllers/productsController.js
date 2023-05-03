import db from '../database/database.connection.js';


export async function getProducts(req, res) {
    
    try{
        const listProducts = await db.collection("products").find().toArray()
        res.status(200).send(listProducts)
        } catch (err) {
        return res.status(500).send(err.message);
        }
}

export async function postProducts(req, res) {
    
    try{
        await db.collection("products").insertOne(req.body)
        res.sendStatus(201)
        } catch (err) {
        return res.status(500).send(err.message);
        }
}

