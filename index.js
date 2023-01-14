const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hzxm3jt.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    try {
        const slidesCollection = client.db('simmiJobtask').collection('banner');
        const serviceCollection = client.db('simmiJobtask').collection('service');




        app.get('/banner', async (req, res) => {
            const query = {}
            const cursor = slidesCollection.find(query);
            const banners = await cursor.toArray();
            res.send(banners);
        });
        app.get('/service', async (req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });
        app.get('/service/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const query = { _id: ObjectId(id) };
            const service = await serviceCollection.findOne(query);
            res.send(service);
        });

       
    } finally {

    }
}



run().catch(err => console.error(err));

app.get('/', (req, res) => {
    res.send('simmi-jobtask server is running')
})

app.listen(port, () => {
    console.log(`simmi-jobtask  server running on ${port}`);
})