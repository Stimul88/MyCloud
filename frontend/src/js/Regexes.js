export default class Regexes {
  // constructor() {
  //   // this.name = name;
  // }
  regexLogin(name) {
    const validLogin = /^[A-Za-z][0-9A-Za-z]{4,20}$/;
    return validLogin.test(name)
  }

  regexEmail(email) {
    const validEmail = /^[A-Za-z][0-9A-Za-z]{4,20}$/;
    return validEmail.test(email)
  }
  regexPassword(password) {
    const validPassword = /^[A-Za-z][0-9A-Za-z]{4,20}$/;
    return validPassword.test(password)
  }
}