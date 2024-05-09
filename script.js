'use strict';

// Define data for different user accounts
const accounts = [
  {
    owner: 'Lavell Francis',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // Percentage
    pin: 1111,
    movementsDates: [
      '2022-11-06T21:31:17.178Z',
      '2022-12-07T07:42:02.383Z',
      '2023-01-08T09:15:04.904Z',
      '2023-02-09T10:17:24.185Z',
      '2023-02-10T14:11:59.604Z',
      '2023-02-11T17:01:17.194Z',
      '2023-02-12T23:36:17.929Z',
      '2023-02-13T10:51:36.790Z',
    ],
    currency: 'GBP',
    locale: 'en-UK', // Language/locale setting
  },
  // More accounts can be added here following the structure of account1
];

// DOM Elements for UI interaction
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');
const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

// Buttons and input fields
const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');
const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// Function to format currency
const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

// Function to display movements in the account UI
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[i]);
    const displayDate = new Intl.DateTimeFormat(acc.locale).format(date);
    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// Function to calculate and display balance
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((sum, mov) => sum + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

// Function to calculate and display summary (in, out, interest)
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((sum, mov) => sum + mov, 0);
  const outgoings = acc.movements
    .filter(mov => mov < 0)
    .reduce((sum, mov) => sum + mov, 0);
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((sum, int) => sum + int, 0);

  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);
  labelSumOut.textContent = formatCur(
    Math.abs(outgoings),
    acc.locale,
    acc.currency
  );
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

// Function to create usernames based on the account owner's name
const createUsernames = function (accs) {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts); // Call to create usernames

// Function to update UI after operations
const updateUI = function (acc) {
  displayMovements(acc);
  calcDisplayBalance(acc);
  calcDisplaySummary(acc);
};

// Event handlers for login, transfer, loan, close account, and sorting movements
btnLogin.addEventListener('click', function (e) {
  e.preventDefault(); // Prevent form from submitting
  // Implement logic to find account and check pin
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault(); // Prevent form from submitting
  // Implement logic to transfer money to another account
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault(); // Prevent form from submitting
  // Implement logic to request a loan
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault(); // Prevent form from submitting
  // Implement logic to close an account
});

btnSort.addEventListener('click', function (e) {
  e.preventDefault(); // Prevent default action
  // Implement logic to sort movements
});
//Fake Always logged in

// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;
