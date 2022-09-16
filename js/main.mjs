// const terminatorJSON =
//   '{"name": "t800", "skin": "humanskin", "wepon": true, "ammo": 100}';

// const terminator = JSON.parse(terminatorJSON);
// console.log(terminator);

// localStorage.setItem("name");

// localStorage.setItem("firstName", "ole");
// localStorage.setItem("lastName", "Normann");

// localStorage.removeItem("firstName");

// const lastName = localStorage.getItem("lastName");

// console.log(lastName);

localStorage.clear();

const person = {
  fistName: "ole",
  lastName: "normann",
  isadmin: "false",
};

const jsonPerson = JSON.stringify(person);

localStorage.setItem("person", jsonPerson);

const personRetrived = localStorage.getItem("person");
console.log(personRetrived);
