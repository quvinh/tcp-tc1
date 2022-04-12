const net = require('net');
const readline = require('readline-sync')
const moment = require('moment')

const options = {
    port: 4000,
    host: '127.0.0.1'
}

const client = net.createConnection(options)
let timeOut = 5
client.on('connect', ()=>{
    client.write('Da ket noi')
    console.log('_______Client_______\n')
    console.log('Xin chao!\n')
    let tmrID = setInterval(() => {
        process.stdout.write(`\r=>Ket noi se dong (trong ${timeOut}s)`)
        if(timeOut>0) 
        {
            timeOut--
        } else {
            client.end()
            console.clear()
            console.log(`\n=> Da ngat ket noi voi server`)
            clearInterval(tmrID)
        }
    }, 1000)
})

// client.on('data', (data)=>{
//     console.log('```\n' + data)
//     // console.log(data)
//     sendLine()
// })

client.on('error', (err)=>{
    console.log(err.message)
})

function sendLine() {
    var line = readline.question(`Nhap du lieu(${timeOut}):\t`)
    if (line == "") {
        client.end()
    }else{
        client.write(line)
    }
}

