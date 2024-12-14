var service;
var labour;
var total;
var sid;

window.addEventListener('load', () => {
    sid = CreateId()
    const params = (new URL(document.location)).searchParams;
    service = params.get('serviceId');
    labour = params.get('labourId');

    if (service == 'Residential Cleaning') {
        total = 4800 * parseInt(labour);
    }
    else if (service == 'Office Cleaning') {
        total = 700 * parseInt(labour);
    }
    else if (service == 'Wall Painting') {
        total = 2000 * parseInt(labour);
    }
    else if (service == 'Window Cleaning') {
        total = 800 * parseInt(labour);
    }
    else if (service == 'Construction Cleaning') {
        total = 8000 * parseInt(labour);
    }
    else if (service == 'Green Cleaning Solutions') {
        total = 1000 * parseInt(labour);
    }
    else if (service == 'Water Tank Cleaning') {
        total = 2500 * parseInt(labour);
    }
    else if (service == 'Commercial Cleaning') {
        total = 1500 * parseInt(labour);
    }
    else if (service == 'Air Duct Cleaning') {
        total = 4000 * parseInt(labour);
    }
    else if (service == 'Seasonal Cleaning') {
        total = 5000 * parseInt(labour);
    }
    else if (service == 'Wodden Floor Cleaning') {
        total = 6000 * parseInt(labour);
    }

    document.getElementById('res-serviceName').innerHTML = ":" + "&nbsp" + service;
    document.getElementById('res-labourConut').innerHTML = ":" + "&nbsp" + labour;
    document.getElementById('total').innerHTML = ": Rs." + "&nbsp" + total + ".00";


    validateUser()
    getUserData()
});

function getUserData() {
    if (validateUser()) {
        var docRef = db.collection("users").doc(localStorage.getItem("username"));
        docRef.get()
            .then((doc) => {
                if (doc.exists) {
                    document.getElementById('name').value = doc.data().fname
                    document.getElementById('telephone').value = doc.data().telephone

                }
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    }
}

function validateUser() {
    if (localStorage.getItem("username") == null) {
        document.getElementById('login_here').innerHTML = "Please Login Here to Continue";
        document.getElementById("submitBtn").disabled = true;
        return false;
    }
    else {
        document.getElementById('login_here').innerHTML = "";
        (document.getElementById('login_here')).style.visibility = 'hidden'
        return true;
    }
}

(document.getElementById("submitBtn")).addEventListener("click", function () {
    console.log("clicked")
    document.getElementById('cantsaved').innerHTML = "";
    const name = document.getElementById('name').value.trim()
    const telephone = document.getElementById('telephone').value.trim()
    const address = document.getElementById('address').value.trim()
    const date = document.getElementById('date').value
    const time = document.getElementById('time').value

    validateData(service, labour, total, name, telephone, address, date, time)
});

function validateData(vservice, vlabours, vtotal, vname, vtelephone, vaddress, vdate, vtime) {
    if (vservice != "") {
        if (vlabours != "") {
            if (vtotal != "") {
                if (vname != "") {
                    if (vtelephone != "") {
                        if (vaddress != "") {
                            if (vdate != "") {
                                if (vtime != "") {
                                    saveData(vservice, vlabours, vtotal, vname, vtelephone, vaddress, vdate, vtime);
                                } else {
                                    document.getElementById('cantsaved').innerHTML = "Enter Time";
                                }
                            } else {
                                document.getElementById('cantsaved').innerHTML = "Enter Date";
                            }
                        } else {
                            document.getElementById('cantsaved').innerHTML = "Enter Your Address";
                        }
                    } else {
                        document.getElementById('cantsaved').innerHTML = "Enter Your Telephone Number";
                    }
                } else {
                    document.getElementById('cantsaved').innerHTML = "Enter Your Name";
                }
            } else {
                document.getElementById('cantsaved').innerHTML = "No price";
            }
        } else {
            document.getElementById('cantsaved').innerHTML = "Select Labours";
        }
    } else {
        document.getElementById('cantsaved').innerHTML = "Select Service";
    }
}

function saveData(sservice, slabours, stotal, sname, stelephone, saddreess, date, time) {
    db.collection("orders")
        .doc(sid)
        .set({
            sId: sid,
            service: sservice,
            labours: slabours,
            total: stotal,
            name: sname,
            telephone: stelephone,
            address: saddreess,
            date: date,
            time: time,
            status: 'Pending',
            leadername: '',
            teamcontact: '',
            username: localStorage.getItem("username"),
        })
        .then(() => {
            document.getElementById('saved').innerHTML = "Order Placed Succesfull";
            document.getElementById('name').value = ""
            document.getElementById('telephone').value = ""
            document.getElementById('address').value = ""
        })
        .catch((error) => {
            document.getElementById('cantsaved').innerHTML = "Can't Place Order. Retry";
        });
}


function CreateId() {
    var now = new Date();
    return moment(now).format("YYYYMMDDHHmmss");
}