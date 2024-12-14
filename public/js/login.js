var isAdmin = false;

(document.getElementById("login")).addEventListener("click", function () {
    console.log("clicked")

    document.getElementById('error').innerHTML = ''

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username == 'admin') {
        isAdmin = true;
    } else {
        isAdmin = false;
    }
    validateData(username, password)
});

function validateData(username, password) {
    if (username != "") {
        if (password != "") {
            checkUser(username, password)
        } else {
            document.getElementById('error').innerHTML = 'Enter Password'
        }
    } else {
        document.getElementById('error').innerHTML = 'Enter Username'
    }
}

function checkUser(username, password) {
    var docRef = db.collection("users").doc(username);

    docRef.get()
        .then((doc) => {
            if (doc.exists) {
                if (username == doc.data().username && password == doc.data().password) {
                    if (isAdmin) {
                        localStorage.setItem("admin", username);
                        window.location.href = "admin.html";
                    } else {
                        localStorage.setItem("username", username);
                        if (window.history.length > 2) {
                            window.history.back();
                        } else {
                            window.location.href = "myaccount.html";
                        }
                    }
                }
                else {
                    document.getElementById('error').innerHTML = 'Username or Password Invalid'
                }
            } else {
                console.log('No Account Found')
            }
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
}