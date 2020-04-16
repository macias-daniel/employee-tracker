const connection = require("./connection");
require("console.table")
// =============================


const orm = {
    //Allow user to create departments
    createDepartment: (department_name) => {
        connection.query(`INSERT INTO department (department_name) VALUES (?)`,
        [department_name], 
        (err, res)=>{
            if(err) throw err;
        })
    },

    //Allow user to create roles
    createRole: (title_name, salary, department_id) => {
        connection.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`,
        [title_name, salary, department_id], 

        (err, res)=>{
            if(err) throw err;
        })
    },

    //Allow user to create employees
    createEmployee: (first_name, last_name, role_id, manager_id) => {

        //Set manager id = null if manger id = 0  was selected
        if(manager_id = 0) manager_id = null
        connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
        [first_name, last_name, role_id, manager_id], 
        (err, res)=>{
            if(err) throw err;
        })
    },

// =============================

//Allow user to view selected table
    viewAllEmployeeData: (cb) =>{

        connection.query(
        `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.department_name 
        FROM employee 
        INNER JOIN role ON employee.role_id = role.id 
        INNER JOIN department 
        ON department.id = role.department_id`,
        (err, res)=>{
            if(err) throw err

            cb(res)
        })
        
    },

    viewEmployees: (cb) =>{

        connection.query(`SELECT * FROM employee`,
        (err, res)=>{
            if(err) throw err

            cb(res)
        })
        
    },

    viewRoles: (cb) =>{

        connection.query(`SELECT * FROM role`,
        (err, res)=>{
            if(err) throw err

            cb(res)
        })
        
    },

    viewDepartment: (cb) =>{

        connection.query(`SELECT * FROM department`,
        (err, res)=>{
            if(err) throw err

            cb(res)
        })
        
    },

// =============================

//Allow user to update employee roles
    updateEmployeeRole: (whichEmployee, newRoleId) => {

        connection.query(`UPDATE employee SET role_id = ? WHERE id = ?`,
        [newRoleId, whichEmployee],
        (err, res)=>{
            if (err) throw err;
        })
    },

    endConnection: () => {
        connection.end()
    }
}


module.exports = orm;