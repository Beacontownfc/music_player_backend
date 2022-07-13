const fs = require('fs');
const express = require('express');
var iconv = require('iconv-lite');
const json_fs = require('jsonfile');

const router = express.Router();


router.post('/api/lrc', (req, res) => {
    const {id} = req.body;
    let music_data = json_fs.readFileSync('./data/music_info.json'); // 模拟链接数据库
    let item = music_data.find((item => {   //模拟数据库查询
        return item.id == id;
    }))

    let file = fs.readFileSync(item.lrc, {encoding:'binary'});
    let str = iconv.decode(file, 'gbk');
    str = str.substring(str.indexOf('[00:00.00]'), str.length);
    res.send({name: item.name, lrc: str, author: item.author, group: item.group});
})

router.post('/api/picture', (req, res) => {
    const { id } = req.body;
    let music_data = json_fs.readFileSync('./data/music_info.json');
    let item = music_data.find((item => {
        return item.id == id;
    }))
    if(item) {
        item.code = 0;
        item.msg = '请求成功';
        res.send(item);
    }
    else res.send({code: 1, msg: '未找到该id的音乐'});
})

module.exports = router;