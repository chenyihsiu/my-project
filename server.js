const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const app = express();
const port = 3000;

// 替换为你的 Channel Access Token
const CHANNEL_ACCESS_TOKEN = 'S/t3v5qVYgMKvYNrw72OUoHYF9XQswIg6n4jQheknjMhC9m/XSbG32nCPIW1NCjUkkJEdc13TVJSoOKv/lJJ+Ff9tnovrG5iWOX3mWQQsKniBauiC3Q09r8uBhBowK6Ovvf8ZZlLwVKZEXw53vgUxgdB04t89/1O/w1cDnyilFU=';


// 使用 CORS 中间件
app.use(cors());

// 获取用户资料的 API 端点
app.get('/api/user-profile/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const response = await axios.get(`https://api.line.me/v2/bot/profile/${userId}`, {
            headers: {
                'Authorization': `Bearer ${CHANNEL_ACCESS_TOKEN}`
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).send('Error fetching user profile');
    }
});

// 提供静态文件
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 启动服务器
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
