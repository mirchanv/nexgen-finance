"use strict";

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2025-07-22T17:01:17.194Z",
    "2025-07-25T23:36:17.929Z",
    "2025-07-28T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account3 = {
  owner: "Vishal Mirchandani",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.8,
  pin: 3333,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "INR",
  locale: "hi-IN",
};

const accounts = [account1, account2, account3];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelTime = document.querySelector(".time");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");
const dateElement = document.querySelector(".date");
const timeElement = document.querySelector(".time");

const btnLogin = document.querySelector(".login__btn");
const btnLogout = document.querySelector(".btn--logout");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const loginBtn = document.getElementById("loginBtn");
const loginDiv = document.getElementById("loginDiv");
const profileDiv = document.getElementById("profileDiv");

const todaysDate = new Date();

const formatMovementDate = function (date, userLocale) {
  // 24hours in a day, 60mins in 1hour, 60 seconds in 1min, 1000ms in 1sec
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(date);
  console.log(new Date().toDateString());
  console.log("daysPassed:", daysPassed);

  if (daysPassed == 0) return "Today";
  if (daysPassed == 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  return Intl.DateTimeFormat(userLocale, options).format(date);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";

  const combinedMovsDates = acc.movements.map((currMov, i) => {
    return { movement: currMov, movementDate: acc.movementsDates[i] };
  });

  if (sort) combinedMovsDates.sort((a, b) => a.movement - b.movement);

  combinedMovsDates.forEach(function (obj, index) {
    const { movement, movementDate } = obj;
    const type = movement >= 0 ? "deposit" : "withdrawal";
    const date = new Date(movementDate);
    const transactionDate = formatMovementDate(date, acc.locale);
    const formattedMov = formatNumber(acc, movement);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type} mr-[2rem]">
                ${index + 1} ${type}
        </div>
        <div class="movements__date">${transactionDate}</div>
        <div class="movements__value ml-auto">${formattedMov}</div>
      </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const showDashboard = function () {
  // The pointerEvents CSS property controls whether an element can receive mouse or pointer events (like clicks, hovers, etc.).
  // When you set pointerEvents = "none", the element cannot be clicked or interacted with.
  // When you set pointerEvents = "auto", the element can be clicked and interacted with as normal.
  loginDiv.style.opacity = "0";
  loginDiv.style.pointerEvents = "none";
  loginDiv.style.zIndex = "0";

  app.style.opacity = "1";
  app.style.pointerEvents = "auto";
  app.style.zIndex = "2";

  const now = new Date();
  const options = {
    hour: "numeric",
    minute: "numeric",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    weekday: "short",
  };

  labelDate.textContent = Intl.DateTimeFormat(currAcc.locale, options).format(
    now
  );
};

const showLogin = function () {
  // Hide the app/dashboard
  app.style.opacity = "0";
  app.style.pointerEvents = "none";
  app.style.zIndex = "0";

  // Show the login page
  loginDiv.style.opacity = "1";
  loginDiv.style.pointerEvents = "auto";
  loginDiv.style.zIndex = "2";
};

const updateWelcomeMessage = function (name) {
  labelWelcome.textContent = `Welcome back, ${name.split(" ")[0]}`;
};

// computing usernames
const createUsernames = function (accs) {
  accs.forEach(function (currAcc) {
    currAcc.username = currAcc.owner
      .toLocaleLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};

createUsernames(accounts);

const calcDisplaySummary = function (acc) {
  const totalInflow = acc.movements
    .filter((amount) => amount > 0)
    .reduce((total, amount) => total + amount, 0);

  const totalOutflow = acc.movements
    .filter((amount) => amount < 0)
    .reduce((total, amount) => total + Math.abs(amount), 0);

  const interest = acc.movements
    .filter((amount) => amount > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((interest) => interest >= 1)
    .reduce((totalInt, currInt) => totalInt + currInt, 0);

  labelSumIn.textContent = formatNumber(acc, totalInflow);
  labelSumOut.textContent = formatNumber(acc, totalOutflow);
  labelSumInterest.textContent = formatNumber(acc, interest);
};

const getAccBanlance = function (acc) {
  acc.balance = acc.movements.reduce(function (total, currAmount) {
    total += currAmount;
    return total;
  }, 0);
  return acc.balance;
};

const displayAccBalance = function (acc) {
  labelBalance.textContent = formatNumber(acc, getAccBanlance(acc));
};

const findUser = function (usernameInput) {
  return accounts.find((acc) => acc.username === usernameInput);
};

const updateUI = function (currAcc) {
  // display balance
  displayAccBalance(currAcc);

  // display movements
  displayMovements(currAcc);

  // display summary
  calcDisplaySummary(currAcc);
};

const formatNumber = function (acc, value) {
  return Intl.NumberFormat(acc.locale, {
    style: "currency",
    currency: acc.currency,
  }).format(value);
};

// sounds ----------------------------------------------------------------

const notifySucess = function () {
  const success = new Audio("./audio/success.mp3");
  success.play();
};

const notifyError = function () {
  const error = new Audio("./audio/error.mp3");
  error.play();
};

const logout = function () {
  btnLogout.classList.add("hidden");
  labelWelcome.textContent = "Login to get started";
  showLogin();
};

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.floor(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // in each call print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // when time reaches 0 stop timer and logout user
    if (time === 0) {
      clearInterval(timer);
      logout();
    }

    // decrease 1second
    time--;
  };

  // set the timer to 5 minutes
  let time = 600;

  // call the timer every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

// event handlers --------------------------------------------------------

let currAcc, timer;

// login button
loginBtn.addEventListener("click", function (e) {
  // prevent form from submitting
  e.preventDefault();

  // get user account
  currAcc = findUser(inputLoginUsername.value);

  if (currAcc?.pin === +inputLoginPin.value) {
    // clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginUsername.blur();
    inputLoginPin.blur();
    loginBtn.blur();

    // display UI and welcome message
    showDashboard();
    updateWelcomeMessage(currAcc.owner);

    // update UI
    updateUI(currAcc);

    btnLogout.classList.remove("hidden");
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();
  }
});

// logout button
btnLogout.addEventListener("click", function () {
  logout();
});

// transfer button
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const receiverAcc = findUser(inputTransferTo.value);
  const amount = +inputTransferAmount.value;

  if (
    amount > 0 &&
    receiverAcc &&
    currAcc?.balance >= amount &&
    currAcc.username !== receiverAcc?.username
  ) {
    // transfer money
    currAcc.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // adding transfer dates
    currAcc.movementsDates.push(todaysDate.toISOString());
    receiverAcc.movementsDates.push(todaysDate.toISOString());

    // update UI
    updateUI(currAcc);

    notifySucess();
  } else {
    notifyError();
  }

  // reset timer
  clearInterval(timer);
  timer = startLogOutTimer();

  // clear input fields
  inputTransferTo.value = inputTransferAmount.value = "";
});

// request loan button
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const requestedLoanAmount = Math.floor(inputLoanAmount.value);

  // check if there are any deposits >= 10% of requested loan amount
  setTimeout(() => {
    if (
      requestedLoanAmount > 0 &&
      currAcc.movements.some((amount) => amount >= requestedLoanAmount * 0.1)
    ) {
      // add money to account
      currAcc.movements.push(requestedLoanAmount);

      // add date of loan retrieval to movementsDates
      currAcc.movementsDates.push(todaysDate.toISOString());

      // update UI
      updateUI(currAcc);

      notifySucess();
    } else {
      notifyError();
    }
  }, 2000);

  // reset timer
  clearInterval(timer);
  timer = startLogOutTimer();

  // clear input fields
  inputLoanAmount.value = "";
});

// close account button
btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    currAcc.username === inputCloseUsername.value &&
    currAcc.pin === +inputClosePin.value
  ) {
    // get index of user obj to be deleted
    const index = accounts.findIndex(
      (user) => user.username === currAcc.username
    );

    // delete account
    accounts.splice(index, 1);

    inputCloseUsername.value = inputClosePin.value = "";
    notifySucess();

    setTimeout(() => {
      logout();
    }, 2000);
  } else {
    notifyError();
  }
});

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currAcc, !sorted);
  sorted = !sorted;
});
