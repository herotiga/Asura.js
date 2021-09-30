const request = require('request');
const cheerio = require('cheerio');
const readline = require('readline');
const fs = require('fs');
let url;

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('请输入要爬取的url:');

rl.question('url:', function(res) {
    url = res;
    rl.close();
});

rl.on('close', function() {
    console.log('正在爬取...');
    console.time('爬取耗时');
    request(url, (err, res) => {
        if (err) {
            console.log('创建输出目录错误' + '' + err);
        } else {
            console.log('爬取成功！');
            console.timeEnd('爬取耗时');
            let $ = cheerio.load(res.body);
            let DOM = $('html').prop('outerHTML');
            let now = new Date().getTime();
            console.log('正在写入文件...');
            console.time('写入耗时');
            fs.writeFile('./output/output_'+ now + '.html', DOM, function(err) {
                if (err !== null) {
                    console.log('写入失败，错误信息：' + err);
                } else {
                    console.log('写入成功！');
                    console.timeEnd('写入耗时');
                    console.log('文件路径：' + __dirname + '/output/output_' + now + '.html');
                }
            });
        }
    });
});