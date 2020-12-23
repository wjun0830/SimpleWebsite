
var cookieParser = require('cookie-parser');
var JSAlert = require("js-alert");
var async = require('async');
var express = require('express');
var path = require('path')
var qs = require('querystring');
var mysql = require('mysql');
var http = require('http');
const PORT = 2080;
const app = express();
const server = http.createServer(app);
var io = require('socket.io').listen(server);
const dbconfig = require('./config/database.js')
const connection = mysql.createConnection(dbconfig);

// const fileUpload = require('expr ess-fileupload');
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use('/static', express.static(__dirname + '/'));
app.use(cookieParser());
connection.connect();
// app.use('/upload', express.static('/static/upload'));
// app.use(fileUpload());
var multer = require('multer');
var upload = multer({dest : '/static/uploads/'})

app.get('/socket.js', function (req, res) { //라이브러리 보내줌
    res.sendFile(__dirname + '/node_modules/socket.io-client/dist/socket.io.js');
});

app.get('/push.js', function (req, res) { //라이브러리 보내줌
    res.sendFile(__dirname + '/node_modules/push.js/bin/push.js');
});

app.get('/', function (req, res) {
  var sql = 'SELECT * FROM web.productlist;';
  connection.query(sql, function(err, results, fields){
    var pid = [];
    var price = [];
    var pname = [];
    var description = [];
    var selltype = [];
    var seller =[];
    var place =[];
    var image = [];
    var major = [];
    var difficulty = [];
    var ptype = [];
    var status = [];
    var year = [];
    var month = [];
    var day = [];
    for(var i = 0; i<results.length; i++ ){
      if(results[i].status == 0){
        pid.push(results[i].pid);
        price.push(results[i].price);
        pname.push(results[i].pname);
        description.push(results[i].description);
        selltype.push(results[i].selltype);
        seller.push(results[i].seller);
        place.push(results[i].place);
        image.push(results[i].image);
        major.push(results[i].major);
        difficulty.push(results[i].difficulty);
        ptype.push(results[i].ptype);
        status.push(results[i].status);
        year.push(results[i].year);
        month.push(results[i].month);
        day.push(results[i].day);
      }
    }
    var sql2 = 'SELECT * FROM web.productlist where status=0 order by wishcnt DESC LIMIT 3;';
    connection.query(sql2, function(err2, results2, fields2){
      var pid2 = [];
      var price2 = [];
      var pname2 = [];
      var description2 = [];
      var selltype2 = [];
      var seller2 =[];
      var place2 =[];
      var image2 = [];
      var major2 = [];
      var difficulty2 = [];
      var ptype2 = [];
      var status2 = [];
      var year2 = [];
      var month2 = [];
      var day2 = [];
      for(var i = 0; i<results2.length; i++ ){
          pid2.push(results2[i].pid);
          price2.push(results2[i].price);
          pname2.push(results2[i].pname);
          description2.push(results2[i].description);
          selltype2.push(results2[i].selltype);
          seller2.push(results2[i].seller);
          place2.push(results2[i].place);
          image2.push(results2[i].image);
          major2.push(results2[i].major);
          difficulty2.push(results2[i].difficulty);
          ptype2.push(results2[i].ptype);
          status2.push(results2[i].status);
          year2.push(results2[i].year);
          month2.push(results2[i].month);
          day2.push(results2[i].day);

      }
      if (req.cookies.id){
        var body = "";
        req.on('data', function(chunk){
          body += chunk;
        });
        req.on('end',function(){
          var data = qs.parse(body);
          who = data.who
          id = data.id
        });
        console.log('image[0]')
        console.log(image[0] == '')
        console.log(image[0] == null)
        res.render('index', {who: req.cookies.who, id: req.cookies.id, pid:pid, price:price,pname:pname,description:description,selltype:selltype,
        seller:seller,place:place,image:image,major:major,difficulty:difficulty,
        ptype:ptype,status:status,
        year:year,month:month,day:day,
        pid2:pid2, price2:price2,pname2:pname2,description2:description2,selltype2:selltype2,
        seller2:seller2,place2:place2,image2:image2,major2:major2,difficulty2:difficulty2,
        ptype2:ptype2,status2:status2,
        year2:year2,month2:month2,day2:day2});

      }else{
        res.cookie('who','none',{
              maxAge:0
        });
        res.cookie('id','none',{
              maxAge:0
        });
        res.render('index',{who:'none',id:'none', pid:pid, price:price,pname:pname,description:description,selltype:selltype,
        seller:seller,place:place,image:image,major:major,difficulty:difficulty,
        ptype:ptype,status:status,
        year:year,month:month,day:day,
        pid2:pid2, price2:price2,pname2:pname2,description2:description2,selltype2:selltype2,
        seller2:seller2,place2:place2,image2:image2,major2:major2,difficulty2:difficulty2,
        ptype2:ptype2,status2:status2,
        year2:year2,month2:month2,day2:day2});
      }
    });

  });
});

////////////// Tab List
app.get('/category',function(req, res){
  var sql = 'SELECT * FROM web.productlist;';
  connection.query(sql, function(err, results, fields){
    var pid = [];
    var price = [];
    var pname = [];
    var description = [];
    var selltype = [];
    var seller =[];
    var place =[];
    var image = [];
    var major = [];
    var difficulty = [];
    var ptype = [];
    var status = [];
    var year = [];
    var month = [];
    var day = [];
    var topic = req.query.topic;
    if(topic != "OtherProducts"){ // book
      if(topic == "ALL"){ // all book
        for(var i = 0; i<results.length; i++ ){
          if(results[i].status == 0){
            if(results[i].ptype == 0){
            pid.push(results[i].pid);
            price.push(results[i].price);
            pname.push(results[i].pname);
            description.push(results[i].description);
            selltype.push(results[i].selltype);
            seller.push(results[i].seller);
            place.push(results[i].place);
            image.push(results[i].image);
            major.push(results[i].major);
            difficulty.push(results[i].difficulty);
            ptype.push(results[i].ptype);
            status.push(results[i].status);
            year.push(results[i].year);
            month.push(results[i].month);
            day.push(results[i].day);
            }
          }
        }
      }else{ // only specific major related books
        for(var i = 0; i<results.length; i++ ){
          if(results[i].status == 0){
            if(results[i].major == topic){
              if(results[i].ptype == 0){
              pid.push(results[i].pid);
              price.push(results[i].price);
              pname.push(results[i].pname);
              description.push(results[i].description);
              selltype.push(results[i].selltype);
              seller.push(results[i].seller);
              place.push(results[i].place);
              image.push(results[i].image);
              major.push(results[i].major);
              difficulty.push(results[i].difficulty);
              ptype.push(results[i].ptype);
              status.push(results[i].status);
              year.push(results[i].year);
              month.push(results[i].month);
              day.push(results[i].day);
              }
            }
          }
        }
      }
    }else{ //other products
      topic = "Other Products";
      for(var i = 0; i<results.length; i++ ){
        if(results[i].status == 0){
          if(results[i].ptype == 1){
            pid.push(results[i].pid);
            price.push(results[i].price);
            pname.push(results[i].pname);
            description.push(results[i].description);
            selltype.push(results[i].selltype);
            seller.push(results[i].seller);
            place.push(results[i].place);
            image.push(results[i].image);
            major.push(results[i].major);
            difficulty.push(results[i].difficulty);
            ptype.push(results[i].ptype);
            status.push(results[i].status);
            year.push(results[i].year);
            month.push(results[i].month);
            day.push(results[i].day);
          }
        }
      }
    }
    console.log(req.query.page);
    var page = req.query.page;
    if(page > 0){page = page;}
    else page = 0;
    console.log(page);
    console.log(req.query.topic);
    if(req.cookies.who == 'user' || req.cookies.who =='admin'){
      res.render('category', {who: req.cookies.who, id: req.cookies.id, topic: req.query.topic, pid:pid, price:price,pname:pname,description:description,selltype:selltype,
      seller:seller,place:place,image:image,major:major,difficulty:difficulty,ptype:ptype,status:status,page:page,
      year:year,month:month,day:day});


    }else{
      res.render('category', {who: req.cookies.who, id: 'none', topic: req.query.topic, pid:pid, price:price,pname:pname,description:description,selltype:selltype,
      seller:seller,place:place,image:image,major:major,difficulty:difficulty,ptype:ptype,status:status,page:page,
      year:year,month:month,day:day});
    }
  });
});

app.get('/admin_page',function(req, res){
  var sql = 'SELECT * FROM web.user;';
  connection.query(sql, function(err, results, fields){
    var ids = [];
    var pw = [];
    var phone = [];
    var n_sell = [];
    var email = [];
    var department =[];
    var grade =[];
    var role = [];
    var cur_sell = [];

    for(var i = 0; i<results.length; i++ ){
      ids.push(results[i].id);
      pw.push(results[i].pw);
      phone.push(results[i].phone);
      n_sell.push(results[i].n_sell);
      email.push(results[i].email);
      department.push(results[i].department);
      grade.push(results[i].grade);
      role.push(results[i].role);
      cur_sell.push(results[i].cur_sell);
    }



    res.render('admin_page', {who: req.cookies.who, id: req.cookies.id,
    ids:ids,pw:pw,phone:phone,n_sell:n_sell,email:email,department:department,
    grade:grade,role:role,cur_sell:cur_sell});
  });
});




app.get('/product_register',function(req, res){
  console.log(req.cookies.who)
  console.log(req.cookies.who == null)
  console.log(req.cookies.who != null)
  if(req.cookies.who == null || (req.cookies.who != 'user' && req.cookies.who!='admin')) {
    console.log('product register page not accessible');
    res.send(`
      <script type="text/javascript">
        alert('You do not have access to this page. Please login!.'); location.href='/';
      </script>
    `);

  }else{
  if(req.cookies.who == 'user' || req.cookies.who == 'admin'){
      console.log('product_register page');

    res.render('product_register', {who: req.cookies.who, id: req.cookies.id});
  }else{
    console.log('product_register no access');
    res.send(`
                <script type="text/javascript">
                  alert('You do not have access to this page. Please login!.'); location.href='/';
                </script>
    `);
  }
}
})

app.get('/edit_product',function(req, res){
  if(req.cookies.who != 'user' && req.cookies.who!='admin'){
    console.log('myproduct page not accessible');
    res.send(`
                <script type="text/javascript">
                  alert('You do not have access to this page. Please login!.'); location.href='/';
                </script>
    `);
    return;
  }else{
  console.log(req.query)
  console.log(req.query.place)
  var pid = req.query.pid;
  var pname = req.query.pname;
  var seller = req.query.seller;
  var description = req.query.description;
  var selltype = req.query.selltype;
  var place = req.query.place;
  var major = req.query.major;
  var difficulty = req.query.difficulty;
  var ptype = req.query.ptype;
  var price = req.query.price;
  var image = req.query.image;


  if(req.cookies.who == 'user' || req.cookies.who == 'admin'){
      console.log('edit_product page');

    res.render('edit_product', {who: req.cookies.who, id: req.cookies.id, pid:pid,
    pname:pname, seller:seller,description:description,selltype:selltype,place:place,
    major:major,difficulty:difficulty,ptype:ptype,price:price,image:image});
  }else{
    console.log('edit product 접근권한 없음');
    res.send(`
                <script type="text/javascript">
                  alert('You do not have access to this page. Please login!.'); location.href='/';
                </script>
    `);
  }
}
})

var multer = require('multer');
var upload = multer({dest: '/static/uploads/'});

app.post('/edit_product_process', upload.single('pimg'), function (req, res) {
        var body = '';
        // console.log('2');
        // console.log(req.body);
        // req.body
        // console.log(req.file);
        // req
        // let image = '/image/' + req.file.Image;
        // req.on('data', function (data) {
        //   console.log('3');
        //     body = body + data;
        //     console.log(body);
        // });
        body = req.body;
        // req.on('end', function () {
          console.log(req.file);
          console.log('req.file');
            var post = qs.parse(body);
            console.log(post);
            console.log('below is post.image');
            var imagepath;
            if (req.file != null){
               imagepath = "/static/uploads/" + req.file.originalname;
            }
            else{ imagepath = null}
            console.log(imagepath);
            var pid = body.pid;
            var pn = body.product_name;   //product name
            var p = body.price;     //price
            var loc = body.location;  //trading place
            var description = body.contents;  //phone number
            var selltype= body.selltype;
            var id = req.cookies.id;
            var ptype = body.chk_books
            var book_dif = body.book_dif;
            var book_dep = body.book_dep;
            if(selltype == 0){//sale - enter price
              if(p==""){
                res.send(`
                <script type="text/javascript">
                  alert('Please Enter the price.');location.href='/product_register';
                </script>
                `);
                return;
              // }else if(!(Number.isInteger(p))){ //sale price must be positive
              //   res.send(`
              //   <script type="text/javascript">
              //     alert('Please Enter the Number for price.');location.href='/product_register';
              //   </script>
              //   `);
              //   return;
              }else if(parseInt(p) <= 0){ //sale price must be positive
                res.send(`
                <script type="text/javascript">
                  alert('Please Enter the price( > 0 ).');location.href='/product_register';
                </script>
                `);
                return;
              }
            }else{
              // if(!(Number.isInteger(p))){ //sale price must be positive
              //   if(p!=""){
              //     res.send(`
              //     <script type="text/javascript">
              //       alert('Please Enter the Number for price.');location.href='/product_register';
              //     </script>
              //     `);
              //     return;
              //   }
              // }else
              if(p == ""){}
              else if(parseInt(p) <= 0){// if auction, null okay. only non-negative
                res.send(`
                <script type="text/javascript">
                  alert('Please Enter the price( > 0 ).');location.href='/product_register';
                </script>
                `);
                return;
              }
            }
            if(pn==""){
              res.send(`
              <script type="text/javascript">
                alert('Please enter the product name.');location.href='/product_register';
              </script>
              `);
              return;
            }
            if(loc==""){
              res.send(`
              <script type="text/javascript">
                alert('Please enter the place to trade.');location.href='/product_register';
              </script>
              `);
              return;
            }
            if(description==""){
              res.send(`
              <script type="text/javascript">
                alert('Place enter the product description.');location.href='/product_register';
              </script>
              `);
              return;
            }
            if(ptype == 0){
              book_dif = post.book_dif;
              book_dep = post.book_dep;
            }else{
              book_dif = 0;
            }

            var product = {
              'price' : p,
              'pname' : pn,
              'description' : description,
              'selltype' : selltype,
              'seller' : req.cookies.id,
              'place' : loc,
              'major' : book_dep,
              'difficulty' : book_dif,
              'ptype' : ptype,
              'image' : imagepath
            }
            console.log('product');
            console.log(product);
            connection.query('UPDATE web.productlist SET ? WHERE pid=?', [product,pid], function(error2, results2, fields2){
              if(error2){
                console.log(error2);
                console.log('update query error');
                res.send(`
                  <script type="text/javascript">
                    alert('ID Error. Please Re-login and try.'); location.href='/';
                  </script>
                `);
              }else{
                console.log('Product Updated');
                res.send(`
                  <script type="text/javascript">
                    alert('Product Modification has completed.'); location.href='/';
                  </script>
                `);
              }
            });



        // });
});


app.get('/delete_product_process', function (req, res) {
  var body = '';
  console.log('delete product process');
  req.on('data', function (data) {
      body = body + data;
      console.log(body)
  });
  req.on('end', function () {
      var post = qs.parse(body);
      var pid = req.query.pid;
      console.log(req.query);


      connection.query('Delete from web.productlist WHERE pid=?', [pid], function(error2, results2, fields2){
        if(error2){
          console.log(error2);
          console.log('delete product query error');
          res.send(`
            <script type="text/javascript">
              alert('ID Error. Please Re-login and try.'); location.href='/';
            </script>
          `);
        }else{
          console.log('Product Deleted');
          res.send(`
            <script type="text/javascript">
              alert('Item Deleted'); location.href='/';
            </script>
          `);
        }
      });
  });
});

app.get('/wishlist',function(req, res){
  if(req.cookies.who != 'user' && req.cookies.who!='admin'){
    console.log('wishlist page not accessible');
    res.send(`
                <script type="text/javascript">
                  alert('You do not have access to this page. Please login!.'); location.href='/';
                </script>
    `);
    return;
  }else{
  var sql = 'SELECT * FROM web.wishlist, web.productlist\
   where id = ? && web.productlist.pid=web.wishlist.pid;';
  var id = req.cookies.id;
  connection.query(sql, id,function(err, results, fields){
    var ids = [];
    var pid = [];
    var price = [];
    var pname = [];
    var selltype = [];
    var seller =[];
    var place =[];
    var image = [];
    var status = [];
    console.log(results);
    for(var i = 0; i<results.length; i++ ){
      ids.push(results[i].id);
      pid.push(results[i].pid);
      price.push(results[i].price);
      pname.push(results[i].pname);
      selltype.push(results[i].selltype);
      seller.push(results[i].seller);
      place.push(results[i].place);
      image.push(results[i].image);
      status.push(results[i].status);
    }

    if(req.cookies.who == 'user' || req.cookies.who=='admin'){
        console.log('wishlist page');
      res.render('wishlist', {who: req.cookies.who, id: req.cookies.id, ids:ids, pid:pid,
        price:price,pname:pname,selltype:selltype,seller:seller,place:place,image:image,
        status:status
      });
    }else{
      console.log('wishlist 접근권한 없음');
      res.send(`
                  <script type="text/javascript">
                    alert('You do not have access to this page. Please login!.'); location.href='/';
                  </script>
      `);
    }
  });
}
})

app.get('/shoppinglist',function(req, res){
  if(req.cookies.who != 'user' && req.cookies.who!='admin'){
    console.log('shoppinglist no access');
    res.send(`
                <script type="text/javascript">
                  alert('You do not have access to this page. Please login!.'); location.href='/';
                </script>
    `);
    return;
  }else{
  var sql = 'SELECT * FROM web.shoppinglist, web.productlist\
   where id = ? && web.productlist.pid=web.shoppinglist.pid;';
  var id = req.cookies.id;
  connection.query(sql, id,function(err, results, fields){
    var ids = [];
    var pid = [];
    var price = [];
    var pname = [];
    var selltype = [];
    var seller =[];
    var place =[];
    var image = [];
    var status = [];
    console.log(results);
    for(var i = 0; i<results.length; i++ ){
      ids.push(results[i].id);
      pid.push(results[i].pid);
      price.push(results[i].price);
      pname.push(results[i].pname);
      selltype.push(results[i].selltype);
      seller.push(results[i].seller);
      place.push(results[i].place);
      image.push(results[i].image);
      status.push(results[i].status);
    }

    if(req.cookies.who == 'user' || req.cookies.who=='admin'){
        console.log('shoppinglist page');
      res.render('shoppinglist', {who: req.cookies.who, id: req.cookies.id, ids:ids, pid:pid,
        price:price,pname:pname,selltype:selltype,seller:seller,place:place,image:image,
        status:status
      });
    }else{
      console.log('shoppinglist 접근권한 없음');
      res.send(`
                  <script type="text/javascript">
                    alert('You do not have access to this page. Please login!.'); location.href='/';
                  </script>
      `);
    }
  });
}
})


app.get('/myproduct',function(req, res){
  if(req.cookies.who != 'user' && req.cookies.who!='admin'){
    console.log('myproduct page not accessible');
    res.send(`
                <script type="text/javascript">
                  alert('You do not have access to this page. Please login!.'); location.href='/';
                </script>
    `);
    return;
  }else{


  var sql = 'SELECT * FROM web.productlist where seller = ?;';
  var id = req.cookies.id;
  connection.query(sql, id,function(err, results, fields){
    var ids = [];
    var pid = [];
    var price = [];
    var pname = [];
    var selltype = [];
    var seller =[];
    var place =[];
    var image = [];
    var status = [];
    console.log(results);
    for(var i = 0; i<results.length; i++ ){
      ids.push(results[i].id);
      pid.push(results[i].pid);
      price.push(results[i].price);
      pname.push(results[i].pname);
      selltype.push(results[i].selltype);
      seller.push(results[i].seller);
      place.push(results[i].place);
      image.push(results[i].image);
      status.push(results[i].status);
    }

    if(req.cookies.who == 'user' || req.cookies.who=='admin'){
        console.log('myproduct page');
      res.render('myproduct', {who: req.cookies.who, id: req.cookies.id, ids:ids, pid:pid,
        price:price,pname:pname,selltype:selltype,seller:seller,place:place,image:image,
        status:status
      });
    }else{
      console.log('myproduct page not accessible');
      res.send(`
                  <script type="text/javascript">
                    alert('You do not have access to this page. Please login!.'); location.href='/';
                  </script>
      `);
    }
  });
}
})

app.get('/contact',function(req, res){
  if(req.cookies.who === 'user'){
      console.log('contact page');
    res.render('contact', {who: req.cookies.who, id: req.cookies.id});
  }else{
    res.render('contact', {who: req.cookies.who, id: 'none'});
  }

})

app.get('/about',function(req, res){
  if(req.cookies.who === 'user'){
      console.log('about page');
    res.render('about', {who: req.cookies.who, id: req.cookies.id});
  }else{
    res.render('about', {who: req.cookies.who, id: 'none'});
  }

})
////////////////////
///Article Content ///
app.post('/search',function(req, res){
  console.log('search')
  var body = "";
  req.on('data', function (data) {
      body = body + data;
      console.log(body)
  });
  req.on('end', function () {
      var post = qs.parse(body);
      console.log(post);
      var s_pname = post.s_pname;
      var s_seller = post.s_seller;
      var s_price = post.s_price;
      var sql = 'SELECT * FROM web.productlist;';
      connection.query(sql, function(err, results, fields){
        var pid = [];
        var price = [];
        var pname = [];
        var description = [];
        var selltype = [];
        var seller =[];
        var place =[];
        var image = [];
        var major = [];
        var difficulty = [];
        var ptype = [];
        var status = [];
        var year = [];
        var month = [];
        var day = [];
        if (s_price == '') s_price = 99999999;
        for(var i = 0; i<results.length; i++ ){
          console.log(results[i].pname.includes(s_pname));
          if(s_pname != '' && s_seller != ''){
            if(results[i].pname.includes(s_pname) && results[i].seller.includes(s_seller) && results[i].price <= s_price){
              pid.push(results[i].pid);
              price.push(results[i].price);
              pname.push(results[i].pname);
              description.push(results[i].description);
              selltype.push(results[i].selltype);
              seller.push(results[i].seller);
              place.push(results[i].place);
              image.push(results[i].image);
              major.push(results[i].major);
              difficulty.push(results[i].difficulty);
              ptype.push(results[i].ptype);
              status.push(results[i].status);
              year.push(results[i].year);
              month.push(results[i].month);
              day.push(results[i].day);
            }
          }
          else if(s_pname == '' && s_seller != ''){
            if(results[i].seller.includes(s_seller) && results[i].price <= s_price){
              pid.push(results[i].pid);
              price.push(results[i].price);
              pname.push(results[i].pname);
              description.push(results[i].description);
              selltype.push(results[i].selltype);
              seller.push(results[i].seller);
              place.push(results[i].place);
              image.push(results[i].image);
              major.push(results[i].major);
              difficulty.push(results[i].difficulty);
              ptype.push(results[i].ptype);
              status.push(results[i].status);
              year.push(results[i].year);
              month.push(results[i].month);
              day.push(results[i].day);
            }
          }else if (s_pname != '' && s_seller == ''){
            if(results[i].pname.includes(s_pname) && results[i].price <= s_price){
              pid.push(results[i].pid);
              price.push(results[i].price);
              pname.push(results[i].pname);
              description.push(results[i].description);
              selltype.push(results[i].selltype);
              seller.push(results[i].seller);
              place.push(results[i].place);
              image.push(results[i].image);
              major.push(results[i].major);
              difficulty.push(results[i].difficulty);
              ptype.push(results[i].ptype);
              status.push(results[i].status);
              year.push(results[i].year);
              month.push(results[i].month);
              day.push(results[i].day);
            }
          }else if (s_pname == '' && s_seller == ''){
            if(results[i].price <= s_price){
              pid.push(results[i].pid);
              price.push(results[i].price);
              pname.push(results[i].pname);
              description.push(results[i].description);
              selltype.push(results[i].selltype);
              seller.push(results[i].seller);
              place.push(results[i].place);
              image.push(results[i].image);
              major.push(results[i].major);
              difficulty.push(results[i].difficulty);
              ptype.push(results[i].ptype);
              status.push(results[i].status);
              year.push(results[i].year);
              month.push(results[i].month);
              day.push(results[i].day);
            }
          }
        }
        if(req.cookies.who == 'user' || req.cookies.who =='admin'){
          res.render('searched', {who: req.cookies.who, id: req.cookies.id, pid:pid, price:price,pname:pname,description:description,selltype:selltype,
          seller:seller,place:place,image:image,major:major,difficulty:difficulty,ptype:ptype,status:status,
          year:year,month:month,day:day});

        }else{
          res.render('searched', {who: req.cookies.who, id: 'none', pid:pid, price:price,pname:pname,description:description,selltype:selltype,
          seller:seller,place:place,image:image,major:major,difficulty:difficulty,ptype:ptype,status:status,
          year:year,month:month,day:day});
        }
      // console.log(pname);
      });
  });

});

app.get('/SingleArticle',function(req, res){
  var pid = req.query.pid;
  // var seller = req.query.seller;
  // var pname = req.query.pname;
  console.log('single article page')
  connection.query('SELECT * FROM web.productlist WHERE pid = ?',[pid], function (error, results, fields) {
      if (error) {
        console.log('error 229')
      }
      else{
        console.log(results[0]);
        if(results.length==0){
          res.send(`
          <script type="text/javascript">
            alert('No matched product.'); location.href='./';
          </script>
          `);
          return;
        }else{
          var vcn = results[0].viewcnt;
          var wcn = results[0].wishcnt;
          connection.query('UPDATE web.productlist SET viewcnt=? WHERE pid=?', [vcn+1,pid], function(err, res, fie){
            if(err){
              console.log('update query error');
              res.status(500).send('Internal Server Error');
            }
          });
          var seller_phone;
          var seller_email;
          var seller_n_sell;
          var seller_department;
          var seller_grade;

          // 'SELECT * FROM web.wishlist, web.productlist\
          //  where id = ? && web.productlist.pid=web.wishlist.pid;';
           connection.query('SELECT * FROM web.user, web.productlist \
           WHERE web.productlist.pid = ? && web.productlist.seller=web.user.id',[pid], function (erro, resu, fiel) {



          // connection.query('SELECT * FROM web.user WHERE id = ?',[seller], function (erro, resu, fiel) {
              if (error) {
                console.log('error 250')
              }
              else{
                console.log(resu[0])
                seller_phone = resu[0].phone;
                seller_email = resu[0].email;
                seller_n_sell= resu[0].n_sell;
                seller_department= resu[0].department;
                seller_grade= resu[0].grade;
                var m = results[0].month;
                if(m == 1) m = "January";
                else if(m == 2) m = "Febuary";
                else if(m == 3) m = "March";
                else if(m == 4) m = "April";
                else if(m == 5) m = "May";
                else if(m == 6) m = "June";
                else if(m == 7) m = "July";
                else if(m == 8) m = "August";
                else if(m == 9) m = "September";
                else if(m == 10) m = "October";
                else if(m == 11) m = "November";
                else if(m == 12) m = "December";

                connection.query('SELECT * FROM web.wishlist WHERE web.wishlist.id = ? && web.wishlist.pid= ?',[req.cookies.id, pid], function (err, ress, fie) {
                   if (error) {
                     console.log('error 250')
                   }
                   else{
                     var ifwish = 0;
                     if(ress.length == 0){
                       ifwish = 0;
                     }else{
                       ifwish = 1;
                     }
                      if(req.cookies.who === 'user'){
                        res.render('SingleArticle', {who: req.cookies.who, id: req.cookies.id,
                          pid:results[0].pid, price:results[0].price,pname:results[0].pname,
                          description:results[0].description,selltype:results[0].selltype,
                          seller:results[0].seller,place:results[0].place,image:results[0].image,
                          major:results[0].major,difficulty:results[0].difficulty,
                          ptype:results[0].ptype,status:results[0].status,
                          year:results[0].year,month:m,day:results[0].day,
                          seller_phone:seller_phone,seller_email:seller_email,seller_n_sell:seller_n_sell,
                          seller_department:seller_department,seller_grade:seller_grade, viewcount:vcn, wishcount:wcn,ifwish:ifwish, bidhigh:0
                        });
                      }else{
                        res.render('SingleArticle', {who: req.cookies.who, id: 'none',
                          pid:results[0].pid, price:results[0].price,pname:results[0].pname,
                          description:results[0].description,selltype:results[0].selltype,
                          seller:results[0].seller,place:results[0].place,image:results[0].image,
                          major:results[0].major,difficulty:results[0].difficulty,
                          ptype:results[0].ptype,status:results[0].status,
                          year:results[0].year,month:results[0].month,day:results[0].day,
                          seller_phone:seller_phone,seller_email:seller_email,seller_n_sell:seller_n_sell,
                          seller_department:seller_department,seller_grade:seller_grade, viewcount:vcn, wishcount:wcn,ifwish:ifwish, bidhigh:0
                        });
                      }
                    }
                  });
              }
          });
        }

      }
  });


});
app.post('/buy_process', function (req, res){
  if(req.cookies.who != 'user' && req.cookies.who!='admin'){
    console.log('myproduct page not accessible');
    res.send(`
                <script type="text/javascript">
                  alert('You do not have access. Please login!.'); location.href='/';
                </script>
    `);
    return;
  }else{
  var body = '';
  req.on('data', function (data) {
      body = body + data;
  });
  req.on('end', function () {
      var post = qs.parse(body);
      var pid = post.pid;
      var id = req.cookies.id;
      var wish = {
        'pid' : pid,
        'id' : id
      }
      var product = {
        'status' : 1

      }
      connection.query('UPDATE web.productlist SET ? WHERE pid=?', [product,pid], function(error2, results2, fields2){
        if(error2){
          console.log(error2);
          console.log('update query error');
          res.send(`
            <script type="text/javascript">
              alert('ID Error. Please Re-login and try.'); location.href='/';
            </script>
          `);
        }else{
          var pid = post.pid;
          var id = req.cookies.id;
          var wish = {
            'pid' : pid,
            'id' : id
          }
          connection.query('INSERT INTO web.shoppinglist SET ? ON DUPLICATE KEY UPDATE id=?', [wish,id], function (error, results, fields) {
              if (error) {
                  console.log(error);
                  console.log("shoppinglist insertion error");
                  res.send(`
                    <script type="text/javascript">
                      alert('shoppinglist insertion error.'); location.href='/';
                    </script>
                  `);
              }
              else{
                console.log('Product Purchased shopping list inserted');
                res.send(`
                  <script type="text/javascript">
                    alert('Product Purchased. Shopping list Inserted.'); location.href='/shoppinglist';
                  </script>
                `);
              }
            });
          }
      });
  });
}
});

app.post('/bid_process', function (req, res){
  if(req.cookies.who != 'user' && req.cookies.who!='admin'){
    console.log('myproduct page not accessible');
    res.send(`
                <script type="text/javascript">
                  alert('Please login!.'); location.href='/';
                </script>
    `);
    return;
  }else{
  var body = '';
  req.on('data', function (data) {
      body = body + data;
  });
  req.on('end', function () {
      var post = qs.parse(body);
      var pid = post.pid;
      var price = post.price;
      var selltype = post.selltype;
      var aprice = post.aprice;
      if(price == '') price = 0;
      if(price >= aprice){

        connection.query('SELECT * FROM web.productlist WHERE pid = ?',[pid], function (error, results, fields) {
            if (error) {
              console.log('error 774')
            }
            else{
              if(results.length==0){
                res.send(`
                <script type="text/javascript">
                  alert('No matched product.'); location.href='./';
                </script>
                `);
                return;
              }else{
                var vcn = results[0].viewcnt;
                var wcn = results[0].wishcnt;
                var seller_phone;
                var seller_email;
                var seller_n_sell;
                var seller_department;
                var seller_grade;
                 connection.query('SELECT * FROM web.user, web.productlist \
                 WHERE web.productlist.pid = ? && web.productlist.seller=web.user.id',[pid], function (erro, resu, fiel) {
                    if (error) {
                      console.log('error 795')
                    }
                    else{
                      console.log(resu[0])
                      seller_phone = resu[0].phone;
                      seller_email = resu[0].email;
                      seller_n_sell= resu[0].n_sell;
                      seller_department= resu[0].department;
                      seller_grade= resu[0].grade;
                      var m = results[0].month;
                      if(m == 1) m = "January";
                      else if(m == 2) m = "Febuary";
                      else if(m == 3) m = "March";
                      else if(m == 4) m = "April";
                      else if(m == 5) m = "May";
                      else if(m == 6) m = "June";
                      else if(m == 7) m = "July";
                      else if(m == 8) m = "August";
                      else if(m == 9) m = "September";
                      else if(m == 10) m = "October";
                      else if(m == 11) m = "November";
                      else if(m == 12) m = "December";

                      connection.query('SELECT * FROM web.wishlist WHERE web.wishlist.id = ? && web.wishlist.pid= ?',[req.cookies.id, pid], function (err, ress, fie) {
                         if (error) {
                           console.log('error 250')
                         }
                         else{
                           var ifwish = 0;
                           if(ress.length == 0){
                             ifwish = 0;
                           }else{
                             ifwish = 1;
                           }
                            if(req.cookies.who === 'user'){
                              res.render('SingleArticle', {who: req.cookies.who, id: req.cookies.id,
                                pid:results[0].pid, price:results[0].price,pname:results[0].pname,
                                description:results[0].description,selltype:results[0].selltype,
                                seller:results[0].seller,place:results[0].place,image:results[0].image,
                                major:results[0].major,difficulty:results[0].difficulty,
                                ptype:results[0].ptype,status:results[0].status,
                                year:results[0].year,month:m,day:results[0].day,
                                seller_phone:seller_phone,seller_email:seller_email,seller_n_sell:seller_n_sell,
                                seller_department:seller_department,seller_grade:seller_grade, viewcount:vcn, wishcount:wcn,ifwish:ifwish, bidhigh:1
                              });
                            }else{
                              res.render('SingleArticle', {who: req.cookies.who, id: 'none',
                                pid:results[0].pid, price:results[0].price,pname:results[0].pname,
                                description:results[0].description,selltype:results[0].selltype,
                                seller:results[0].seller,place:results[0].place,image:results[0].image,
                                major:results[0].major,difficulty:results[0].difficulty,
                                ptype:results[0].ptype,status:results[0].status,
                                year:results[0].year,month:results[0].month,day:results[0].day,
                                seller_phone:seller_phone,seller_email:seller_email,seller_n_sell:seller_n_sell,
                                seller_department:seller_department,seller_grade:seller_grade, viewcount:vcn, wishcount:wcn,ifwish:ifwish, bidhigh:1
                              });
                            }
                          }
                        });
                    }
                });
              }

            }
        });

      } else {
        auctionset = {
          'id' : req.cookies.id,
          'pid' : pid,
          'price' : aprice
        }
        connection.query('INSERT INTO web.auctionlist SET ?', [auctionset], function (error, results, fields) {
          if(error){
            res.send(`
              <script type="text/javascript">
                alert('Auction Insertion Error. Please Re-login and try.'); location.href='/';
              </script>
            `);
          }else{
            product = {
              'price' : aprice
            }
            connection.query('UPDATE web.productlist SET ? WHERE pid=?', [product,pid], function(error2, results2, fields2){
              if(error2){
                console.log(error2);
                console.log('auction price update Error');
                res.send(`
                  <script type="text/javascript">
                    alert('Auction price update Error. Please Re-login and try.'); location.href='/';
                  </script>
                `);
              }else{
                console.log('auction price update');
                res.send(`
                  <script type="text/javascript">
                    alert('Successful Bidding.'); location.href='/';
                  </script>
                `);
              }
            });
          }
        });
      }
  });
}
});


app.post('/add_wishlist', function (req, res) {
  if(req.cookies.who != 'user' && req.cookies.who!='admin'){
    console.log('add wishlist not accessible');
    res.send(`
                <script type="text/javascript">
                  alert('Please login!.'); location.href='/';
                </script>
    `);
    return;
  }else{
        var body = '';
        req.on('data', function (data) {
            body = body + data;
        });
        req.on('end', function () {
            var post = qs.parse(body);
            var pid = post.pid;
            var seller = post.seller;
            var pname = post.pname;
            var id = req.cookies.id;
            var wish = {
              'pid' : pid,
              'id' : id
            }
            connection.query('INSERT INTO web.wishlist SET ? ON DUPLICATE KEY UPDATE id=?', [wish,id], function (error, results, fields) {
                if (error) {
                    console.log(error);
                    console.log("wishlist insertion error");
                    res.send(`
                      <script type="text/javascript">
                        alert('Wish insertion error.'); location.href='/';
                      </script>
                    `);
                }
                else{
                  connection.query('SELECT * FROM web.productlist WHERE pid = ?',[pid], function (error, results, fields) {
                      if (error) {
                        console.log('error 229')
                      }
                      else{
                        console.log(results[0]);
                        if(results.length==0){
                          res.send(`
                          <script type="text/javascript">
                            alert('No matched product.'); location.href='./';
                          </script>
                          `);
                          return;
                        }else{
                          var wcn = results[0].wishcnt;
                          wish = {
                            'wishcnt' : wcn + 1
                          }
                          connection.query('UPDATE web.productlist SET ? WHERE pid=?', [wish, pid], function(error2, results2, fields2){
                            if(error2){
                              console.log(error2);
                              console.log('update query error');
                              // res.status(500).send('Internal Server Error');
                              res.send(`
                                <script type="text/javascript">
                                  alert('ID Error. Please Re-login and try.'); location.href='admin_page';
                                </script>
                              `);
                            }else{
                              console.log('Wish Count Increased');
                              res.send(`
                                <script type="text/javascript">
                                  alert("Added to Wishlist");
                                  location.href='/wishlist';

                                </script>
                              `);
                              console.log("/SingleArticle?pid="+ pid +"&seller="+ seller +"&pname="+ pname);
// location.href="/SingleArticle?pid="+ pid +"&seller="+ seller +"&pname="+ pname;

                            }
                          });
                        }
                      }
                    });
                  }
          });
        });
      }
});

app.post('/view_auctionlist', function (req, res) {
        var body = '';
        req.on('data', function (data) {
            body = body + data;
        });
        req.on('end', function () {
            var post = qs.parse(body);
            var pid = post.pid;
            var seller = post.seller;
            var pname = post.pname;
            var id = req.cookies.id;

            connection.query('SELECT * FROM web.auctionlist WHERE pid = ?',[pid], function (error, results, fields) {
                if (error) {
                  console.log('error 229')
                }
                else{
                  var bidprice = [];
                  var ids = [];
                  var seller = req.cookies.id;

                  console.log(results[0]);
                  for(var i = 0; i < results.length; i++){
                    bidprice.push(results[i].price);
                    ids.push(results[i].id);
                  }
                  res.render('view_auctionhistory',{who:req.cookies.who, id:req.cookies.id, price:bidprice, ids:ids, pid:pid, seller:seller, pname:pname})
                }
            });

        });
});

app.post('/close_auction', function (req, res) {
        var body = '';
        req.on('data', function (data) {
            body = body + data;
        });
        req.on('end', function () {
            var post = qs.parse(body);
            var pid = post.pid;
            var seller = post.seller;
            var id = req.cookies.id;
            var buyer = post.buyer;
            console.log(post)
// update productlist status, price
// insert into shopping list
            var product = {
              'status' : 1
            }
            connection.query('UPDATE web.productlist SET ? WHERE pid=?', [product,pid], function(error2, results2, fields2){
              if(error2){
                console.log(error2);
                console.log('update query error');
                res.send(`
                  <script type="text/javascript">
                    alert('ID Error. Please Re-login and try.'); location.href='/';
                  </script>
                `);
              }else{
                console.log('Auction status Updated');
                console.log(buyer);
                var auction_item = {
                  'pid' : pid,
                  'id' : id
                }
                if (buyer == "") {
                  console.log('sul ma?');
                  res.send(`
                    <script type="text/javascript">
                      alert('Auction Closed Without buyer.'); location.href='/';
                    </script>
                  `);
                  return;
                }
                connection.query('INSERT INTO web.shoppinglist SET ? ON DUPLICATE KEY UPDATE pid=?', [auction_item,pid], function (error, results, fields) {
                    if (error) {
                        console.log(error);
                        console.log("shoppinglist insertion error");
                        res.send(`
                          <script type="text/javascript">
                            alert('shoppinglist insertion error.'); location.href='/';
                          </script>
                        `);
                    }
                    else{
                      console.log("Shoppinglist insertion success");
                      res.send(`
                        <script type="text/javascript">
                          alert('Auction Closed.'); location.href='/';
                        </script>
                      `);
                    }

                });
              }
            });


        });
});

app.post('/add_shoppinglist', function (req, res) {
  if(req.cookies.who != 'user' && req.cookies.who!='admin'){
    console.log('add shooppinglist page not accessible');
    res.send(`
                <script type="text/javascript">
                  alert('You do not have access to this page. Please login!.'); location.href='/';
                </script>
    `);
    return;
  }else{
        var body = '';
        req.on('data', function (data) {
            body = body + data;
        });
        req.on('end', function () {
            var post = qs.parse(body);
            var pid = post.pid;
            var id = req.cookies.id;
            var wish = {
              'pid' : pid,
              'id' : id
            }
            connection.query('INSERT INTO web.shoppinglist SET ? ON DUPLICATE KEY UPDATE id=?', [wish,id], function (error, results, fields) {
                if (error) {
                    console.log(error);
                    console.log("shoppinglist insertion error");
                    res.send(`
                      <script type="text/javascript">
                        alert('shoppinglist insertion error.'); location.href='/';
                      </script>
                    `);
                }
                else{
                  console.log("Shoppinglist insertion success");
                  res.send(`
                    <script type="text/javascript">
                      alert('Shopping list Inserted.'); location.href='/shoppinglist';
                    </script>
                  `);
                }

          });
        });
      }
});
////////////////////
///Member Content///
app.get('/SingleMember',function(req, res){
  var ids = req.query.ids;
  var pw = req.query.pw;
  var phone = req.query.phone;
  var n_sell = req.query.n_sell;
  var email = req.query.email;
  var department =req.query.department;
  var grade =req.query.grade;
  var role = req.query.role;
  var cur_sell = req.query.cur_sell;
  console.log('admin single member page')
  connection.query('SELECT * FROM web.user WHERE id = ?',[ids], function (error, results, fields) {
      if (error) {
        console.log('error 404')
      }
      else{
        if(results.length==0){
          res.send(`
          <script type="text/javascript">
            alert('No matched User.'); location.href='./';
          </script>
          `);
          return;
        }else{
          res.render('SingleMember', {who: req.cookies.who, id: req.cookies.id,
          ids:ids,pw:pw,phone:phone,n_sell:n_sell,email:email,department:department,
          grade:grade,role:role,cur_sell:cur_sell});
        }
      }
  });
})


app.post('/user_delete_process', function (req, res) {
        var body = '';
        req.on('data', function (data) {
            body = body + data;
        });
        req.on('end', function () {
            var post = qs.parse(body);
            var ids = post.ids;

          connection.query('Delete from web.productlist WHERE seller=?', [ids], function(error2, results2, fields2){
            if(error2){
              console.log(error2);
              console.log('delete product query error');
              res.send(`
                <script type="text/javascript">
                  alert('ID Error. Please Re-login and try.'); location.href='admin_page';
                </script>
              `);
            }else{
              console.log('Product Deleted');
              connection.query('Delete from web.user WHERE id=?', [ids], function(error2, results2, fields2){
                if(error2){
                  console.log(error2);
                  console.log('delete user query error');
                  res.send(`
                    <script type="text/javascript">
                      alert('ID Error. Please Re-login and try.'); location.href='admin_page';
                    </script>
                  `);
                }else{
                  console.log('User Deleted');
                  res.send(`
                    <script type="text/javascript">
                      alert('User Deletion has completed.'); location.href='admin_page';
                    </script>
                  `);
                }
              });
            }
          });
        });
});


app.post('/user_modify_process', function (req, res) {
        var body = '';

        req.on('data', function (data) {
            body = body + data;
            console.log(body)
        });
        req.on('end', function () {
            var post = qs.parse(body);
            var ids = post.ids;
            var phone = post.phone;
            var email = post.email;
            var department = post.department;
            var grade = post.grade;

            var user = {
              'phone' : phone,
              'email' : email,
              'department' : department,
              'grade' : grade,
            }

          connection.query('UPDATE web.user SET ? WHERE id=?', [user, ids], function(error2, results2, fields2){
            if(error2){
              console.log(error2);
              console.log('update query error');
              // res.status(500).send('Internal Server Error');
              res.send(`
                <script type="text/javascript">
                  alert('ID Error. Please Re-login and try.'); location.href='admin_page';
                </script>
              `);
            }else{
              console.log('Product Registered');
              res.send(`
                <script type="text/javascript">
                  alert('User Modification has completed.'); location.href='admin_page';
                </script>
              `);
            }
          });
        });
});

//////////////////////

/////////// action process /////////
app.post('/product_register_process', upload.single('pimg'), function (req, res) {
        var body = '';
        // console.log(req.file);
        // console.log(req.body);
        // console.log('req.file');
        // let image = '/image/' + req.file.Image;
        // req.on('data', function (data) {
        //     body = body + data;
        //     console.log(body);
        // });
        // req.on('end', function () {
        var post = req.body;
            // var post = qs.parse(body);
            console.log(post);
            console.log('below is post.image');
            var imagepath;
            if (req.file != null){
               imagepath = "/static/uploads/" + req.file.originalname;
            }
            else{ imagepath = null}
            pn = post.product_name;   //product name
            p = post.price;     //price
            loc = post.location;  //trading place
            description = post.contents;  //phone number
            selltype= post.selltype;
            id = req.cookies.id;
            ptype = post.chk_books
            book_dif = "";
            book_dep = "";

            if(selltype == 0){//sale - enter price
              if(p==""){
                res.send(`
                <script type="text/javascript">
                  alert('Please Enter the price.');location.href='/product_register';
                </script>
                `);
                return;
              // }else if(!(Number.isInteger(p))){ //sale price must be positive
              //   res.send(`
              //   <script type="text/javascript">
              //     alert('Please Enter the Number for price.');location.href='/product_register';
              //   </script>
              //   `);
              //   return;
              }else if(parseInt(p) <= 0){ //sale price must be positive
                res.send(`
                <script type="text/javascript">
                  alert('Please Enter the price( > 0 ).');location.href='/product_register';
                </script>
                `);
                return;
              }
            }else{
              // if(!(Number.isInteger(p))){ //sale price must be positive
              //   if(p!=""){
              //     res.send(`
              //     <script type="text/javascript">
              //       alert('Please Enter the Number for price.');location.href='/product_register';
              //     </script>
              //     `);
              //     return;
              //   }
              // }else
              if(p == ""){}
              else if(parseInt(p) <= 0){// if auction, null okay. only non-negative
                res.send(`
                <script type="text/javascript">
                  alert('Please Enter the price( > 0 ).');location.href='/product_register';
                </script>
                `);
                return;
              }
            }
            if(pn==""){
              res.send(`
              <script type="text/javascript">
                alert('Please enter the product name.');location.href='/product_register';
              </script>
              `);
              return;
            }
            if(loc==""){
              res.send(`
              <script type="text/javascript">
                alert('Please enter the place to trade.');location.href='/product_register';
              </script>
              `);
              return;
            }
            if(description==""){
              res.send(`
              <script type="text/javascript">
                alert('Place enter the product description.');location.href='/product_register';
              </script>
              `);
              return;
            }
            if(ptype == 0){
              book_dif = post.book_dif;
              book_dep = post.book_dep;
            }else{
              book_dif = 0;
            }
            var dt = new Date();
            var year = dt.getFullYear()
            var month = dt.getMonth() + 1
            var day = dt.getDate()
            var product = {
              'price' : p,
              'pname' : pn,
              'description' : description,
              'selltype' : selltype,
              'seller' : req.cookies.id,
              'place' : loc,
              'major' : book_dep,
              'difficulty' : book_dif,
              'ptype' : ptype,
              'year' : year,
              'month' : month,
              'day' : day,
              'image' : imagepath
            }
            connection.query('INSERT INTO web.productlist SET ?', product, function (error, results, fields) {
                if (error) {
                    console.log(error);
                    console.log("product insertion error");
                    res.send(`
                      <script type="text/javascript">
                        alert('Retry Registering. Check if you followed instruction to register.'); location.href='/product_register';
                      </script>
                    `);
                }
                else{
                  var nsell;
                  var cur_sell;
                  connection.query('SELECT * FROM web.user WHERE id = ?',[req.cookies.id], function (error2, results2, fields2) {
                      if (error2) {
                        console.log('error 82')
                      }
                      else{
                        console.log('results2')
                        nsell = results2[0].n_sell;
                        cur_sell = results2[0].cur_sell;
                        // connection.query('UPDATE web.user SET role=? n_sell=n_sell+1 cur_sell=cur_sell+1 WHERE id=?', ['seller',req.cookies.id], function(error2, results2, fields2){
                        connection.query('UPDATE web.user SET role=?, n_sell=?, cur_sell=? WHERE id=?', ['seller',nsell + 1,cur_sell + 1,req.cookies.id], function(error2, results2, fields2){
                          if(error2){
                            console.log(error2);
                            console.log('update query error');
                            // res.status(500).send('Internal Server Error');
                            res.send(`
                              <script type="text/javascript">
                                alert('ID Error. Please Re-login and try.'); location.href='/';
                              </script>
                            `);
                          }else{
                            console.log('Product Registered');
                            res.send(`
                              <script type="text/javascript">
                                alert('Product Registration has completed.'); location.href='/';
                              </script>
                            `);
                          }
                        });
                      }
                    });
                }
            });
        // });
});


app.get('/users', (req, res) => {
  // connection.connect();
  connection.query('SELECT * from Users', (error, rows) => {
    if (error) throw error;
    console.log('User info is: ', rows);
    res.send(rows);
  });
  // connection.end();
});

app.post('/static/public/login', function (req, res) {
    var body = "";
    req.on('data', function(chunk){
      body += chunk;
    });
    req.on('end',function(){
      var data = qs.parse(body);
      id = data.id//
      pw = data.pw//
      // connection.connect();
      if(id==""||pw==""){
        res.send(`
        <script type="text/javascript">
          alert('Please enter the ID and PW.'); location.href='/';
        </script>
        `);
        return;
      }
      console.log('error 80')
      connection.query('SELECT * FROM web.user WHERE id = ?',[id], function (error, results, fields) {
          if (error) {
            console.log('error 82')
          }
          else{
            console.log(results[0]);
            if(results.length==0){
              res.send(`
              <script type="text/javascript">
                alert('No matched ID.'); location.href='/';
              </script>
              `);
              return;
            }//////////////여기서부터 Login 봐야함.
            else if(results[0].pw == pw && id == 'admin'){
              console.log("admin login!");
              res.cookie('who','admin',{maxAge: 300000000,withCredentials:true});   // 30000밀리초 → 30초
              res.cookie('id',id,{maxAge: 300000000, withCredentials:true});
              res.send(`
              <script type="text/javascript">
                alert('Administrator login.'); location.href='/';
              </script>
              `);
            }
            else if(results[0].pw == pw && id != 'admin'){
                console.log("user login!");
                id = results[0].id;
                phone = results[0].phone;
                console.log(id);
                res.cookie('who','user',{maxAge: 300000000,withCredentials:true});   // 30000밀리초 → 30초

                // res.cookie('phone',phone,{maxAge: 30000});
                res.cookie('id',id,{maxAge: 300000000, withCredentials:true});
                // res.render('index',{who:'user',id:id});
                // res.redirect('/');
                res.send(`
                <script type="text/javascript">
                  alert('Welcome to SKKU Flea market.'); location.href='/';
                </script>
                `);
            }
            else{
              res.send(`
              <script type="text/javascript">
                alert('Login Failed. Please double check your ID & PW.'); location.href='/';
              </script>
              `);
              return;
            }
          }
      });
      // connection.end();

    });
});


app.post('/static/public/sign_up', function(req, res){
  var body = "";
  req.on('data', function(chunk){
    body += chunk;
  });
  req.on('end',function(){
    // connection.connect();
    var data = qs.parse(body);
    id = data.id//
    pw = data.pw//
    // name = data.name
    phone = data.phone
    email = data.email
    department = data.department
    grade = data.grade
    agreeterm = data.agreeterm

    if(id==""||pw==""||phone==""||email==""||department==""||grade==""){
      res.send(`
      <script type="text/javascript">
        alert('Please enter all boxes!');location.href='/';
      </script>
      `);
      return;
    }
    if(agreeterm != "on") {
      res.send(`
      <script type="text/javascript">
        alert('Please agree to the term!');location.href='/';
      </script>
      `);
      return;
    }
    console.log('phone.length');
    console.log(phone.length);
    if(phone.length < 8 || phone.length > 11){ //Later. 핸드폰 번호 길이 수정.
      res.send(`
      <script type="text/javascript">
        alert('Enter the phone number properly.');location.href='/';
      </script>
      `);
      return;
    }
    // connection.connect();
    var user = {
      'id' : id,
      'pw' : pw,
      // 'name' : name,
      'phone' : phone,
      'email' : email,
      'department' : department,
      'grade' : grade
    }
    connection.query('select * from web.user where id=?',[id], function (error, results, fields){
      if(error) {
          console.log(error);
      }else{
        console.log(results[0]);
        if(results.length>0){  //duplicate id
          res.send(`
          <script type="text/javascript">
            alert('ID already exists. Try new ID');location.href='/';
          </script>
          `);
          return;
        }else{
          connection.query('INSERT INTO web.user SET ?', user, function (error, results, fields) {
              if (error) {
                  console.log(error);
              }
          });

          console.log('User Registered');
          // res.redirect('/static/public/login.html');
          res.send(`
                      <script type="text/javascript">
                        alert('Welcome to SKKU Fleamarket. Registration succeeded'); location.href='/';
                      </script>
          `);

        }
      }
    });
    // connection.end();
  });
});

app.get('/logout', function (req, res) {
  res.cookie('who','none',{
        maxAge:0
  });
  res.cookie('id','none',{
        maxAge:0
  });
      console.log("로그아웃");
      res.send(`
      <script type="text/javascript">
        alert('Logout completed.'); location.href='/';
      </script>
      `);
});

app.use(function(req,res){
    res.status(404).send("Not Found");
} );

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    socket.on('req_call', function (msg) {
        io.emit('res_call', msg);
    });
});

server.listen(PORT, function () {
    console.log("SERVER ON");
});
