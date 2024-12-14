(document.getElementById('search_result')).style.visibility = 'hidden'

var sid
var service
var labours
var fname
var total
var telephone
var address
var date

getFirestoreProducts()

function getFirestoreProducts() {
    sid = [];
    service = []
    labours = []
    fname = [];
    total = [];
    telephone = [];
    address = [];
    date = []

    $("#tableOrdes > tbody").html("");

    db.collection("orders").orderBy("sId", "desc")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (localStorage.getItem('username') == doc.data().username) {
                    console.log(doc.data())
                    sid.push(doc.data().sId);
                    service.push(doc.data().service);
                    labours.push(doc.data().labours);
                    fname.push(doc.data().name);
                    total.push(doc.data().total);
                    telephone.push(doc.data().telephone);
                    address.push(doc.data().address);
                    date.push(doc.data().date + " " + doc.data().time)
                } else {
                    console.log("no orders")
                }
            });
            getOrdersValues();
        });
}

function getOrdersValues() {
    console.log(sid.length);
    for (i = 0; i < sid.length; i++) {
        setProductTable(sid[i], service[i], labours[i], fname[i], total[i], telephone[i], address[i], date[i]);
    }
}

function setProductTable(id, serv, labou, name, tot, tel, addr, dat) {
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
    cell1.innerHTML = id;
    cell2.innerHTML = serv;
    cell3.innerHTML = labou;
    cell4.innerHTML = name;
    cell5.innerHTML = tot;
    cell6.innerHTML = tel;
    cell7.innerHTML = addr;
    cell8.innerHTML = dat;
}


(document.getElementById("searchBtn")).addEventListener("click", function () {
    console.log("clicked");
    (document.getElementById('search_result')).style.visibility = 'hidden';
    document.getElementById('error').innerHTML = '';

    var orderId = document.getElementById('orderId').value.trim();
    if (orderId != "") {
        searchData(orderId)
    }
    else {
        document.getElementById('error').innerHTML = 'Enter Order ID';
    }
});

function searchData(orderId) {
    var docRef = db.collection("orders").doc(orderId);
    docRef.get()
        .then((doc) => {
            if (doc.exists) {
                document.getElementById('status').innerHTML = doc.data().status;
                document.getElementById('team_lname').innerHTML = doc.data().leadername;
                document.getElementById('team_contact').innerHTML = doc.data().teamcontact;

                (document.getElementById('search_result')).style.visibility = 'visible';
            }else{
                document.getElementById('error').innerHTML = 'Order ID Incorrect';
            }
        })
        .catch((error) => {
            console.error("Error read document: ", error);
        });
}