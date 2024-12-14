(document.getElementById("createaccount")).addEventListener("click", function () {
    console.log("clicked")

    document.getElementById('error').innerHTML = "";
    document.getElementById('done').innerHTML = "";

    const fname = document.getElementById('fullname').value.trim()
    const email = document.getElementById('email').value.trim()
    const tele = document.getElementById('telephone').value.trim()
    const username = document.getElementById('username').value.trim()
    const password = document.getElementById('password').value.trim()

    validateData(fname, email, tele, username, password)
});

function validateData(fname, email, tele, username, password) {
    if (fname != "") {
        if (email != "") {
            if (tele != "") {
                if (username != "") {
                    if (password != "") {
                        checkUsername(username)
                    } else {
                        document.getElementById('error').innerHTML = "Enter Password";
                    }
                } else {
                    document.getElementById('error').innerHTML = "Enter Username";
                }
            } else {
                document.getElementById('error').innerHTML = "Enter Telephone";
            }
        } else {
            document.getElementById('error').innerHTML = "Enter Email";
        }
    } else {
        document.getElementById('error').innerHTML = "Enter Full Name";
    }
}

function checkUsername(username) {
    var docRef = db.collection("users").doc(username);

    docRef.get()
        .then((doc) => {
            if (doc.exists) {
                document.getElementById('error').innerHTML = "Username was Taken. Try Another Username";
            } else {
                registerUser(username);
            }
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
}

function registerUser(username) {
    db.collection("users")
        .doc(username)
        .set({
            fname: document.getElementById('fullname').value.trim(),
            email: document.getElementById('email').value.trim(),
            telephone: document.getElementById('telephone').value.trim(),
            username: document.getElementById('username').value.trim(),
            password: document.getElementById('password').value.trim(),
        })
        .then(() => {
            document.getElementById('done').innerHTML = "Successfull Created Account " + username;
            document.getElementById('fullname').innerHTML = ""
            document.getElementById('email').innerHTML = ""
            document.getElementById('telephone').innerHTML = ""
            document.getElementById('username').innerHTML = ""
            document.getElementById('password').innerHTML = ""
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
}