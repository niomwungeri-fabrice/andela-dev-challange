class User {
  // add user role -- user, admin
  constructor(id, email, username, firstName, lastName, userRole, password, createdDate, modifiedDate) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.userRole = userRole;
    this.password = password;
    this.username = username;
    this.createdDate = createdDate;
    this.modifiedDate = modifiedDate;
  }
}

export default User;
