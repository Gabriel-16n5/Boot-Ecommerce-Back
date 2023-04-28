import bcrypt  from 'bcrypt'
import db from '../database/database.connection.js';
import { v4 as uuid } from 'uuid';
import dayjs from "dayjs";

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
        const object = {
            name:user.name,
            token:token,
            idUser: user._id,
            date: dayjs().format('DD/MM/YY'),
            exactTime: Date.now()
        }
        await db.collection("sessions").insertOne(object)
        res.status(200).send(object)
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function sessionVerification (req, res) {
    const {authorization} = req.headers;
    if(!authorization) return res.status(401).send("unauthorized access");
    const token = authorization?.replace("Bearer ", "")
    try{
        const session = await db.collection("sessions").findOne({token});
        if(!session) return res.status(401).send("invalid token")
        const {name, idUser, date, exactTime} = session;
        res.send(session)
    } catch (erro) {
        return res.status(500).send(erro.message)
    }
    
}