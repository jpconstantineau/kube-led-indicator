
const { SerialPort } = require('serialport')

// Create a port
const port = new SerialPort({
  path: '/dev/ttyACM0',
  baudRate: 57600,
})


 
var stdin        = process.openStdin();
 
port.on('error', function(err)  { console.log('Error: ', err.message)} )
port.on('data', function (data) { console.log('Data:  ', data.toString('utf8')) })
 
stdin.addListener("data", function(data) {
  //console.log(data.toString().trim());
  port.write(data);
});
