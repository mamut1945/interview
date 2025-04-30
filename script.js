let mainRegister = document.querySelector(".main-register");
const inputNameReg = document.getElementById("name-reg");
const inputemailReg = document.getElementById("email-reg");
const inputpasswordReg = document.getElementById("password-reg");
const btnRegSub = document.querySelector(".btn-reg-sub");
const btnReg = document.querySelector(".btn-reg");

let mainLogin = document.querySelector(".main-login");
const inputemailLogin = document.getElementById("email-login");
const inputpasswordLogin = document.getElementById("password-login");
const btnLoginSub = document.querySelector(".btn-login-sub");
const btnLogin = document.querySelector(".btn-login");
const accountName = document.querySelector(".account-name");

const btn1 = document.querySelectorAll(".btn1");
const btn2 = document.querySelectorAll(".btn2");
const btnDelete = document.querySelector(".btn-delete");

const btnTambahAkunBaru = document.querySelector(".btn-create");
const messageElement = document.querySelectorAll(".message");

const regText = document.querySelector(".reg-text");
const buttonReg = document.querySelector(".loading1");
const logText = document.querySelector(".log-text");
const buttonLogin = document.querySelector(".loading2");
const btnUserSetting = document.querySelector(".user-setting");


btnTambahAkunBaru.addEventListener("click", function () {
  tampilSembunyikan([mainLogin], [mainRegister], [mainRegister.parentElement]);
});

function tampilSembunyikan(
  [...elemenhide] = [],
  [...elemenshowflex] = [],
  [...elemenshowblock] = [],
  [...elemenhidetext] = []
) {
  elemenhide.forEach((e) => {
    e.style.display = "none";
  });
  elemenshowflex.forEach((e) => {
    e.style.display = "flex";
  });
  elemenshowblock.forEach((e) => {
    e.style.display = "block";
  });
  elemenhidetext.forEach((e) => {
    if (e instanceof HTMLInputElement) {
      e.value = "";
    }
    e.textContent = "";
  });
}

let users = JSON.parse(localStorage.getItem("users")) || [];
let userInUse = undefined;

cekUser();
///////////////////////   REGISTER  /////////////////////////////////
btnReg.addEventListener("click", function () {
  messageElement.forEach((e) => {
    tampilSembunyikan([mainRegister, e.parentElement], [mainLogin], [], []);
  });

  clear(inputNameReg, inputemailReg, inputpasswordReg);
});

//_________________create akun_____________________//
btnRegSub.addEventListener("click", function () {
  const allValidate = [
    validation(inputpasswordReg, 50, 8, true),
    validation(inputemailReg, 20, 4, true),
    validation(inputNameReg, 16, 4, true),
  ];

  if (allValidate.every((e) => e === true)) {
  } else {
    return;
  }

  register(
    "create",
    inputNameReg.value,
    inputemailReg.value,
    inputpasswordReg.value
  );
});

//________________Delete akun________________________//
btnDelete.addEventListener("click", function () {
  const getUserInUse = JSON.parse(localStorage.getItem("userNow"));
  const buttonCek = document.querySelector(".loading3");
  loading("", buttonCek);
  setTimeout(() => {
    register("delete", getUserInUse.username, getUserInUse.email, getUserInUse.password);
    cekUser();
  }, 2000);
});

function register(action, username, email, password) {
  const getUsersData = JSON.parse(localStorage.getItem("users"));
  switch (action) {
    case "create":
      const getUsersDataLikeInput = getUsersData?.find((e) => {
        return e.email === email;
      });
      if (getUsersDataLikeInput?.email === email) {
        message("email sudah di pakai");
        messageElement.forEach((e) => {
          tampilSembunyikan([], [e.parentElement], [], []);
        });
        return;
      }
      messageElement.forEach((e) => {
        tampilSembunyikan([e.parentElement], [], [], []);
      });

      const user = {
        username: username,
        email: email,
        password: password,
      };

      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      loading(regText, buttonReg);
      setTimeout(() => {
        tampilSembunyikan([mainRegister], [mainLogin], [], []);
        pesanErrSucc(
          "berhasil registrasi silahkan login terlebih dahulu",
          "",
          "180px"
        );

        clear(inputNameReg, inputemailReg, inputpasswordReg);
      }, 2000);
      clear(inputNameReg, inputemailReg, inputpasswordReg);
      break;
    case "edit":
      break;
    case "delete":
      const getUserInUse = JSON.parse(localStorage.getItem("userNow"));
      const usersNewAfterDelUser = getUsersData.filter(
        (e) => e.username !== getUserInUse.username
      );
      users = usersNewAfterDelUser;
      localStorage.setItem("users", JSON.stringify(usersNewAfterDelUser));
      if (usersNewAfterDelUser.length === 0) {
        localStorage.setItem("userNow", JSON.stringify(undefined));
        tampilSembunyikan([mainRegister.parentElement], [], [], []);
      } else {
        localStorage.setItem("userNow", JSON.stringify(usersNewAfterDelUser[0]));
        pesanErrSucc(`akun berhasil di hapus `, "80px", "");
      }

      clear(inputNameReg, inputemailReg, inputpasswordReg);
      break;

    default:
      break;
  }
}
///////////////////////   //////////  /////////////////////////////////

///////////////////////   LOGIN  /////////////////////////////////

btnLogin.addEventListener("click", function () {
  messageElement.forEach((e) => {
    tampilSembunyikan([mainLogin, e.parentElement], [mainRegister], [], []);
  });
  clear(inputemailLogin, inputpasswordLogin);
});

btnLoginSub.addEventListener("click", function () {
  const allValidate = [
    validation(inputpasswordLogin, 100, 0, true),
    validation(inputemailLogin, 100, 0, true),
  ];
  if (allValidate.every((e) => e === true)) {
  } else {
    return;
  }
  login(inputemailLogin.value, inputpasswordLogin.value);
  messageElement.forEach((e) => {
    tampilSembunyikan([e.parentElement], [], [], []);
  });
});

function login(email, password) {
  const getUsersData = JSON.parse(localStorage.getItem("users"));
  const getUsersDataLikeInput = getUsersData.find((e) => {
    return e.email === email && e.password === password;
  });
  loading(logText, buttonLogin);
  if (getUsersDataLikeInput) {
    userNow = getUsersDataLikeInput;
    localStorage.setItem("userNow", JSON.stringify(userNow));
    setTimeout(() => {
      pesanErrSucc("berhasil Login", "90px", "");
      clear(inputemailLogin, inputpasswordLogin);
    }, 2000);
  } else {
    setTimeout(() => {
      message("kombinasi password atau email salah");
      clear(inputemailLogin, inputpasswordLogin);
    }, 2000);
    return;
  }
  setTimeout(() => {
    cekUser();
  }, 2000);
}

///////////////////////   /////////  /////////////////////////////////

///////////////////////   VALIDASI  /////////////////////////////////

function clear(...input) {
  input.forEach((e) => {
    tampilSembunyikan([], [], [], [e]);
  });
}

function validation(input, maxchar = 100, minchar = 0) {
  if (input.value === "") {
    message(` tidak boleh ada kosong`);
    return false;
  }
  const char = [...input.value];
  if (char.length < minchar) {
    message(`${input.type} minimal ${minchar} karakter `);
    return false;
  }
  if (char.length > maxchar) {
    message(`${input.type} max ${maxchar} karakter `);
    return false;
  }
  switch (input.type) {
    case "text":
      if (/[`~!@#$%^&*()_+-={}|:;"'<,>.?/]/.test(input.value)) {
        message("tidak boleh ada karakter khusus");
        return false;
      }
      break;
    case "email":
      if (input.value.includes("@gmail.com")) {
        return true;
      } else {
        message("harus ada kata @gmail.com");
        return false;
      }
      break;
    default:
      return true;
      break;
  }
  return true;
}

///////////////////////   /////////  /////////////////////////////////

///////////////////////   AKUN USER YANG DI PAKAI  /////////////////////////////////

function cekUser() {
  const getUserInUse = localStorage.getItem("userNow");
  const getUsersData = JSON.parse(localStorage.getItem("users"));

  if (
    getUserInUse == undefined ||
    getUserInUse == null ||
    getUserInUse == "undefined" ||
    getUserInUse == "null"
  ) {
    btn1.forEach((e) => {
      tampilSembunyikan([btnUserSetting], [], [e], []);
    });
    return;
  }


  const parseUserInUse = JSON.parse(getUserInUse);
  accountMenu(getUsersData);



  const avatar3 = document.querySelectorAll(".avatar3");
  avatar3.forEach((e, i) => {
    e.addEventListener("click", function () {
      const buttonCek = document.querySelector(".loading3");
      loading("", buttonCek);
      setTimeout(() => {
        localStorage.setItem("userNow", JSON.stringify(getUsersData[i]));
        accountName.textContent = getUsersData[i].username;
        pesanErrSucc("berhasil ganti akun", "80px", "");
      }, 2000);
    });
  });


  
  accountName.textContent = parseUserInUse.username;
  btn1.forEach((e) => {
    tampilSembunyikan(
      [mainRegister.parentElement, e],
      [],
      [btnUserSetting],
      []
    );
  });
}

function accountMenu(arr) {
  const accountList = document.querySelector(".account-list");

  accountList.innerHTML = "";
  arr.forEach((e) => {
    accountList.innerHTML += `
      <div class="avatar3 btn-hover">
        <div class="avatar"></div>
        <button class="btn2">${e.username}</button>
      </div>
    `;
  });
}

function message(pesan) {
  messageElement.forEach((e) => {
    tampilSembunyikan([], [e.parentElement], [], []);
    e.textContent = pesan;
  });
}

function pesanErrSucc(pesan, right, left) {
  const parentPesan = document.querySelector(".toast");
  const text = document.querySelector(".text-2");
  tampilSembunyikan([], [], [parentPesan], []);
  text.textContent = pesan;
  parentPesan.style.right = right;
  parentPesan.style.left = left;

  setTimeout(() => {
    tampilSembunyikan([parentPesan], [], [], [text]);
  }, 3000);
}

function loading(elemenhide, parentElementHide) {
  const cekElemen = elemenhide instanceof HTMLElement;

  if (cekElemen) {
    elemenhide.textContent = "";
    setTimeout(() => {
      elemenhide.textContent = elemenhide.getAttribute("id");
    }, 2000);
  }

  parentElementHide.style.display = "flex";
  setTimeout(() => {
    parentElementHide.style.display = "none";
  }, 2000);
}

btn1.forEach((e) => {
  e.addEventListener("click", function () {
    switch (e.textContent) {
      case "login":
        tampilSembunyikan(
          [mainRegister],
          [mainLogin],
          [mainRegister.parentElement],
          []
        );
        break;
      case "register":
        tampilSembunyikan(
          [mainLogin],
          [mainRegister],
          [mainRegister.parentElement],
          []
        );
        break;
      default:
        tampilSembunyikan(
          [mainRegister],
          [mainLogin],
          [mainRegister.parentElement],
          []
        );
        break;
    }
  });
});

document.querySelector(".account-profil").addEventListener("click", () => {
  document.querySelector(".mannage-account").classList.toggle("hide-show");
  document.querySelector(".arrow-icon").classList.toggle("arrow-anim");
});
