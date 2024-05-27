
const Photo = require("../models/Photos")
//לפי קריטריונים
const getAllPhotos = async (req, res) => {
    try {
        const photos = await Photo.find().lean()
        if (!photos?.length) {
            return res.send(null)
        }
        res.json(photos)
    }
    catch (err) {
        console.log(err);
    }
}

const createNewPhoto = async (req, res) => {
    try {
        const { title } = req.body
        console.log("imageUrl");
        const imageUrl = (req.file?.filename ? req.file.filename : "")
        console.log(imageUrl);
        if (!title)
            return res.status(400).json({ message: 'title is required' })
        const newPhoto = await Photo.create({ title, imageUrl })
        if (newPhoto) {
            return res.status(201).json({ message: 'New photo created' })
        }
        else {
            return res.status(400).json({ message: 'Invalid photo' })
        }
    }
    catch (err) {
        console.log(err);
    }
}

const updatePhoto = async (req, res) => {
    try {
        const { _id, title, imageUrl } = req.body
        if (!_id || !title) {
            return res.status(400).json({ message: 'fields are required' })
        }
        const photo = await Photo.findById(_id).exec()
        if (!photo) {
            return res.status(400).json({ message: 'Photo not found' })
        }
        photo.title = title
        photo.imageUrl = imageUrl


        const updatedPhoto = await photo.save()
        res.json(`'${updatedPhoto.title}' updated`)
    }
    catch (err) {
        console.log(err);
    }
}

const deletePhoto = async (req, res) => {
    try {
        const { id } = req.params
        const photo = await Photo.findById(id).exec()
        if (!photo) {
            return res.status(400).json({ message: 'Photo not found' })
        }
        const result = await photo.deleteOne()
        const reply = `Photo '${result.title}' ID ${result._id} deleted`
        res.json(reply)
    }
    catch {
        return res.status(404).json({ message: 'not found' })
    }
}

module.exports = {
    createNewPhoto,
    getAllPhotos,
    updatePhoto,
    deletePhoto,
}





