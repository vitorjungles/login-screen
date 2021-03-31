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
var ShowPassword = document.querySelector("#show-password");
var Validate = document.querySelector("#validate");
var Email = document.querySelector("#e-mail");
var Password = document.querySelector("#password");
var LoginSuccessfully = document.createElement("h1");
var UserName = '';
var Users = {};
LoginSuccessfully.textContent = 'Login successfully';

Validate.addEventListener('click', Login, { once: true });

Create.addEventListener('click', NewAccount, { once: true });

ShowPassword.addEventListener('click', function () { Password.type == 'password' ? Password.type = 'text' : Password.type = 'password' });

function Login() {
  var Find = false;

  for (let key in Users) {
    if ((key == Email.value && Users[key][1] == Password.value && Email.value.indexOf('@') == -1) || (Users[key].indexOf(Email.value)!=-1 && Users[key][1] == Password.value && Email.value.indexOf('@') != -1)) {
      Find = true;
      break;
    };
  };

  Create.removeEventListener('click', NewAccount);

  if (Find) {
    Validate.addEventListener('click', Login, { once: true });

    Form.hidden = true;

    InputSection.firstChild.before(LoginSuccessfully);

    Create.textContent = 'Sign out';
    Create.addEventListener('click', SignOut, { once: true });
  } else {
    Info('Invalid e-mail, username or password', 3000, false);
  };
};

function SignOut() {
  Create.removeEventListener('click', Normal);
  Create.addEventListener('click', NewAccount, { once: true });

  Create.textContent = 'Create account';

  Password.type = 'password';

  Form.hidden = false;
  Form.reset();

  LoginSuccessfully.remove();
};

function EmailValidate(email) {
  return email.split('@').length != 1 && email.split('@')[email.split('@').length - 1].indexOf('.') != -1 && email.split('@')[email.split('@').length - 1].split('.')[0] != '' && email.indexOf(' ') == -1 ? true : false;
};

function PasswordValidate(password) {
  var numbers = 0, special = 0, letter = 0;

  if (password.length >= 8) {
    for (let c = 0; c < password.length; c++) {
      if (!isNaN(password[c])) {
        numbers += 1;
      } else if (isNaN(password[c]) && /[A-Za-z]/.exec(password[c]) != null) {
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

  Password.type = 'password';

  Email.placeholder = 'E-mail';

  UserName = Email.cloneNode(true);
  UserName.type = 'text';
  UserName.id = 'username';
  UserName.placeholder = 'Username';

  Title.textContent = TitlePage.textContent = 'New Account';

  Form.firstChild.before(UserName);
  Form.reset();

  Validate.value = 'Create';
  Validate.removeEventListener('click', Login);
  Validate.addEventListener('click', AddAccount, { once: true });
};

function AddAccount() {
  var Account = true;

  if (!EmailValidate(Email.value) || !PasswordValidate(Password.value) || !(UserName.value!='' && UserName.value.trim().indexOf(' ') == -1)) {
    Create.removeEventListener('click', Normal);
  };

  if (EmailValidate(Email.value)) {
    if (PasswordValidate(Password.value)) {
      if (UserName.value!='' && UserName.value.trim().indexOf(' ') == -1) {
        for (let key in Users) {
          if ((key == UserName.value && Users[key].indexOf(Email.value) != -1) || key == UserName.value || Users[key].indexOf(Email.value) != -1) {
            Create.removeEventListener('click', Normal);
            Account = false;
          };
          if (key == UserName.value && Users[key].indexOf(Email.value) != -1) {
            Info('User already registered');
            break;
          } else if (key == UserName.value) {
            Info('Existing username');
            break;
          } else if (Users[key].indexOf(Email.value) != -1) {
            Info('E-mail already registered');
            break;
          };
        };
        if (Account) {
          Validate.removeEventListener('click', AddAccount);
          Validate.addEventListener('click', Login, { once: true });

          Users[UserName.value.trim()] = [Email.value, Password.value];

          Form.hidden = true;

          InputSection.firstChild.before(LoginSuccessfully);

          Create.textContent = 'Sign out';
          Create.removeEventListener('click', NewAccount);
          Create.addEventListener('click', SignOut, { once: true });
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
  var Alert = document.createElement("span");
  Alert.textContent = text;
  Alert.id = 'alert';
  Form.after(Alert);
  setTimeout(function () {
    Alert.remove();
    if (addFunction) {
      Validate.addEventListener('click', AddAccount, { once: true });
      Create.addEventListener('click', Normal, { once: true });
    } else {
      Validate.addEventListener('click', Login, { once: true });
      Create.addEventListener('click', NewAccount, { once: true });
    };
  }, delay);
};

function Normal() {
  Create.textContent = 'Create account';
  Create.addEventListener('click', NewAccount, { once: true });

  Form.reset();
  
  Password.type = 'password';

  Email.placeholder = 'E-mail or username';

  Title.textContent = TitlePage.textContent = 'Login';

  UserName.remove();

  Validate.value = 'Login';
  Validate.removeEventListener('click', AddAccount);
  Validate.addEventListener('click', Login, { once: true });
};