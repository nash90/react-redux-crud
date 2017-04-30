//var jsonServer = require('json-server');  //used for mock during development
var db = require('./db');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var validate = require('express-validation');
var validations = require('./validations'); // to do

var app = express();

app.use(cors());
app.use(bodyParser.json());

var sqlite3         =       require('sqlite3').verbose();
var dbb              =       new sqlite3.Database('./test.db');
var employees = [];

function filterIt(arr, searchKey) {
  return arr.filter(obj => Object.keys(obj).some(key =>
    obj[key].toString().toLowerCase().includes(searchKey)
    ));
}

function selectAllData(res){
    dbb.all("SELECT * from employees", function(err,rows){
        if(!err){
//            console.log("data : ",rows);
            employees = rows;
            console.log("data in selectAllData :", employees);
            res.json({employees});
        } else {
            console.log("error occured in selectAllData");
            res.status(500);
        }
    });
}

function findQueryData(query, res){
    dbb.all("SELECT * from employees", function(err, rows){
        if(!err){
            console.log("data in findquery :", rows);
            employees = filterIt(rows, query);
            res.json({employees});
        } else {
            console.log("error occured in findQueryData", err);
            res.status(500);
        }
    });
}

function selectData(id, res){
    dbb.all("SELECT * from employees where id="+id, function(err,rows){
        if(!err){
            console.log("data of select data: ",rows);
            employees = rows;
//            console.log("data in employe selectData :", employees);
            res.json({employees});
        } else {
            console.log("error occured in selectData");
            res.status(500);
        }
    });
}

function insertData(data, res){
    dbb.run("INSERT into employees(name, address, phone, email, job, salary) values('"
        +data.name+"' ,'"
        +data.address+"' ,'"
        +data.phone+"' ,'"
        +data.email+"' ,'"
        +data.job+"' ,'"
        +data.salary+"');",
        function (err){
            if(!err){
                console.log("insert success");
                res.status(200);
            }else{
                console.log("error occured in insertData :", err);
                res.status(500);
        }
    });
}

function updateData(data, res){
console.log("data value is :", data)
    dbb.run(
        "UPDATE employees SET name='"+data.name
        + "', address='" +data.address
        + "', phone='" +data.phone
        + "', email='" +data.email
        + "', job='" +data.job
        + "', salary='" +data.salary
        +"' where id ='"
        +data.id+ "'",
        function (err){
            if(!err){
                console.log("update success");
                res.status(200);
            }else{
                console.log("error occured in updateData :", err);
                res.status(500);
            }
        }
    );
}

function deleteData(id, res){
    dbb.run(
        "DELETE from employees where id="+id, function(err){
            if(!err){
                console.log("delete success");
                res.status(200);
            }else{
                console.log("error occured in deleteData :", err);
                res.status(500);
            }
        }
    );
}

app.get('/employees', function (req, res, next){
//console.log("query", req.query)
    if(req.query.q){
        findQueryData(req.query.q, res);
    } else {
        selectAllData(res);
    }
});

app.get('/employees/:id', function (req, res, next){
    selectData(req.params.id, res);
});

app.post('/employees', function (req, res, next){
    console.log("post req body: ", req.body );
    insertData(req.body, res);
});

app.put('/employees/:id', function (req, res, next){
    console.log("put req body: ", req.body );
    updateData(req.body, res);
});

app.delete('/employees/:id', function (req, res, next){
    deleteData(req.params.id, res);
});


app.listen(8081);
