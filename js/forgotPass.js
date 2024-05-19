$(document).ready(function() {
    $('#forgotForm').on('submit', function(e) {
        e.preventDefault(); // Запобігаємо стандартній поведінці форми

        var email = $('#email').val(); // Отримуємо значення поля email
        $.ajax({
            url: 'http://localhost:8080/api/registration/forgotPass', // переконайтеся, що URL вірний
            method: 'POST',
            contentType: 'application/json', // Важливо вказати, що ви відправляєте JSON
            data: JSON.stringify({ email: email }),
            success: function(response) {
                alert('Інструкції з відновлення паролю відправлені на ваш email.');
                window.location.href = '/login';
            },
            error: function(xhr) {
                alert('Помилка при відправленні email: ' + xhr.responseText);
            }
        });
    });
});

let urlForgotPassRequest = 'https://moneyguard-fc72823844dd.herokuapp.com/registration/forgotPass'

window.onload = function(){
    document.getElementById('forgotForm').addEventListener('submit', async function(e) {
        e.preventDefault();

        try {
            const response = await fetch(urlServicePayDepositRequest, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': csrfToken
                },
                body: JSON.stringify({
                    "id": serviceId,
                    "amount": amount.value
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Успішна відповідь:', result);
            alert(result.message);
        } catch (error) {
            console.error('Помилка:', error);
            alert('Помилка: ' + error.message);
        }
    });
}