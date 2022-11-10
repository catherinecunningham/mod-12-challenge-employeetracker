const inquirer = require("inquirer")
const mySQL = require("mysql2")

const db = mySQL.createConnection({
    database: "employees_db",
    user: "root",
    password: "password",
    host: "localhost"
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
        if(input.todo == "View All Departments") {
            db.query(`select * from department`, (err, res) => {
                console.table(res)
            })
        }
    })
}