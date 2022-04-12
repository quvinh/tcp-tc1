const net = require('net');
const moment = require('moment')
const server = net.createServer()
var time = moment().format('ss')
var array = []

server.on('connection', (socket)=>{
    socket.on('data', (data)=>{
        console.log('\n*****\n=>Client IP:' + socket.remoteAddress.substring(7) + ' PORT:' + socket.remotePort + '\n=>Data: ' + data + '\n*****')
        // socket.write('=> Them du lieu tu IP:' + socket.remoteAddress + ' PORT: ' + socket.remotePort)
        countConn()
        console.log(`__________\n|\n|\tKet noi/Ket noi cung IP:\n|\t${array.length} / ${array.map(ip => ip.ip === socket.remoteAddress.substring(7)).length}\n|__________`)
    })

    socket.on('close', ()=>{
        if(array.length>0) {
            console.log('\n- IP:' + socket.remoteAddress.substring(7) + ' PORT:' + socket.remotePort + ' - Ngat ket noi!')
            array = array.filter(ip => ip.port !== socket.remotePort)
        }
        console.log(`__________\n|\n|\tKet noi/Ket noi cung IP:\n|\t${array.length} / ${array.map(ip => ip.ip === socket.remoteAddress.substring(7)).length}\n|__________`)
    })

    socket.on('error', (err)=>{
        console.log(err.message)
    })

    function countConn() {
        array && !array.map(ip => ip.port).includes(socket.remotePort) && array.push({
            ip: socket.remoteAddress.substring(7),
            port: socket.remotePort
        })
    }
    
})

server.listen(4000, ()=>{
    // console.log('==>Server dang hoat dong o PORT:', server.address().port)
    console.log('_______Server_______')
    let timeLog = ''
    process.stdout.write(`Loading ...`)

    let tmrID = setInterval(() => {
        timeLog = moment().format('hh:mm:ss a')
        process.stdout.write(`\r=>Thoi gian: ${timeLog} - Ket noi dang xu ly: ${array.length}`)
        timeLog = moment().format('hh:mm:ss a')
    }, 1000)
})

