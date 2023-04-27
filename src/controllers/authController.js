import bcrypt  from 'bcrypt'
import db from '../database/database.connection.js';
import { v4 as uuid } from 'uuid';

export async function signUp(req, res) {
    const {name,email,password} =req.body
    const hash = bcrypt.hashSync(password, 10);
    try{
        await db.collection("signup").insertOne({name,email,password:hash})
        res.sendStatus(201)
        } catch (err) {
        return res.status(500).send(err.message);
        }
}

export async function signIn(req, res) {
    const {email,password} =req.body
    try{
        const user = await db.collection("signup").findOne({ email: email })
        if (!user) return res.status(404).send("Email nao cadastrado")
        if (!bcrypt.compareSync(password, user.password)) return res.status(401).send("Senha incorreta, verifique sua senha")
        const token = uuid();
        const object = {name:user.name,token:token}
        res.status(200).send(object)
    } catch (err) {
        return res.status(500).send(err.message);
    }
}