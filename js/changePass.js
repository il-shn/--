

document.addEventListener('DOMContentLoaded', function() {

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const csrfToken = document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, '$1');

    if (!token) {
        window.location.href = '/login'; 
    }

    document.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault();
        var newPassword = document.querySelector('#newPassword').value;
        var confirmPassword = document.querySelector('#confirmPassword').value;

        if (newPassword !== confirmPassword) {
            alert('Паролі не співпадають!');
            return;
        }

        fetch('http://localhost:8080/api/registration/changePass?token=' + token, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': csrfToken
            },
            body: JSON.stringify({
                newPassword: newPassword,
                confirmPassword: confirmPassword
            })
        })
        .then(response => {
            if (response.ok) {
                alert('Пароль успішно змінено!');
                window.location.href = '/login';
            } else {
                return response.text().then(text => {
                    throw new Error(text || 'Помилка');
                });
            }
        })
        .catch(error => {
            alert('Помилка: ' + error.message);
        });
    });
});