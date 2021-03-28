var year = document.createElement("span");
year.textContent = ` ${new Date().getFullYear()}`;
document.querySelector("#copyright").after(year);


var InputSection = document.querySelector("section"), Div = document.querySelector("div"), Form = document.querySelector("form"),
P = document.querySelector("p"), Create = document.querySelector("#create"), Validate = document.querySelector("#validate"),
Email = document.querySelector("#e-mail"), Password = document.querySelector("#password"), UserName = '';


var Users = {};

Validate.addEventListener('click', Login, { once: true });


function Login() {
  Validate.addEventListener('click', Login, { once: true });
  console.log('Validar dados');

  var Find = false;

  if (Email.value.indexOf('@') == -1) {
    console.log('username')
    for (let key in Users) {
      if (key == Email.value && Users[key][1] == Password.value) {
        Find = true;
        break;
      };
    };
  } else {
    console.log('E-mail')
    for (let key in Users) {
      if (Users[key].indexOf(Email.value)!=-1 && Users[key][1] == Password.value) {
        Find = true
        break;
      };
    };
  };
  console.log(Find);

  if (Find) {
    Form.hidden = true;

    var LoginSuccessfully = document.createElement("h1");
    LoginSuccessfully.textContent = 'Login successfully';

    InputSection.firstChild.before(LoginSuccessfully);

    Create.textContent = 'Sign out';
    Create.removeEventListener('click', NewAccount);
    Create.addEventListener('click', function SignOut() {
      Create.addEventListener('click', NewAccount, { once: true });

      Create.textContent = 'Create account';

      Form.hidden = false;

      LoginSuccessfully.remove();

      Email.value = Password.value = '';
    }, { once: true });
  }
};


function EmailValidate(email) {
  if (email!='') {
    return email.split('@').length!=1 && email.split('@')[email.split('@').length-1].indexOf('.')!=-1 && email.split('@')[email.split('@').length-1].split('.')[0]!='' ? true : false;
  };
  return false;
};

function PasswordValidate(password) {
  var numbers = 0, special = 0, letter = 0;

  if (password.length>=8) {
    for (let c = 0; c<password.length; c++) {
      if (!isNaN(password[c])) {
        numbers += 1;
      } else if (isNaN(password[c]) && 'abcdefghijklmnopqrstuvwxyz'.indexOf(password[c]) != -1) {
        letter += 1;
      } else {
        special += 1;
      };
    };
  };
  return letter>=1 && numbers>=1 && special>=1 ? true : false;
};

Create.addEventListener('click', NewAccount, { once: true });

function NewAccount() {
  Create.textContent = 'Login';
  Create.addEventListener('click', Normal, { once: true });

  Email.value = Password.value = '';

  UserName = Email.cloneNode(true);
  UserName.type = 'text';
  UserName.id = 'username';
  UserName.placeholder = 'Username';

  Email.placeholder = 'E-mail';

  Form.firstChild.before(UserName);

  Validate.value = 'Create';
  Validate.removeEventListener('click', Login);
  Validate.addEventListener('click', AddAccount, { once: true });
};

function AddAccount() {
  Validate.addEventListener('click', AddAccount, { once: true });

  console.log(EmailValidate(Email.value))

  if (EmailValidate(Email.value)) {
    if (PasswordValidate(Password.value)) {
      if (UserName.value!='') {

      } else {
        Info('Invalid username');
      }
    } else {
      Info('Invalid password, must contain 8 characters, special characters, letters and numbers', 5000);
    };
  } else {
    Info('Invalid e-mail');
  };

  console.log('Try add account');
};

function Info(text, delay=2000) {
  var Alert = document.createElement("span");
  Alert.textContent = text;
  Alert.id = 'alert';
  Form.after(Alert);
  var Interval = setTimeout(function () { Alert.remove() }, delay);
}

function Normal() {
  Create.textContent = 'Create account';
  Create.addEventListener('click', NewAccount, { once: true });

  Email.placeholder = 'E-mail or username';

  Email.value = Password.value = '';

  UserName.remove();

  Validate.value = 'Login';
  Validate.removeEventListener('click', AddAccount);
  Validate.addEventListener('click', Login, { once: true });
};