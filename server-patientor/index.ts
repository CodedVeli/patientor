import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import { Patient } from './models';
import dotenv from 'dotenv';

dotenv.config();

const app = express();


app.use(express.json());
app.use(cors())
const PORT = 3000;

mongoose.set('strictQuery', false);
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error('MONGO_URI must be defined in the environment variables');
}
mongoose.connect(mongoUri,
    { dbName: "patientor" }).then(() => {
        console.log("Connected to database");
    }).catch((err) => {
        console.log("error connecting to MDB", err);
    }
    );
app.get('/api/patients', async (_req, res) => {
    const allPatients = await Patient.find({})

    return res.status(200).json(allPatients);

});

app.post('/api/patients', async (req, res) => {
    try {
        const { name, 
                occupation,
                ssn,
                dateOfBirth,
                gender } = req.body;

        const existingUser = await Patient.findOne({ name });
        if (existingUser) {
            return res.status(400).json({ message: "name already registered" });
          }
          const patient = new Patient({
            name, 
            occupation,
            ssn,
            dateOfBirth,
            gender})

            await patient.save();
            return res.status(201).json({ message: "Patient created successfully" });
    } catch(error: unknown) {
        return res.status(500).json({ message: "An error occurred",  error });

    }
})

app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
  });
  

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});