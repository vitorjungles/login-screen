const year = document.createElement('span');

year.textContent = ` ${new Date().getFullYear()}`;

document.querySelector('#copyright').after(year);
document.querySelector('footer').hidden = false;

const header = document.querySelector('header');
const inputSection = document.querySelector('section');
const form = document.querySelector('form');
const title = document.querySelector('h1');
const titlePage = document.querySelector('title');
const create = document.querySelector('#create');
const showPassword = document.querySelector('#show-password');
const validate = document.querySelector('#validate');
const email = document.querySelector('#e-mail');
const password = document.querySelector('#password');

const loginSuccessfully = document.createElement('h1');

const users = {};

let userName = '';

loginSuccessfully.textContent = 'Login successfully';

validate.addEventListener('click', login, { once: true });

create.addEventListener('click', newAccount, { once: true });

showPassword.addEventListener('click', () => {
  password.type = password.type === 'password' ? 'text' : 'password';
});

function info(text, delay = 3000, addFunction = true) {
  const alert = document.createElement('span');

  alert.textContent = text;
  alert.id = 'alert';

  form.after(alert);

  setTimeout(() => {
    alert.remove();
    if (addFunction) {
      validate.addEventListener('click', addAccount, { once: true });
      create.addEventListener('click', normal, { once: true });
    } else {
      validate.addEventListener('click', login, { once: true });
      create.addEventListener('click', newAccount, { once: true });
    }
  }, delay);
}

function login() {
  let find = false;

  for (let c = 0, len = Object.keys(users).length; c < len; c++) {
    if ((Object.keys(users)[c] === email.value && users[Object.keys(users)[c]][1] === password.value && email.value.indexOf('@') === -1) || (users[Object.keys(users)[c]].indexOf(email.value) !== -1 && users[Object.keys(users)[c]][1] === password.value && email.value.indexOf('@') !== -1)) {
      find = true;
      break;
    }
  }

  create.removeEventListener('click', newAccount);

  if (find) {
    validate.addEventListener('click', login, { once: true });

    titlePage.textContent = 'Login successfully';

    form.hidden = true;
    header.hidden = true;

    inputSection.insertAdjacentElement('afterbegin', loginSuccessfully);

    create.textContent = 'Sign out';
    create.addEventListener('click', signOut, { once: true });
  } else {
    info('Invalid e-mail, username or password', 3000, false);
  }
}

function signOut() {
  create.removeEventListener('click', normal);
  create.addEventListener('click', newAccount, { once: true });

  create.textContent = 'Create account';

  password.type = 'password';

  titlePage.textContent = 'Login';

  form.hidden = false;
  header.hidden = false;
  form.reset();

  loginSuccessfully.remove();
}

function emailValidate(mail) {
  return mail.split('@').length !== 1 && mail.split('@')[mail.split('@').length - 1].indexOf('.') !== -1 && mail.split('@')[mail.split('@').length - 1].split('.')[0] && mail.indexOf(' ') === -1;
}

function passwordValidate(key) {
  let numbers = 0;
  let special = 0;
  let letter = 0;

  if (key.length >= 8) {
    for (let c = 0; c < key.length; c++) {
      if (/[0-9]/.exec(key[c])) {
        numbers += 1;
      } else if (/[A-Za-z]/.exec(key[c])) {
        letter += 1;
      } else {
        special += 1;
      }
    }
  }

  return letter >= 1 && numbers >= 1 && special >= 1;
}

function newAccount() {
  create.addEventListener('click', normal, { once: true });
  create.textContent = 'Login';

  password.type = 'password';

  email.placeholder = 'E-mail';

  userName = email.cloneNode(true);
  userName.type = 'text';
  userName.id = 'username';
  userName.placeholder = 'Username';

  title.textContent = 'New Account';
  titlePage.textContent = 'New Account';

  form.insertAdjacentElement('afterbegin', userName);
  form.reset();

  validate.value = 'Create';
  validate.removeEventListener('click', login);
  validate.addEventListener('click', addAccount, { once: true });
}

function addAccount() {
  let account = true;

  if (!emailValidate(email.value) || !passwordValidate(password.value) || !(userName.value !== '' && userName.value.trim().indexOf(' ') === -1)) {
    create.removeEventListener('click', normal);
  }

  if (emailValidate(email.value)) {
    if (passwordValidate(password.value)) {
      if (userName.value !== '' && userName.value.trim().indexOf(' ') === -1) {
        for (let c = 0, len = Object.keys(users); c < len; c++) {
          console.log(Object.keys(users)[c]);
          if (Object.keys(users)[c] === userName.value && users[Object.keys(users)[c]].indexOf(email.value) !== -1) {
            info('User already registered');
          } else if (Object.keys(users)[c] === userName.value) {
            info('Existing username');
          } else if (users[Object.keys(users)[c]].indexOf(email.value) !== -1) {
            info('E-mail already registered');
          }
          if ((Object.keys(users)[c] === userName.value && users[Object.keys(users)[c]].indexOf(email.value) !== -1) || Object.keys(users)[c] === userName.value || users[Object.keys(users)[c]].indexOf(email.value) !== -1) {
            create.removeEventListener('click', normal);
            account = false;
            break;
          }
        }
        if (account) {
          validate.removeEventListener('click', addAccount);
          validate.addEventListener('click', login, { once: true });

          users[userName.value.trim()] = [email.value, password.value];

          titlePage.textContent = 'Login successfully';

          form.hidden = true;
          header.hidden = true;

          inputSection.insertAdjacentElement('afterbegin', loginSuccessfully);

          create.textContent = 'Sign out';
          create.removeEventListener('click', newAccount);
          create.addEventListener('click', signOut, { once: true });
        }
      } else {
        info('Invalid username');
      }
    } else {
      info('Invalid password, must contain 8 characters, special characters, letters and numbers', 5000);
    }
  } else {
    info('Invalid e-mail');
  }
}

function normal() {
  create.textContent = 'Create account';
  create.addEventListener('click', newAccount, { once: true });

  form.reset();

  password.type = 'password';

  email.placeholder = 'E-mail or username';

  title.textContent = 'Login';
  titlePage.textContent = 'Login';
  validate.value = 'Login';

  userName.remove();

  validate.removeEventListener('click', addAccount);
  validate.addEventListener('click', login, { once: true });
}
