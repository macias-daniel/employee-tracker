const inquirer = require("inquirer")
const orm = require("./config/orm"); 



//Inquirer prompts
const optionMenuText = 
[
    {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [ "View all employees", "View all departments", "View all roles", "Add a new employee", "Create a new role", "Create a new department", "Update employee role" , "Quit"]
    }
]

const createNewEmployeeText = 
[
    {
        type: "input",
        name: "first_name",
        message: `What is this employees first name?`
    },
    {
        type: "input",
        name: "last_name",
        message: `What is this employees last name?`
    },
    {
        type: "input",
        name: "role_id",
        message: `What is this employees role`
    },
    {
        type: "input",
        name: "manager_id",
        message: `Who is this employees manager?`
    },

]

const createNewRoleText = 
[

    {
        type: "input",
        name: "roleName",
        message: `What is this roles name?`
    },
    {
        type: "input",
        name: "roleSalary",
        message: `What is this roles salary?`
    },
    {
        type: "input",
        name: "roleDepartment",
        message: `What department is this role a part of?`
    }

]

const createNewDepartmentText = [
    {
        type: "input",
        name: "departmentName",
        message: `What is this departments name?`
    }
]

function mainPrompt(){

    //Main Prompt
    inquirer.prompt(optionMenuText).then(response => {

        if(response.action === "View all employees"){
    
            //Display Employees
            orm.viewEmployees((res)=>{
                console.log()
                console.table(res)
                mainPrompt()
            })


        } else if(response.action === "View all roles"){
    
            //Display Roles
            
            orm.viewRoles((res)=>{
                console.log()
                console.table(res)
                mainPrompt()
            })


        }else if(response.action === "View all departments"){
    
            //Display Departments
            
            orm.viewDepartment((res)=>{
                console.log()
                console.table(res)
                mainPrompt()
            })


        } else if(response.action === "Add a new employee"){

            //Create employee
            promptEmployeeCreation()

        } else if(response.action === "Create a new role"){

            //Create role
            promptRoleCreation()

        } else if(response.action === "Create a new department"){

            //Create Department
            promptDepartmentCreation()

        } else if(response.action === "Update employee role"){

        } else {
            orm.endConnection()        
        }

    })

}

function promptEmployeeCreation (){

    inquirer.prompt(createNewEmployeeText).then(employeeAnswers => {

        //Create new employee based on inquirer prompt
        orm.createEmployee(employeeAnswers.first_name.trim(), employeeAnswers.last_name.trim(), employeeAnswers. role_id, employeeAnswers.manager_id)
        console.log()

        mainPrompt()


    })
}

function promptRoleCreation (){

    inquirer.prompt(createNewRoleText).then(employeeAnswers => {

        //Create new role based on inquirer prompt
        
        orm.createRole(employeeAnswers.roleName, employeeAnswers.roleSalary, employeeAnswers.roleDepartment)
        console.log()
        mainPrompt()


    })
}

function promptDepartmentCreation (){

    inquirer.prompt(createNewDepartmentText).then(employeeAnswers => {

        //Create new employee based on inquirer prompt
        console.log()
        orm.createDepartment(employeeAnswers.departmentName)
        mainPrompt()

    })
}


mainPrompt()


