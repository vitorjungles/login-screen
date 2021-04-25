let year = document.createElement("span");
year.textContent = ` ${new Date().getFullYear()}`;

document.querySelector("#copyright").after(year);
document.querySelector("footer").hidden = false;

let header = document.querySelector("header");
let inputSection = document.querySelector("section");
let form = document.querySelector("form");
let title = document.querySelector("h1");
let titlePage = document.querySelector("title");
let create = document.querySelector("#create");
let showPassword = document.querySelector("#show-password");
let validate = document.querySelector("#validate");
let email = document.querySelector("#e-mail");
let password = document.querySelector("#password");

let loginSuccessfully = document.createElement("h1");

let userName = '';
let users = {};

loginSuccessfully.textContent = 'Login successfully';

validate.addEventListener('click', Login, { once: true });

create.addEventListener('click', NewAccount, { once: true });

showPassword.addEventListener('click', () => {
  password.type === 'password' ? password.type = 'text' : password.type = 'password';
});

function Login() {
  let find = false;

  for (let key in users) {
    if ((key == email.value && users[key][1] == password.value && email.value.indexOf('@') == -1) || (users[key].indexOf(email.value)!=-1 && users[key][1] == password.value && email.value.indexOf('@') != -1)) {
      find = true;
      break;
    };
  };

  create.removeEventListener('click', NewAccount);

  if (find) {
    validate.addEventListener('click', Login, { once: true });

    titlePage.textContent = 'Login successfully';

    form.hidden = header.hidden = true;

    inputSection.insertAdjacentElement('afterbegin', loginSuccessfully);

    create.textContent = 'Sign out';
    create.addEventListener('click', SignOut, { once: true });
  } else {
    Info('Invalid e-mail, username or password', 3000, false);
  };
};

function SignOut() {
  create.removeEventListener('click', Normal);
  create.addEventListener('click', NewAccount, { once: true });

  create.textContent = 'Create account';

  password.type = 'password';

  titlePage.textContent = 'Login';

  form.hidden = header.hidden = false;
  form.reset();

  loginSuccessfully.remove();
};

function EmailValidate(email) {
  return email.split('@').length != 1 && email.split('@')[email.split('@').length - 1].indexOf('.') != -1 && email.split('@')[email.split('@').length - 1].split('.')[0] != '' && email.indexOf(' ') == -1 ? true : false;
};

function PasswordValidate(password) {
  let numbers = 0, special = 0, letter = 0;

  if (password.length >= 8) {
    for (let c = 0; c < password.length; c++) {
      if (!isNaN(password[c])) {
        numbers++;
      } else if (isNaN(password[c]) && /[A-Za-z]/.exec(password[c]) != null) {
        letter++;
      } else {
        special++;
      };
    };
  };
  return letter >= 1 && numbers >= 1 && special >= 1 ? true : false;
};

function NewAccount() {
  create.addEventListener('click', Normal, { once: true });
  create.textContent = 'Login';

  password.type = 'password';

  email.placeholder = 'E-mail';

  userName = email.cloneNode(true);
  userName.type = 'text';
  userName.id = 'username';
  userName.placeholder = 'Username';

  title.textContent = titlePage.textContent = 'New Account';

  form.insertAdjacentElement('afterbegin', userName);
  form.reset();

  validate.value = 'Create';
  validate.removeEventListener('click', Login);
  validate.addEventListener('click', AddAccount, { once: true });
};

function AddAccount() {
  let account = true;

  if (!EmailValidate(email.value) || !PasswordValidate(password.value) || !(userName.value != '' && userName.value.trim().indexOf(' ') == -1)) {
    create.removeEventListener('click', Normal);
  };

  if (EmailValidate(email.value)) {
    if (PasswordValidate(password.value)) {
      if (userName.value != '' && userName.value.trim().indexOf(' ') == -1) {
        for (let key in users) {
          if (key == userName.value && users[key].indexOf(email.value) != -1) {
            Info('User already registered');
          } else if (key == userName.value) {
            Info('Existing username');
          } else if (users[key].indexOf(email.value) != -1) {
            Info('E-mail already registered');
          };
          if ((key == userName.value && users[key].indexOf(email.value) != -1) || key == userName.value || users[key].indexOf(email.value) != -1) {
            create.removeEventListener('click', Normal);
            account = false;
            break;
          };
        };
        if (account) {
          validate.removeEventListener('click', AddAccount);
          validate.addEventListener('click', Login, { once: true });

          users[userName.value.trim()] = [email.value, password.value];

          titlePage.textContent = 'Login successfully';

          form.hidden = header.hidden = true;

          inputSection.insertAdjacentElement('afterbegin', loginSuccessfully);

          create.textContent = 'Sign out';
          create.removeEventListener('click', NewAccount);
          create.addEventListener('click', SignOut, { once: true });
        };
      } else {
        Info('Invalid username');
      };
    } else {
      Info('Invalid password, must contain 8 characters, special characters, letters and numbers', 5000);
    };
  } else {
    Info('Invalid e-mail');
  };
};

function Info(text, delay = 3000, addFunction = true) {
  let alert = document.createElement("span");

  alert.textContent = text;
  alert.id = 'alert';

  form.after(alert);

  setTimeout(() => {
    alert.remove();
    if (addFunction) {
      validate.addEventListener('click', AddAccount, { once: true });
      create.addEventListener('click', Normal, { once: true });
    } else {
      validate.addEventListener('click', Login, { once: true });
      create.addEventListener('click', NewAccount, { once: true });
    };
  }, delay);
};

function Normal() {
  create.textContent = 'Create account';
  create.addEventListener('click', NewAccount, { once: true });

  form.reset();

  password.type = 'password';

  email.placeholder = 'E-mail or username';

  title.textContent = titlePage.textContent = validate.value = 'Login';

  userName.remove();

  validate.removeEventListener('click', AddAccount);
  validate.addEventListener('click', Login, { once: true });
};