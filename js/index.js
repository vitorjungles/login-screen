var year = document.createElement("span");
year.textContent = ` ${new Date().getFullYear()}`;
document.querySelector("#copyright").after(year);

var InputSection = document.querySelector("section");
var Div = document.querySelector("div");
var Form = document.querySelector("form");
var P = document.querySelector("p");
var Title = document.querySelector("h1");
var TitlePage = document.querySelector("title");
var Create = document.querySelector("#create");
var Validate = document.querySelector("#validate");
var Email = document.querySelector("#e-mail");
var Password = document.querySelector("#password");
var LoginSuccessfully = document.createElement("h1");
var UserName = '';
var Users = {};
LoginSuccessfully.textContent = 'Login successfully';

Validate.addEventListener('click', Login, { once: true });

Create.addEventListener('click', NewAccount, { once: true });

function Login() {
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
    Validate.addEventListener('click', Login, { once: true });

    Form.hidden = true;

    InputSection.firstChild.before(LoginSuccessfully);

    Create.textContent = 'Sign out';
    Create.removeEventListener('click', NewAccount);
    Create.addEventListener('click', SignOut, { once: true });
  } else {
    Info('Invalid username, e-mail or password', 3000, false);
  };
};

function SignOut() {
  Create.removeEventListener('click', Normal);
  Create.addEventListener('click', NewAccount, { once: true });

  Create.textContent = 'Create account';

  Form.hidden = false;

  LoginSuccessfully.remove();

  Email.value = Password.value = '';
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
  return letter >= 1 && numbers >= 1 && special >= 1 ? true : false;
};

function NewAccount() {
  Create.addEventListener('click', Normal, { once: true });
  Create.textContent = 'Login';

  Email.placeholder = 'E-mail';
  Email.value = Password.value = '';

  UserName = Email.cloneNode(true);
  UserName.type = 'text';
  UserName.id = 'username';
  UserName.placeholder = 'Username';

  Title.textContent = TitlePage.textContent = 'New Account';

  Form.firstChild.before(UserName);

  Validate.value = 'Create';
  Validate.removeEventListener('click', Login);
  Validate.addEventListener('click', AddAccount, { once: true });
};

function AddAccount() {
  console.log(EmailValidate(Email.value))

  var Account = true;

  if (EmailValidate(Email.value)) {
    if (PasswordValidate(Password.value)) {
      if (UserName.value!='') {
        console.log('ok')
        for (let key in Users) {
          if (key == UserName.value && Users[key].indexOf(Email.value) != -1) {
            Info('User already registered');
            Account = false;
            break;
          };
          if (key == UserName.value) {
            Info('Existing username');
            Account = false;
            break;
          };
          if (Users[key].indexOf(Email.value) != -1) {
            Info('E-mail already registered');
            Account = false;
            break;
          }
          console.log(key)
          console.log(UserName.value)
        };
        if (Account) {
          Validate.removeEventListener('click', AddAccount);
          Validate.addEventListener('click', Login, { once: true });

          Users[UserName.value] = [Email.value, Password.value];

          Form.hidden = true;

          InputSection.firstChild.before(LoginSuccessfully);

          Create.textContent = 'Sign out';
          Create.removeEventListener('click', NewAccount);
          Create.addEventListener('click', SignOut, { once: true });
        };
        console.log(Users);
      } else {
        Info('Invalid username');
      };
    } else {
      Info('Invalid password, must contain 8 characters, special characters, letters and numbers', 5000);
    };
  } else {
    Info('Invalid e-mail');
  };
  console.log('Try add account');
};

function Info(text, delay=3000, addFunction=true) {
  var Alert = document.createElement("span");
  Alert.textContent = text;
  Alert.id = 'alert';
  console.log(addFunction)
  Form.after(Alert);
  setTimeout(function () {
    Alert.remove();
    if (addFunction) {
      Validate.addEventListener('click', AddAccount, { once: true });
    } else {
      Validate.addEventListener('click', Login, { once: true });
    }
  }, delay);
};

function Normal() {
  Create.textContent = 'Create account';
  Create.addEventListener('click', NewAccount, { once: true });

  Email.placeholder = 'E-mail or username';
  Email.value = Password.value = '';

  Title.textContent = TitlePage.textContent = 'Login';

  UserName.remove();

  Validate.value = 'Login';
  Validate.removeEventListener('click', AddAccount);
  Validate.addEventListener('click', Login, { once: true });
};