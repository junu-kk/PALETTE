var upload = multer({dest: "./uploads"});
var mongo = require('mongodb');
var Grid = require("gridfs-stream");
Grid.mongo = mongo;

router.post('/:id', upload.array('photos', 200), function(req, res, next){
gfs = Grid(db);
var ss = req.files;
   for(var j=0; j<ss.length; j++){
     var originalName = ss[j].originalname;
     var filename = ss[j].filename;
     var writestream = gfs.createWriteStream({
         filename: originalName
     });
    fs.createReadStream("./uploads/" + filename).pipe(writestream);
   }
});