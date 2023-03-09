const { SerialPort } = require('serialport')
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

// Create a port
  port = new SerialPort({
  path: path,
  baudRate: 57600,
  });


var stdin        = process.openStdin();

port.on('error', function(err)  { console.log('Error: ', err.message)} )
port.on('data', function (data) { console.log('Data:  ', data.toString('utf8')) })

stdin.addListener("data", function(data) {
  //console.log(data.toString().trim());
  port.write(data);
});
