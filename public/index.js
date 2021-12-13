// Include packages needed for this application
const inquirer = require('inquirer');
const cTable = require('console.table');

let response = {};
let payLoad = [];

// Create an array of options for user input
const options = ['View All Departments',
                'Add Department',
                'Delete Department',
                'View Department Budget',
                'View All Roles',
                'Add Role',
                'Delete Role',
                'View All Employees',
                'View Employees By Manager',
                'View Employees By Department',
                'Add Employee',
                'Change Employee Role',
                'Change Employee Manager',
                'Delete Employee',
                'Quit'];


// function to view all departments
const viewDepartments = async () => {
    // do something
};

// function to add department
const addDepartment = async () => {
    // do something
};

// function to delete department
const deleteDepartment = async () => {
    // do something
};

// function to view department budget
const viewDepartmentBudget = async () => {
    // do something
};

// function to view all roles
const viewRoles = async () => {
    // do something
};

// function to add role
const addRole = async () => {
    // do something
};

// function to delete role
const deleteRole = async () => {
    // do something
};

// function to view all employees
const viewEmployees = async () => {
    // do something
};

// function to view employees by manager
const viewEmployeesByManager = async () => {
    // do something
};

// function to view employees by department
const viewEmployeesByDepartment = async () => {
    // do something
};

// function to add employee
const addEmployee = async () => {
    // do something
};

// function to change employees role
const updateEmployeeRole = async () => {
    // do something
};

// function to change employees manager
const updateEmployeeManager = async () => {
    // do something
};

// function to delete employee
const deleteEmployee = async () => {
    // do something
};


// function to initialize app
async function init() {
    await inquirer.prompt([
        {
        type: "list",
        name: "choice",
        message: "Select Option from List",
        choices: options
        }
    ]).then(function(data){
        console.log(data);
        response = data;
    });

    switch(response.choice){
        case 'View All Departments':
            await viewDepartments();
            break;
        case 'Add Department':
            await addDepartment();
            break;
        case 'Delete Department':
            await deleteDepartment();
            break;
        case 'View Department Budget':
            await viewDepartmentBudget();
            break;
        case 'View All Roles':
            await viewRoles();
            break;
        case 'Add Role':
            await addRole();
            break;
        case 'Delete Role':
            await deleteRole();
            break;
        case 'View All Employees':
            await viewEmployees();
            break;
        case 'View Employees By Manager':
            await viewEmployeesByManager();
            break;
        case 'View Employees By Department':
            await viewEmployeesByDepartment();
            break;
        case 'Add Employee':
            await addEmployee();
            break;
        case 'Change Employee Role':
            await updateEmployeeRole();
            break;
        case 'Change Employee Manager':
            await updateEmployeeManager();
            break;
        case 'Delete Employee':
            await deleteEmployee();
            break;
        case 'Quit':
            break;
    }   

    process.stdout.write("\u001b[3J\u001b[2J\u001b[1J");
    console.clear();
    console.table(payLoad);

    if (response.choisece != "Quit") {
        response = {};
        init();
    }

}

// Function call to initialize app
init();





//Function to prompt for and save GitUser values
// async function saveGitUser() {
//     await inquirer.prompt([
//         {
//         type: "input",
//         name: "gituser",
//         message: "Enter your Git account."
//         }
//     ]).then(function(data){
//         if (answers.some(test => test.gituser)) {
//             let ind = answers.findIndex(x => x.gituser);
//             answers[ind].gituser=data.gituser;
//         }
//         else {
//             answers.push(data);
//         }
//     });
// };
