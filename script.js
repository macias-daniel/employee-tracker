const inquirer = require("inquirer")
const orm = require("./config/orm"); 

//================================= //Inquirer prompts

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
        type: "list",
        name: "role_id",
        message: `What is this employees role`,
        choices: []
    },
    {
        type: "list",
        name: "manager_name",
        message: `Who is this employees manager?`,
        choices: [`None`]
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
        type: "list",
        name: "roleDepartment",
        message: `What department is this role a part of?`,
        choices: []
    }

]

const createNewDepartmentText = [
    {
        type: "input",
        name: "departmentName",
        message: `What is this departments name?`
    }
]

const updateEmployeeText = [
    {
        type: "list",
        name: "employeeName",
        message: `What is the name of the employee you want to update?`,
        choices: []
    },
    {
        type: "list",
        name: "updateName",
        message: `Which department would you like to change this employee to?`,
        choices: []
    }
]

//================================= //Inquirer function prompts and orm functions

//Main evenet handling
function mainPrompt(){

    //Main Prompt
    inquirer.prompt(optionMenuText).then(response => {

        if(response.action === "View all employees"){
    
            //Display Employees
            orm.viewAllEmployeeData((res)=>{
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

            //Change employees role
            updateEmployee ()

        } else {
            orm.endConnection()        
        }

    })

}

//Create employee
function promptEmployeeCreation (){

    orm.viewRoles(roleResult =>{

        //Change inquirer prompt depending on the already created roles
        roleResult.forEach(element => {createNewEmployeeText[2].choices.push(element.title)});

        if(roleResult.length < 1){

            console.log()
            console.log("\x1b[31m", "No roles have been created! Create one then you can create an employee!")
            console.log()

            return mainPrompt()
        }

        orm.viewEmployees(employeesResult =>{
            
            //Change inquirer prompt depending on the already created employees
            employeesResult.forEach(element => {createNewEmployeeText[3].choices.push(`${element.first_name} ${element.last_name}`)});
            
            //Start inquirer prompting
            inquirer.prompt(createNewEmployeeText).then(employeeAnswers => {

                //Finds the role object that was selected by user choice
                const roleObj = roleResult.find(element => element.title === employeeAnswers.role_id);

                //Finds the employee object that was selected by user choice
                let employeeObj = employeesResult.find(element => `${element.first_name} ${element.last_name}` === employeeAnswers.manager_name);

                
                //If no manager was selected set id = 0 
                if(employeeObj === undefined) employeeObj = {id: 0}

                //Create employee object
                orm.createEmployee(employeeAnswers.first_name.trim(), employeeAnswers.last_name.trim(), roleObj.id, employeeObj.id)

                //Spacing
                console.log()

                //Reset text prompt array values
                createNewEmployeeText[2].choices = []
                createNewEmployeeText[3].choices = [`None`]

                //Return to main prompt
                mainPrompt()
            })
        })
    })
}

//Create role
function promptRoleCreation (){
    orm.viewDepartment(departmentResult => {

        //Update role creation prompt to include created departments
        departmentResult.forEach(element => {createNewRoleText[2].choices.push(element.department_name)});

        
        if(departmentResult.length < 1){

            console.log()
            console.log("\x1b[31m", "No departments have been created! Create one then you can create a role!")
            console.log()

            return mainPrompt()
        }

        //Prompt user for role creation
        inquirer.prompt(createNewRoleText).then(employeeAnswers => {
            
            const departmentObj = departmentResult.find(element => element.department_name ===  employeeAnswers.roleDepartment);

            //Create new role
            orm.createRole(employeeAnswers.roleName, employeeAnswers.roleSalary, departmentObj.id)

            //Reset Prompt
            createNewRoleText[2].choices = []

            mainPrompt()
        
        })

    })
}

//Create departments
function promptDepartmentCreation (){

    inquirer.prompt(createNewDepartmentText).then(employeeAnswers => {

        //Create new employee based on inquirer prompt
        console.log()
        orm.createDepartment(employeeAnswers.departmentName)
        mainPrompt()

    })
}

function updateEmployee () {

    orm.viewEmployees(employeesResult =>{

        //If there are no employees exit out of the process and return to main prompt
        if(employeesResult.length < 1){

            console.log()
            console.log("\x1b[31m", "No employees have been created! Create one then you can change his/her role!")
            console.log()

            return mainPrompt()
        }

        employeesResult.forEach(element => {updateEmployeeText[0].choices.push(`${element.first_name} ${element.last_name}`)});

        orm.viewRoles(roleResult =>{

            roleResult.forEach(element => {updateEmployeeText[1].choices.push(element.title)});
        
            inquirer.prompt(updateEmployeeText).then(updateData =>{

                //Finds the employee object that was selected by user choice
                let employeeObj = employeesResult.find(element => `${element.first_name} ${element.last_name}` === updateData.employeeName);

                //Finds the role object that was selected by user choice
                const roleObj = roleResult.find(element => element.title === updateData.updateName);
                
                orm.updateEmployeeRole(employeeObj.id, roleObj.id)

                updateEmployeeText[0].choices = []
                updateEmployeeText[1].choices = []

                mainPrompt()
            })

        })

    })
}
//================================= //Function calls

mainPrompt()


