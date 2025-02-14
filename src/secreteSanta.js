 const Employee = require("./employee");

class SecretSanta {
  
  constructor(employees, lastYearAssignments) {
    //EmplyeesData
    this.employees = employees.map(
      (e) => new Employee(e.Employee_Name, e.Employee_EmailID)
    );

    //lastsecreteAssignments
    this.lastYearAssignments = new Map(
      lastYearAssignments.map((entry) => [
        entry.Employee_EmailID,
        entry.Secret_Child_EmailID,
      ])
    );
  }

  

  assignSecretSantas() {
    const availableChildren = [...this.employees];
    const assignments = []

    for (const employee of this.employees) {
      const validChildren = availableChildren.filter(
        (child) =>
          child.email !== employee.email && // not self-assigned
          this.lastYearAssignments.get(employee.email) !== child.email // not the same as last year
      );

      if (validChildren.length === 0) {
        throw new Error("No valid Secret Santa assignments possible!");
      }

      // Randomly pick a secret child from the valid list
      const chosenIndex = Math.floor(Math.random() * validChildren.length);
      const secretChild = validChildren[chosenIndex];

      assignments.push({
        Employee_Name: employee.name,
        Employee_EmailID: employee.email,
        Secret_Child_Name: secretChild.name,
        Secret_Child_EmailID: secretChild.email,
      });

      // Remove assigned child from the available list
      availableChildren.splice(availableChildren.indexOf(secretChild), 1);
    }

    return assignments;
  }
}

module.exports = SecretSanta;
