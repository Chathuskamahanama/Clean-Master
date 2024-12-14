if (localStorage.getItem("username") == null) {
    document.getElementById('nav_account').innerHTML = "Login";
    (document.getElementById('logout')).style.visibility = 'hidden';
}
else {
    document.getElementById('nav_account').innerHTML = "My Account";
    document.getElementById('logout').innerHTML = "Logout";
    (document.getElementById('logout')).style.visibility = 'visible';
}

(document.getElementById("logout")).addEventListener("click", function () {
    console.log("clicked")

    localStorage.removeItem("admin");
    localStorage.removeItem("username");
    window.location.href = "login.html";
});