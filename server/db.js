var faker = require('faker');
var _ = require('lodash');

module.exports = function() {
  var data = {
    name: [],
    employees: [],
  };

  // Create categories
  for (var i = 1; i <= 5; i++) {
    data.name.push({
      id: i,
      name: _.capitalize(faker.lorem.word())
    });
  }

  // Create posts
  for (var i = 1; i <= 5; i++) {
    data.employees.push({
      id: i,
      name: _.shuffle(data.name)[0].name,
      address: faker.lorem.sentence().slice(0,-1),
      phone: i,
      email:"a@b",
      job: "engineer",
      salary: "$1000"
//      body: faker.lorem.lines()
    });
  }

  return data;
}();
