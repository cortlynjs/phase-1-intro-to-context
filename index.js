function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  };
}

function createEmployeeRecords(arrayOfArrays) {
  return arrayOfArrays.map(function(array) {
    return createEmployeeRecord(array);
  });
}

function createTimeInEvent(employee, dateTimeString) {
  let [date, hour] = dateTimeString.split(' ');

  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date: date
  });

  return employee;
}

function createTimeOutEvent(employee, dateTimeString) {
  let [date, hour] = dateTimeString.split(' ');

  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date: date
  });

  return employee;
}

function hoursWorkedOnDate(employee, date) {
  let timeIn = employee.timeInEvents.find(function(e) {
    return e.date === date;
  });

  let timeOut = employee.timeOutEvents.find(function(e) {
    return e.date === date;
  });

  return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employee, date) {
  let hoursWorked = hoursWorkedOnDate(employee, date);
  return hoursWorked * employee.payPerHour;
}

function allWagesFor(employee) {
  let dates = employee.timeInEvents.map(function(e) {
    return e.date;
  });

  let payable = dates.reduce(function(memo, d) {
    return memo + wagesEarnedOnDate(employee, d);
  }, 0);

  return payable;
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(function(e) {
    return e.firstName === firstName;
  });
}

function calculatePayroll(arrayOfEmployees) {
  return arrayOfEmployees.reduce(function(memo, employee) {
    return memo + allWagesFor(employee);
  }, 0);
}
