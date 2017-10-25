const express = require('express');
const app = express();
const port = 8086;
const fs = require('fs');

var entityMap = {
    "&":"&amp;",
    "<":"&lt;",
    ">":"&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
};
    
function escapeHtml(string) {
    return String(string).replace(/[&<>"'/]/g, function (s) {
        return entityMap[s];
    });
}



app.use(express.static(__dirname));

app.get('/',function(req,res){
    res.sendFile('index.html');
});


var line;
fs.readFile('youtube.txt','utf8',function(err,data){
    line = data.split('\n');
});
var lastUpdate = new Date();
//console.log(lastUpdate.getMinutes());

app.get('/video',function(req,res){
    var now = new Date();
    if(now.getHours() > lastUpdate.getHours() || now.getDay() > lastUpdate.getDay() || now.getMonth() > lastUpdate.getMonth()){
        //console.log('now'+now.getTime());
        //console.log('last'+lastUpdate.getTime());
        fs.readFile('youtube.txt','utf8',function(err,data){
            line = data.split('\n');
        });
    }
    var randInt = Math.round((Math.random()*49));
    res.send(line[randInt]);
});

app.get('/chat',function(req,res){
    var a = req.query.a;
    var content = '';
    var chat_file;
    fs.appendFile('chat.txt',a + '<br>','utf8',function(err){
        fs.readFile('chat.txt','utf8',function(err,data){
            content = escapeHtml(data);
            res.send(content);
            //console.log(content);
        });
    });
});

app.get('/chat_content',function(req,res){
    var content = '';
    fs.readFile('chat.txt','utf8',function(err,data){
        content = escapeHtml(data);
        res.send(content);
        //console.log(content);
    });
});

app.listen(port);