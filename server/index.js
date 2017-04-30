
var express = require('express');
var cors = require('cors'); // for cross origin resourse sharing
var bodyParser = require('body-parser');    //get payload from requests like post and put
var validate = require('express-validation');
var validations = require('./validations'); // to do

var sqlite3 = require('sqlite3').verbose(); //sqlite database
var dbb = new sqlite3.Database('./server/test.db');

var app = express(); //express server
app.use(cors());
app.use(bodyParser.json());

var employees = []; //global variable to store data

//function to check if any seachkey is present in value of an array of objects
function filterIt(arr, searchKey) {
  return arr.filter(obj => Object.keys(obj).some(key =>
    obj[key].toString().toLowerCase().includes(searchKey)
    ));
}

//function to get all employees from database
function selectAllData(res){
    dbb.all("SELECT * from employees", function(err,rows){
        if(!err){
            employees = rows;
            console.log("data in selectAllData :", employees);  //debug purpose
            res.json({employees});
        } else {
            console.log("error occured in selectAllData");
            res.status(500).send("error");
        }
    });
}

//function to find query related data from database, first gets all data and then uses filter with query
function findQueryData(query, res){
    dbb.all("SELECT * from employees", function(err, rows){
        if(!err){
            console.log("data in findquery :", rows);       //debug purpose
            employees = filterIt(rows, query);
            res.json({employees});
        } else {
            console.log("error occured in findQueryData", err);
            res.status(500).send("error");
        }
    });
}

//function to get particular employee from database
function selectData(id, res){
    dbb.all("SELECT * from employees where id="+id, function(err,rows){
        if(!err){
            console.log("data in selectdata: ",rows);        //debug purpose
            employees = rows;
            res.json({employees});
        } else {
            console.log("error occured in selectData");
            res.status(500).send("error");
        }
    });
}

//function to insert new employee in database
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
                res.json("insert success");
            }else{
                console.log("error occured in insertData :", err);
                res.status(500).send("error");
        }
    });
}

//function to update data of particular employee in database
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
                res.send("update success");
            }else{
                console.log("error occured in updateData :", err);
                res.status(500).send("error");
            }
        }
    );
}

//function to delete a employee from database
function deleteData(id, res){
    dbb.run(
        "DELETE from employees where id="+id, function(err){
            if(!err){
                console.log("delete success");
                res.send("delete sucess");
            }else{
                console.log("error occured in deleteData :", err);
                res.status(500).send("error");
            }
        }
    );
}

//GET request handler for all employee data, also handles request query
app.get('/employees', function (req, res, next){
//console.log("query", req.query)                     //debug purpose
    if(req.query.q){                                  //if query is present handle find query related data
        findQueryData(req.query.q, res);
    } else {
        selectAllData(res);
    }
});

//GET request handler for particular employee data using id
app.get('/employees/:id', function (req, res, next){
    selectData(req.params.id, res);
});

//POST request handler to add save new employee
app.post('/employees', function (req, res, next){
    console.log("post req body: ", req.body );
    insertData(req.body, res);
});

//POST request handler to update a employee data
app.put('/employees/:id', function (req, res, next){
    console.log("put req body: ", req.body );
    updateData(req.body, res);
});

//DELETE request handler to delete data
app.delete('/employees/:id', function (req, res, next){
    deleteData(req.params.id, res);
});

//start server on particular port
app.listen(8081);
