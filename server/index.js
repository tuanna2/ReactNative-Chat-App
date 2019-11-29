const express = require('express'),
    app = express(),
    http = require('http').createServer(app),
    io = require('socket.io')(http)
    bodyParser = require('body-parser'),
    morgan = require('morgan')

const UserData = {
    admin: {
        username: "admin",
        password: "admin",
        fullname: "Administrator"
    }
};

const messages = [{username:"admin", chatContent: "Hello world"}]

io.on('connection',socket => {
    socket.on('receive-all-messages', () => {
        socket.emit('receive-all-messages', messages);
    });
    socket.on('send-message', msg => {
        messages.push(msg);
        io.emit('receive-message', msg);
        socket.emit('sended');
    })
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.post('/login', (req, res) => {
    let body = req.body;
    body.username = body.username.toLowerCase();
    if(UserData[body.username]){
        UserData[body.username].password === body.password ?
            res.status(200).json({status: "success", data: UserData[body.username]})
            && console.log(`${body.username} Logged in`)
        :   res.status(400).json({status: "error", message: "Mật khẩu không chính xác"})
    }
    else res.status(400).json({status: "error", message: "Tài khoản không tồn tại"})
})
app.post('/signup', (req ,res) => {
    let body = req.body;
    body.username = body.username.toLowerCase();
    if(UserData[body.username])
        res.status(400).json({status: "error", message: "Tài khoản này đã tồn tại"})
    else{
        UserData[body.username] = body;
        res.status(200).json({status: "success", data: body})
        console.log("New User: ", body.username)
    }
})

http.listen(3000);