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
    //     fetch('https://jsonplaceholder.typicode.commoneyTransfer/IBANTransfer', {
//     method: 'GET',
//     headers: {
//         // 'Content-Type': 'application/json',
//         'X-XSRF-TOKEN': csrfToken
//     },
// })
// .then(response => {
//     if (!response.ok) {
//         throw new Error('Network response was not ok');
//     }
//     return response.json()
// })
// .then(data => {
    
// })
// .catch(error => {
//     alert('Помилка: ' + error.message);
// });
