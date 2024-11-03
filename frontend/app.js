// for interaction of the website. it is only for frontend appearance and attractiveness.

const express = require('express');
const path = require('path');
const app = express();

// Обслуживание статических файлов из директории 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/how-it-works.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'how-it-works.html'));
});

app.get('/contact.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// video
const videoSources = ["/media/ai.mp4"];
// sources:
// Автор видео с Pexels: Chandresh Uike: https://www.pexels.com/ru-ru/video/28561594/

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});