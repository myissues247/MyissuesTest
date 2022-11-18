const express=     require('express');
const path=        require("path");
const bodyParser=  require('body-parser');
const cors=        require('cors');

//create express
const app = express();

//CORS Middleware
app.use(cors());

//parse requests of content-type - application/json
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
 
// For production
app.use(express.static(__dirname + '/public/Frontend'));

app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, 'public/Frontend/index.html'))
})

//Start server
const port= process.env.PORT || 3000;
app.listen(port, function(){
    console.log("Server start on port", port)
});
