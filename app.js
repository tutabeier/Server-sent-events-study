import express from 'express';

const app = express();
const port = 3000;

app.use(express.static(__dirname));

var testdata = {
  msg: "It works"
};

app.get('/events', (req, res) => {
  /*
   * Adds headers to create connection which will send the events
   */
  res.writeHead(200, {
    'Connection': 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache'
  });

  /*
   * Every 1 second, send the same message. We will stringify the
   * object to generate a JSON. This JSON will be parsed in the front end.
   */
  setInterval(function(){
    res.write('data: ' + JSON.stringify(testdata) + '\n\n');
  }, 1000);
});

app.get('/', (req, res) => {
  // Just serves the index
  res.sendFile('index.html');
});

app.listen(port, () => {
  console.log("Listening %s", port);
});
