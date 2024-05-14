window.onload = function () {
    let btn = document.querySelector('#btn')
    let checkName = /[a-zA-Z]/g;
    let checkNumber = /\+*[0-9]{10,12}/g;
    let checkEmail = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})*(\.[a-z]{2,8})?$/;
    let checkPassword = /^(?=.*[a-z])(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*]).{10,30}$/g;
    let inputFirstName = document.querySelector('#inputFirstName')
    let inputSecondName = document.querySelector('#inputSecondName')
    let inputPhone = document.querySelector('#inputPhoneNumber')
    let inputEmail = document.querySelector('#inputEmail')
    let inputPassword1 = document.querySelector('#inputPassword1')
    let inputPassword2 = document.querySelector('#inputPassword2')

    const inputElements = document.querySelectorAll('input');

    inputElements.forEach(input => {
        input.addEventListener('input', toggleButtonState);
    });

    function checkFullInputs() {
        let isValid = true;
        inputElements.forEach(input => {
            if (input.value === '') {
                isValid = false;
            }
        });
        return isValid;
    }

    function toggleButtonState() {
        if (checkFullInputs()) {
            btn.disabled = false;
            btn.style.backgroundColor = '#7a5e3c';
            btn.style.border = 'solid 2px #7a5e3c'
            btn.addEventListener('mouseenter', ()=>
                btn.style.backgroundColor = '#57432b')
            btn.addEventListener('mouseleave', ()=>
                btn.style.backgroundColor = '#7a5e3c')
            btn.style.cursor = 'pointer';
        } else {
            btn.disabled = true;
            btn.style.backgroundColor = '#ada8a2';
            btn.style.cursor = 'default';
        }
    }    
    
    // btn.addEventListener('click', function() {
    //     let errorMessage = '';

    //     if (!checkName.test(inputFirstName.value)) {
    //         errorMessage += 'Invalid first name\n';
    //     }
    
    //     if (!checkName.test(inputSecondName.value)) {
    //         errorMessage += 'Invalid second name\n';
    //     }
    
    //     if (!checkEmail.test(inputEmail.value)) {
    //         errorMessage += 'Invalid email\n';
    //     }
    
    //     if (!checkNumber.test(inputPhone.value)) {
    //         errorMessage += 'Invalid phone number\n';
    //     }
    
    //     if (!checkPassword.test(inputPassword1.value)) {
    //         errorMessage += 'Invalid password\n';
    //     }
    
    //     if (inputPassword1.value !== inputPassword2.value) {
    //         errorMessage += 'Different passwords\n';
    //     }

    //     if (errorMessage !== '') {
    //         alert('Validation error:\n' + errorMessage);
    //     } else {
    //         console.log('Validation passed.');
    //         submitForm()
    //     }

    // });


    btn.addEventListener('click', submitForm())

    function submitForm() {
        const form = document.getElementById('registrationForm');
        const formData = {
            firstName: form.firstName.value,
            secondName: form.secondName.value,
            dateOfBirth: form.dateOfBirth.value,
            phoneNumber: form.phoneNumber.value,
            email: form.email.value,
            password: form.password.value
        };

        fetch('/api/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Check your data');
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    console.log('Success:', data.message);
                    alert('Registration successful!');
                    window.location.href = '/login';
                } else {
                    throw new Error(data.message);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Error in registration: ' + error.message);
            });
    }
}
