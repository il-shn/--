$(document).ready(function() {
    const csrfToken = document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, '$1');
    // Отримання токена з URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    // Перевірка наявності токена
    if (!token) {
        window.location.href = '/login'; // Переадресація на сторінку входу
    }

    // Обробка відправлення форми
    $('form').on('submit', function(e) {
        e.preventDefault(); // Зупинка стандартного відправлення форми

        var newPassword = $('#newPassword').val();
        var confirmPassword = $('#confirmPassword').val();

        // Перевірка співпадіння паролів
        if (newPassword !== confirmPassword) {
            alert('Паролі не співпадають!');
            return;
        }

        $.ajax({
            url: 'http://localhost:8080/api/registration/changePass?token=' + token,
            method: 'POST',
            contentType: 'application/json',
            headers: {
                'X-XSRF-TOKEN': csrfToken
            },
            data: JSON.stringify({
                newPassword: newPassword,
                confirmPassword: confirmPassword
            }),
            success: function(response) {
                alert('Пароль успішно змінено!');
                window.location.href = '/login'; // Переадресація на сторінку входу
            },
            error: function(xhr, status, error) {
                alert('Помилка: ' + xhr.responseText);
            }
        });
    });
});