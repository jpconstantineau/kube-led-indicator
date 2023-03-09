const { SerialPort } = require('serialport')

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.send('Hello There! Send a post request with the right data! #LLRRGGBB-TTTT\n')
})



const args = process.argv;

path = '/dev/ttyACM0';
apiport = 8888;

// update port settings
  if (process.argv.length === 3) {
    path = args[2];
  }

  if (process.argv.length === 4) {
    path = args[2];
    apiport = args[3];
  }

// Create a serial port
  port = new SerialPort({
  path: path,
  baudRate: 57600,
  });


port.on('error', function(err)  { console.log('Error: ', err.message)} )
port.on('data', function (data) { console.log('Data:  ', data.toString('utf8')) })

app.post('/', (req, res) => {
    let data = req.body;
    console.log(req.body.command);
    port.write(data.command);
    port.write("\n");
    res.send('Request Received');
})

app.put('/', (req, res) => {
    let data = req.body;
    console.log(req.body.command);
    port.write(data.command);
    port.write("\n");
    res.send('Request Received');
})


app.listen(apiport, () => {
  console.log('API app listening')
})

