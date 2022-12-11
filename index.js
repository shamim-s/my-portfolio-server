const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.zn49gp5.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const projectsCollection = client.db('myPortfolio').collection('projectsCollection');

        app.get('/projects', async(req, res) => {
            const query = {};
            const result = await projectsCollection.find(query).toArray();
            res.send(result);
        })

        app.get('/project/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)}
            const result = await projectsCollection.findOne(query);
            res.send(result);
        })
    }
    catch{

    }
}
run().catch(err => console.error(err));


app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(port, () => {
    console.log('server listening on port ' + port);
})