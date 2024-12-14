var oid
var service
var labours
var fname
var total
var telephone
var address
var date
var ostatus
var tleader
var tcontact

getFirestoreProducts()

function getFirestoreProducts() {
    oid = [];
    service = []
    labours = []
    fname = [];
    total = [];
    telephone = [];
    address = [];
    date = []
    ostatus = []
    tleader = []
    tcontact = []

    $("#tableOrdes > tbody").html("");

    db.collection("orders").orderBy("sId", "desc")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                oid.push(doc.data().sId);
                service.push(doc.data().service);
                labours.push(doc.data().labours);
                fname.push(doc.data().name);
                total.push(doc.data().total);
                telephone.push(doc.data().telephone);
                address.push(doc.data().address);
                date.push(doc.data().date + " " + doc.data().time)
                ostatus.push(doc.data().status);
                tleader.push(doc.data().leadername);
                tcontact.push(doc.data().teamcontact);
            });
            getOrdersValues();
        });
}

function getOrdersValues() {
    for (i = 0; i < oid.length; i++) {
        setProductTable(oid[i], service[i], labours[i], fname[i], total[i], telephone[i], address[i], date[i], ostatus[i], tleader[i], tcontact[i]);
    }
}


//Set Data table body
function setProductTable(id, serv, labou, name, tot, tel, addr, dat, sta, tlead, tcont) {
    var tbodyRef = document.getElementById('tableOrdes').getElementsByTagName('tbody')[0];
    var row = tbodyRef.insertRow();
    var cell1 = row.insertCell();
    var cell2 = row.insertCell();
    var cell3 = row.insertCell();
    var cell4 = row.insertCell();
    var cell5 = row.insertCell();
    var cell6 = row.insertCell();
    var cell7 = row.insertCell();
    var cell8 = row.insertCell();
    var cell9 = row.insertCell();
    var cell10 = row.insertCell();
    var cell11 = row.insertCell();
    cell1.innerHTML = id;
    cell2.innerHTML = serv;
    cell3.innerHTML = labou;
    cell4.innerHTML = name;
    cell5.innerHTML = tot;
    cell6.innerHTML = tel;
    cell7.innerHTML = addr;
    cell8.innerHTML = dat;
    cell9.innerHTML = sta;
    cell10.innerHTML = tlead;
    cell11.innerHTML = tcont;
}

//Update Button
(document.getElementById("update")).addEventListener("click", function () {
    console.log("clicked")

    document.getElementById('error').innerHTML = ''

    const orderId = document.getElementById('orderId').value.trim();
    const nstatus = document.getElementById('status').value.trim();
    const nteamname = document.getElementById('team_lname').value.trim();
    const nteamcontact = document.getElementById('team_contact').value.trim();

    updateData(orderId, nstatus, nteamname, nteamcontact)
});

//Update staus, team leader name, team contact data
function updateData(orId, nsta, ntenam, ntecont) {
    var docRef = db.collection("orders").doc(orId);

    docRef
        .update({
            status: nsta,
            leadername: ntenam,
            teamcontact: ntecont,
        })
        .then(() => {
            console.log("Document successfully Updated!");
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
        });
}


//LogOut Button
(document.getElementById("logout")).addEventListener("click", function () {
    console.log("clicked")

    localStorage.removeItem("admin");
    localStorage.removeItem("username");
    window.location.href = "myaccount.html";
});