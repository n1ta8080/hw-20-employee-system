// object what would be used as a DB
const employeesDB = {};

// Create epmloyee
function createEmployeeRecord(id, name, age, position) {
    if (employeesDB[id]) {
        return `Error: Employe with this ID ${id} already exist!`;
    }
    employeesDB[id] = {
        name,
        age,
        position,
        getId: function() { return id; }
    };
    // use method Object.defineProperty() for creating special property 'id' in object eployeeDB[id]
    Object.defineProperty(employeesDB[id], 'id', {
        get: function() { return id; },
        enumerable: true //property which makes the property visible when enumerating an object's properties (for example, in a for...in loop or when using Object.keys()), info I take this information from mdn web docs
    });
    return `Employee ${name} with ID: ${id} successfully added!`;
}

// Update info
function updateEmployeeRecord(id, name, age, position) {
    if (!employeesDB[id]) { //before updating info we must make sure that employee with this ID already exist
        return `Error: Employee ${id} not found!`;
    }
    if (Object.isFrozen(employeesDB[id])) { // and check if emloyee is not frozen
        return `Error: Recording employee ${id} is impossible as it is frozen and can't be updated!`;
    }
    // Update only provided properties, operator || save old properties if new wasn`t provided
    employeesDB[id].name = name || employeesDB[id].name;
    employeesDB[id].age = age || employeesDB[id].age;
    employeesDB[id].position = position || employeesDB[id].position;
    return `OK! Updatig suceesfully: info about this employee ${id} is suceessfully updated!`;
}


function displayEmployeeRecord(id) {
    if (!employeesDB[id]) {
        return `Error: Employee ${id} not found!`;
    }
    const emp = employeesDB[id];
    return `ID: ${emp.id}, Name: ${emp.name}, Age: ${emp.age}, Position: ${emp.position}`;
}

function freezeEmployeeRecord(id) {
    if (!employeesDB[id]) {
        return `Error: Employee ${id} is not found!`;
    }
    Object.freeze(employeesDB[id]); // after this we can`t add new properties, delete or update them
    return `Recordind employye ${id} is frozen!`;
}

function displayEmployeesList() {
    // Check if employee exist in data base
    if (Object.keys(employeesDB).length === 0) {
        // Object.keys(employeesDB) returns an array of keys (IDs of employees) of the object employeesDB
        // .length === 0 check if array is empty
        return "Employee DB is empty!";
    }
    let list = "Emloyee list:\n";
    for (let id in employeesDB) { // loop which goes through all properties (employee IDs) of the object
        const emp = employeesDB[id]; // for all ID, we get employee object and store it in the emp variable
        // add string with info about current employee
        list += `ID: ${emp.id}, Name: ${emp.name}, Age: ${emp.age}, Position: ${emp.position}\n`;
    }
    return list;
}

function deleteEmployeeRecord(id) {
    if (!employeesDB[id]) {
        return `Error: Employee ${id} not found!`;
    }
    if (Object.isFrozen(employeesDB[id])) {
        return `Error: Employee ${id} is frozen and can't be deleted!`;
    }
    const name = employeesDB[id].name;
    delete employeesDB[id];
    return `Employee ${name} with ID ${id} successfully deleted!`;
}

// Приклади використання:
console.log(createEmployeeRecord("emp-01", "Ivan", 30, "DevOps engineer"));      // successfully added
console.log(createEmployeeRecord("emp-02", "Tom", 25, "Front-end developer"));   // successfully added
console.log(createEmployeeRecord("emp-02", "Nita", 30, "Back-end developer"));   // already 02 exist, fail recording
console.log(createEmployeeRecord("emp-03", "Artem", 20, "UI/UX designer"));      // successfully added
console.log(updateEmployeeRecord("emp-01", "Andrew", 30, "Team leader"));        // update data about emloyee with ID:01 
console.log(updateEmployeeRecord("emp-03", "Artemiy"));                          // update only name, other the same
console.log(displayEmployeeRecord("emp-01"));                                    // dipplayed info about this employee: ID: emp-01, Name: Andrew, Age: 30, Position: Team leader
console.log(freezeEmployeeRecord("emp-02"));                                     // freeze
console.log(updateEmployeeRecord("emp-02", "Nataly", 26, "Head of department")); // can't update because of freeze
console.log(deleteEmployeeRecord("emp-05"));                                     // not found 05 to delete
console.log(deleteEmployeeRecord("emp-01"));                                     // successfully deleted
console.log(displayEmployeesList());             