require('dotenv').config();

const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors')
const { init_database } = require("./src/connection");
const { routes } = require("./src/routes");
const fs = require("fs");
const { upload } = require("./src/services/cloudinary.service");
const cloudinary = require('./src/services/cloudinary.service')
const { saveImage } = require("./src/services/image.service");


const PORT = process.env.PORT;

const app = express();
app.use(bodyParser.json());
app.use(cors())
app.use(express.static('../client/'));
routes(app);
//init_database()
const server = app.listen(
    PORT, () => console.log(`Server Listening on port ${PORT}`)
);
server.timeout = 10000;

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.use('/upload-images', upload.array('image'), async(req, res) => {
    const cat = req.query.category
    const uploader = async(path) => await cloudinary.uploads(path, cat);
    const categories = ["rooms", "culinary", "activities", "local", "tour"];
    if (categories.includes(cat)) {
        if (req.method === 'POST') {
            const urls = []
            const files = req.files;
            for (const file of files) {
                const { path } = file;
                const newPath = await uploader(path)
                urls.push(newPath)
                fs.unlinkSync(path)
                const im = {
                    path: newPath.url,
                    category: cat,
                    imageId: newPath.id,
                    title: req.body.title,
                    description: req.body.description
                }
                await saveImage(im)
            }
            res.status(200).json({
                message: 'images uploaded successfully',
                data: urls
            })

        } else {
            res.status(405).json({
                err: `${req.method} method not allowed`
            })
        }
    } else {
        res.status(405).json({
            err: `The following category ${category} does not exist`
        })
    }

})
