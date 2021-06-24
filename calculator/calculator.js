const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.set("port", 5763);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (num2 === 0) {
    return "Error. Cannot divide by zero";
  }
  return num1 / num2;
}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function calculate(num1, num2, operation) {
  const isValid = ["add", "subtract", "divide", "multiply"];
  if (isValid.includes(operation)) {
    return eval(operation + `(${num1}, ${num2})`);
  } else {
    return "Sorry, invalid input";
  }
}

function calculateBMI(height, weight) {
  return weight / (height * height);
}

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const num1 = Number(req.body.num1);
  const num2 = Number(req.body.num2);
  const operation = req.body.operation;
  res.send(`Your answer is ${calculate(num1, num2, operation)}`);
});

app.get("/bmicalculator", function (req, res) {
  res.sendFile(
    __dirname + "/BMICalculatorWithServerCommunications/bmiCalculator.html"
  );
});

app.post("/bmicalculator", function (req, res) {
  console.log(req);
  const heightInMeters = Number(req.body.height) / 39.3;
  const weightInKilograms = Number(req.body.weight) * 0.45;
  res.send(`Your BMI is ${calculateBMI(heightInMeters, weightInKilograms)}.`);
});

app.listen(app.get("port"), function () {
  console.log(
    "Express started on http://localhost:" +
      app.get("port") +
      "; press Ctrl-C to terminate."
  );
});
