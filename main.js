import inquirer from "inquirer";
class Student {
    name;
    id;
    courses;
    fees;
    constructor(name, id, courses, fees) {
        this.name = name;
        this.id = id;
        this.courses = courses;
        this.fees = fees;
    }
    payfees() {
        console.log("Your fees have been paid");
    }
}
console.log(`Welcome to the Student management system`);
let continueEnroll = true;
let students = [];
let newID = "";
let baseID = 5500;
let courseFee = 0;
let student;
do {
    let askToDO = await inquirer.prompt({
        name: "ask",
        message: "Select what do you want?",
        type: "list",
        choices: ["Enroll Student", "Status", "Exit"],
    });
    if (askToDO.ask === "Enroll Student") {
        let askName = await inquirer.prompt({
            name: "name",
            message: "Enter your name: ",
            type: "input",
        });
        let trimmedName = askName.name.trim();
        console.log(`Welcome ${trimmedName}`);
        baseID++;
        newID = "AK" + baseID;
        console.log(`Your ID is ${newID}`);
        let askCourse = await inquirer.prompt({
            name: "course",
            message: "Please select a course",
            type: "list",
            choices: ["Web Development", "Block Chain", "Generative AI"],
        });
        switch (askCourse.course) {
            case "Web Development":
                courseFee = 3999;
                break;
            case "Block Chain":
                courseFee = 4999;
                break;
            case "Generative AI":
                courseFee = 7499;
                break;
        }
        student = new Student(trimmedName, newID, [askCourse.course], [courseFee]);
        students.push(student);
        console.log(`Fees for ${askCourse.course} course is ${student.fees}`);
        let askForFees = await inquirer.prompt({
            name: "ans",
            message: `Would you like to pay fees`,
            type: "confirm",
        });
        if (askForFees.ans === true) {
            student.payfees();
        }
        else {
            students.pop();
            continue;
        }
        console.log(`You are enrolled in ${askCourse.course} course`);
    }
    else if (askToDO.ask === "Status") {
        if (students.length !== 0) {
            let checkStudent = students.map((elem) => elem.name);
            let askforStudent = await inquirer.prompt({
                name: "ask",
                message: "Select the student",
                type: "list",
                choices: checkStudent,
            });
            let foundStudent = students.find((student) => student.name === askforStudent.ask);
            console.log(`Student Information`);
            console.log(foundStudent);
        }
        else {
            console.log(`Record is empty`);
        }
    }
    else if (askToDO.ask === "Exit") {
        continueEnroll = false;
    }
} while (continueEnroll);
