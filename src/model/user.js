class User {
  constructor(id, email, username, firstName, lastName, password, createdDate, modifiedDate) {
    this.id = id;
    this.email = email;
    this.first_name = firstName;
    this.lastName = lastName;
    this.password = password;
    this.username = username;
    this.createdDate = createdDate;
    this.modifiedDate = modifiedDate;
  }
}

export default User;
