function validate(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if ( username == "admin" && password == "admin123"){
        window.location = "admin.html"; // Redirecting to other page.
    }else if(username == "" || password == ""){
        alert("Username and Password are Required.")
        window.location = "login.html"; // Redirecting to other page.
    }else{
        window.location = "viewParcel.html"; // Redirecting to other page.
    }
}