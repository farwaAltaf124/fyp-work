window.onload = function () {
    let usersObj = [];
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let buttonRef = document.getElementById('verify-btn');
    let databaseRef = firebase.database().ref(`/users`);

    buttonRef.addEventListener('click', () => {
        console.log('email: ', email.value);
        console.log('password: ', password.value);
        let isUserFound = false;
        if (usersObj) {
            for (let i = 0; i < usersObj.length; i++) {
                if (email.value === usersObj[i].email || password.value === usersObj[i].password) {
                    console.log(email.value);
                    console.log(usersObj[i].email);
                    isUserFound = true;
                }
            }
        }
        if (isUserFound) {
            window.location.replace('../index.html');
            alert("this user is verified");
        } else {
            alert("this user is not verified");
        }
    });


    databaseRef.on('value', (datasnapshot) => {
        let dataNodes = datasnapshot.val();
        console.log(datasnapshot.val());
        for (let i in dataNodes) {
            let obj = {
                email: dataNodes[i].email,
                password: dataNodes[i].password || ""
            }
            usersObj.push(obj);
        }
        console.log('all users email password', usersObj);
    })
}

