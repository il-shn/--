let herokuLink = 'https://moneyguard-fc72823844dd.herokuapp.com'    

let urlForgotPassRequest = herokuLink + '/api/registration/forgotPass'

window.onload = function(){
    let checkEmail = (email)=>/^([a-z\d\._-]+)@([a-z\d_-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/i.test(email);
    let email = document.querySelector('#email');
    let btn = document.querySelector('#forgotBtn');
    
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        let errorMessage = '';   
    
        if (!checkEmail(email.value)) {
            errorMessage += 'Invalid emaill. Try again. \n';
        }

        if (errorMessage !== '') {
            alert('Validation error:\n' + errorMessage);
        } else {
            console.log('Validation passed.');
            submitForm()
        }

    });



    function submitForm() {

        fetch(urlForgotPassRequest, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': csrfToken
            },
            body: JSON.stringify({
                "email": email.value
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Check your data');
            }
            return response.json();
        })
        .then(response => {
            if (response.success) {
                console.log('Success:', response.message);
                alert(response.message);
                window.location.href = '/login';
            } else {
                throw new Error(response.message);
            }
        })
        .catch(error => {
            alert('Помилка: ' + error.message);
        });
    }
}