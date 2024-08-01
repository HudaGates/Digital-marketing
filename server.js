const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

const uploadDir = 'uploads/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, uploadDir)));

// Rute untuk unggahan file umum
app.post('/uploadFile', upload.single('fileInput'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ status: 'error', message: 'No file was uploaded.' });
    }

    const file = req.file;
    res.json({ 
        status: 'success', 
        files: [{ name: file.originalname, url: `/uploads/${file.filename}`, type: file.mimetype }] 
    });
});

// Rute untuk unggahan suara
app.post('/uploadAudio', upload.single('audioInput'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ status: 'error', message: 'No audio file was uploaded.' });
    }

    const file = req.file;
    res.json({ 
        status: 'success', 
        files: [{ name: file.originalname, url: `/uploads/${file.filename}`, type: file.mimetype }] 
    });
});

// Rute untuk unggahan gambar
app.post('/uploadImage', upload.single('imageInput'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ status: 'error', message: 'No image file was uploaded.' });
    }

    const file = req.file;
    res.json({ 
        status: 'success', 
        files: [{ name: file.originalname, url: `/uploads/${file.filename}`, type: file.mimetype }] 
    });
});

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
