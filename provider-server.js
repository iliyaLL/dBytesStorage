const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');
const path = require('path');
const process = require('process');

const server = http.createServer();
const io = socketIo(server, {
    cors: {
        origin: ['http://10.42.0.114:3000', 'http://localhost:3000'],
        methods: ["GET", "POST"],
        credentials: true
    }
});

const args = require('minimist')(process.argv.slice(2));
const PORT = args.port || -1;
const uploadDir = path.resolve(process.cwd(), 'uploaded_files');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Обработчик подключений
io.on('connection', (socket) => {
    console.log('Провайдер подключен');

    // Обработка события загрузки файла
    socket.on('upload-file', (fileName, fileData) => {
        console.log(`Получен файл: ${fileName}`);

        fs.writeFile(`./uploaded_files/${fileName}`, fileData, (err) => {
            if (err) {
                console.log('Ошибка при сохранении файла', err);
                socket.emit('upload-status', 'Ошибка при загрузке файла');
            } else {
                console.log('Файл успешно загружен');
                socket.emit('upload-status', 'Файл успешно загружен');
            }
        });
    });

    socket.on('download-file', (fileName) => {
        console.log(`Запрос на скачивание файла: ${fileName}`);
        const filePath = path.join(uploadDir, fileName);

        if (fs.existsSync(filePath)) {
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    console.log('Ошибка при чтении файла', err);
                    socket.emit('download-status', 'Ошибка при скачивании файла');
                } else {
                    console.log('Файл отправлен');
                    socket.emit('file-data', { fileName, data });
                }
            });
        } else {
            console.log('Файл не найден');
            socket.emit('download-status', 'Файл не найден');
        }
    });

    socket.on('disconnect', () => {
        console.log('Провайдер отключен');
    });
});

server.listen(PORT, () => {
    console.log(`Сервер провайдера слушает на порту ${PORT}`);
});
