// let mainRegister = document.querySelector(".main-register");
// const inputNameReg = document.getElementById("name-reg");
// const inputemailReg = document.getElementById("email-reg");
// const inputpasswordReg = document.getElementById("password-reg");
// const btnRegSub = document.querySelector(".btn-reg-sub");
// const btnReg = document.querySelector(".btn-reg");

// let mainLogin = document.querySelector(".main-login");
// const inputemailLogin = document.getElementById("email-login");
// const inputpasswordLogin = document.getElementById("password-login");
// const btnLoginSub = document.querySelector(".btn-login-sub");
// const btnLogin = document.querySelector(".btn-login");
// const accountName = document.querySelector(".account-name");

// const btn1 = document.querySelectorAll(".btn1");
// const btn2 = document.querySelectorAll(".btn2");
// const btnDelete = document.querySelector(".btn-delete");

// const btnTambahAkunBaru = document.querySelector(".btn-create");
// const messageElement = document.querySelectorAll(".message");

// btnTambahAkunBaru.addEventListener("click", function () {
//   tampilSembunyikan([mainLogin], [mainRegister], [mainRegister.parentElement]);
// });

// function tampilSembunyikan(
//   [...elemenhide],
//   [...elemenshowflex],
//   [...elemenshowblock]
// ) {
//   elemenhide.forEach((e) => {
//     e.style.display = "none";
//   });
//   elemenshowflex.forEach((e) => {
//     e.style.display = "flex";
//   });
//   elemenshowblock.forEach((e) => {
//     e.style.display = "block";
//   });
// }

// const btnUserSetting = document.querySelector(".user-setting");

// const users = JSON.parse(localStorage.getItem("users")) || [];
// console.log(users);

// let userNow;

// cekUser();
// ///////////////////////   REGISTER  /////////////////////////////////
// btnReg.addEventListener("click", function () {
//   tampilSembunyikan([mainRegister], [mainLogin], []);
//   clear();
// });

// //_________________create akun_____________________//
// btnRegSub.addEventListener("click", function () {
//   const regText = document.querySelector(".reg-text");
//   const buttonReg = document.querySelector(".loading1");
//   const sassknknk = [
//     validation(inputpasswordReg, 50, 8, true),
//     validation(inputemailReg, 20, 4, true),
//     validation(inputNameReg, 16, 4, true),
//   ];

//   if (sassknknk.every((e) => e === true)) {
//     loading(regText, buttonReg);
//   } else {
//     return;
//   }

//   register(
//     "create",
//     inputNameReg.value,
//     inputemailReg.value,
//     inputpasswordReg.value
//   );
//   setTimeout(() => {
//     mainRegister.style.display = "none";
//     mainLogin.style.display = "flex";
//     tampilSembunyikan([mainRegister],[mainLogin], [])
//   }, 2000);
// });

// //________________Delete akun________________________//
// btnDelete.addEventListener("click", function () {
//   const sasa = JSON.parse(localStorage.getItem("userNow"));
//   const buttonCek = document.querySelector(".loading3");
//   loading("", buttonCek);
//   setTimeout(() => {
//     register("delete", sasa.username, sasa.email, sasa.password);
//     cekUser();
//   }, 2000);
// });

// function register(action, username, email, password) {
//   const assasaas = JSON.parse(localStorage.getItem("users"));
//   switch (action) {
//     case "create":
//       const asas = assasaas?.find((e) => {
//         return e.username === username;
//       });
//       if (asas?.email === email) {
//         console.log("email sudah di pakai");
//         return;
//       } else if (asas?.username === username) {
//         console.log("nama sudah di pakai");
//         return;
//       }

//       const user = {
//         username: username,
//         email: email,
//         password: password,
//       };

//       users.push(user);
//       localStorage.setItem("users", JSON.stringify(users));
//       clear();
//       break;
//     case "edit":
//       break;
//     case "delete":
//       const sasasah = JSON.parse(localStorage.getItem("users"));
//       const sassasasah = JSON.parse(localStorage.getItem("userNow"));

//       const index = sasasah.findIndex(
//         (user) => user.username === sassasasah.username
//       );
//       sasasah.splice(index, index + 1);
//       users.splice(index, index + 1);
//       localStorage.setItem("users", JSON.stringify(sasasah));
//       console.log(sasasah);
//       if (sasasah == []) {
//         localStorage.setItem("userNow", JSON.stringify(undefined));
//         tampilSembunyikan([mainRegister], [mainLogin], [mainRegister.parentElement])
//       } else {
//         console.log(
//           localStorage.setItem("userNow", JSON.stringify(sasasah[0]))
//         );
//       }

//       clear();
//       break;

//     default:
//       break;
//   }
// }
// ///////////////////////   //////////  /////////////////////////////////

// ///////////////////////   LOGIN  /////////////////////////////////

// btnLogin.addEventListener("click", function () {
//   mainRegister.style.display = "flex";
//   mainLogin.style.display = "none";
//   tampilSembunyikan([mainLogin], [mainRegister], [])
//   clear();
// });
// btnLoginSub.addEventListener("click", function () {
//   const logText = document.querySelector(".log-text");
//   const buttonLogin = document.querySelector(".loading2");
//   const sassknknk = [
//     validation(inputpasswordLogin, 100, 0, true),
//     validation(inputemailLogin, 100, 0, true),
//   ];
//   console.log(sassknknk);
//   if (sassknknk.every((e) => e === true)) {
//     loading(logText, buttonLogin);
//   } else {
//     return;
//   }
//   setTimeout(() => {
//     login(inputemailLogin.value, inputpasswordLogin.value);
//   }, 2000);
// });

// function login(email, password) {
//   const assasaas = JSON.parse(localStorage.getItem("users"));
//   const asas = assasaas.find((e) => {
//     return e.email === email && e.password === password;
//   });
//   if (asas) {
//     userNow = asas;
//     localStorage.setItem("userNow", JSON.stringify(userNow));
//     console.log("berhasil login");
//     cekUser();
//   } else {
//     message("kombinasi password atau email salah");
//     cekUser();

//     return;
//   }
//   cekUser();
// }

// ///////////////////////   /////////  /////////////////////////////////

// ///////////////////////   VALIDASI  /////////////////////////////////

// function clear() {
//   inputNameReg.value = "";
//   inputemailReg.value = "";
//   inputpasswordReg.value = "";
//   messageElement.forEach((e) => {
//     e.textContent = "";
//     e.parentElement.style.display = "none";
//   });
// }

// function validation(input, maxchar = 100, minchar = 0, field = false) {
//   if (input.value === "") {
//     message(` tidak boleh ada kosong`);
//     return false;
//   }
//   const char = [...input.value];
//   if (char.length < minchar) {
//     message(`${input.type} minimal ${minchar} karakter `);
//     return false;
//   }
//   if (char.length > maxchar) {
//     message(`${input.type} max ${minchar} karakter `);
//     return false;
//   }
//   switch (input.type) {
//     case "text":
//       if (/[`~!@#$%^&*()_+-={}|:;"'<,>.?/]/.test(input.value)) {
//         message("tidak boleh ada karakter khusus");
//         return false;
//       }
//       break;
//     case "email":
//       if (input.value.includes("@gmail.com")) {
//         return true;
//       } else {
//         message("harus ada kata @gmail.com");
//         return false;
//       }
//       break;
//     default:
//       return true;
//       break;
//   }
//   return true;
// }

// ///////////////////////   /////////  /////////////////////////////////

// ///////////////////////   AKUN USER YANG DI PAKAI  /////////////////////////////////

// function cekUser() {
//   const assasaas = localStorage.getItem("userNow");
//   const ssssas = JSON.parse(localStorage.getItem("users"));

//   if (
//     assasaas == undefined ||
//     assasaas == null ||
//     assasaas == "undefined" ||
//     assasaas == "null"
//   ) {
//     console.log("ssasasasasaaaasaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
//     btnUserSetting.style.display = "none";
//     mainRegister.parentElement.style.display = "block";
//     btn1.forEach((e) => {
//       e.style.display = "block";
//     });
//     return;
//   }

//   const newawakwjak = JSON.parse(assasaas);
//   accountMenu(ssssas);
//   const avatar3 = document.querySelectorAll(".avatar3");
//   avatar3.forEach((e, i) => {
//     e.addEventListener("click", function () {
//       const buttonCek = document.querySelector(".loading3");
//       loading("", buttonCek);
//       setTimeout(() => {
//         localStorage.setItem("userNow", JSON.stringify(ssssas[i]));
//         accountName.textContent = ssssas[i].username;
//       }, 2000);
//     });
//   });

//   accountName.textContent = newawakwjak.username;

//   btnUserSetting.style.display = "block";
//   mainRegister.parentElement.style.display = "none";
//   btn1.forEach((e) => {
//     e.style.display = "none";
//   });
//   clear();
// }

// function accountMenu(arr) {
//   const accountList = document.querySelector(".account-list");

//   accountList.innerHTML = "";
//   arr.forEach((e) => {
//     accountList.innerHTML += `
//       <div class="avatar3 btn-hover">
//         <div class="avatar"></div>
//         <button class="btn2">${e.username}</button>
//       </div>
//     `;
//   });
// }

// function message(pesan) {
//   messageElement.forEach((e) => {
//     e.parentElement.style.display = "flex";
//     e.textContent = pesan;
//   });
// }

// function loading(elemenhide, parentElementHide) {
//   const cekElemen = elemenhide instanceof HTMLElement;

//   if (cekElemen) {
//     elemenhide.textContent = "";
//     setTimeout(() => {
//       elemenhide.textContent = elemenhide.getAttribute("id");
//     }, 2000);
//   }

//   parentElementHide.style.display = "flex";
//   setTimeout(() => {
//     parentElementHide.style.display = "none";
//   }, 2000);
// }
