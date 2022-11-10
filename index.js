const inquirer = require("inquirer")
const mySQL = require("mysql2")

const db = mySQL.createConnection({
    database: "employees_db",
    user: "root",
    password: "password",
    host: "localhost"
})

db.connect(err => {
    if (err) throw err;
    else { start() }
})

function start() {
    inquirer.prompt([
        {
            name: "todo",
            message: "What would you like to do?",
            type: "list",
            choices: [
                "Add Department",
                "Add Role",
                "Add Employee",
                "Update Employee Role",
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "None"
            ]
        }
    ])
        .then(input => {
            if (input.todo == "View All Departments") {
                db.query(`select * from department`, (err, res) => {
                    console.table(res)
                    start()
                })
            }
            else if (input.todo == "View All Roles") {
                db.query(`select * from role`, (err, res) => {
                    console.table(res)
                    start()
                })
            }
            else if (input.todo == "View All Employees") {
                    db.query(`select * from employee`, (err, res) => {
                        console.table(res)
                        start()
                    })
            }
            else if (input.todo == "Add Department") {
                inquirer.prompt([
                    {
                        name: "deptname",
                        message: "What is the name of the department?",
                        type: "input"
                    }

                ])
                .then(deptdata => {
                    db.query(`insert into department(name) values("${deptdata.deptname}")`, (err, res) => {
                        console.table(res)
                        start()
                    })
                })
            }
            else if (input.todo == "Add Role") {
                inquirer.prompt([
                    {
                        name: "rolename",
                        message: "What role would you like to add?",
                        type: "input"
                    },
                    {
                        name: "rolesalary",
                        message: "What salary is this position?",
                        type: "input"
                    },
                    {
                        name: "deptid",
                        message: "What is the department ID for this role?",
                        type: "input"
                    }
                ])
                .then(roledata => {
                    db.query(`insert into role(title, salary, department_id) values("${roledata.rolename}", ${roledata.rolesalary}, ${roledata.deptid});`, (err, res) => {
                        console.table(res)
                        start()
                    })
                })
            }
            else if (input.todo == "Add Employee") {
                inquirer.prompt([
                    {
                        name: "firstname",
                        message: "What is the employee's first name?",
                        type: "input"
                    },
                    {
                        name: "lastname",
                        message: "What is the employee's last name?",
                        type: "input"
                    },
                    {
                        name: "roleid",
                        message: "What is the role ID for this employee?",
                        type: "input"
                    },
                    {
                        name: "managerid",
                        message: "What is the manager ID for this employee?",
                        type: "input"
                    }
                ])
                .then(employeedata => {
                    db.query(`insert into employee(first_name, last_name, role_id, manager_id) values("${employeedata.firstname}", "${employeedata.lastname}", ${employeedata.roleid}, ${employeedata.managerid});`, (err,res) => {
                        console.table(res)
                        start()
                    })
                })
            }
            else if (input.todo == "Update Employee Role") {
                inquirer.prompt([
                    {
                        name: "employeeid",
                        message: "Which employee do you need to update?",
                        type: "input"
                    },
                    {
                        name: "newrole",
                        message: "What is this employee's new role?",
                        type: "input"
                    }
                ])
                .then(updatedata => {
                    db.query(`update employee(role)`)
                })
            }
            })
}