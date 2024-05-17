window.onload =function(){

    let urlGetMineCurrencyRequest = 'https://moneyguard-fc72823844dd.herokuapp.com/moneyTransfer/getMineCurrency'
    let urlPostCardTransferRequest = 'https://moneyguard-fc72823844dd.herokuapp.com/moneyTransfer/cardTransfer'

    const csrfToken = document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, '$1');

    let myCurrencyList = document.querySelector('.currencyList');
    let transferAmount = document.querySelector('#transferAmount');
    let toCardNumber = document.querySelector('#toCardNumber');
    

    fetch(urlGetMineCurrencyRequest, {
        method: 'GET',
        headers: {
        'X-XSRF-TOKEN': csrfToken
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json()
    })
    .then(response => {
        let currencyItems = response.data;
        if (currencyItems.length > 0) {
            currencyItems.forEach(item => {
                let option = document.createElement('option');
                option.textContent = item;
                option.value = item;
                myCurrencyList.appendChild(option);
            })
        }
    })
    .catch(error => {
        alert('Помилка: ' + error.message);
    });
    

    document.getElementById('currencyForm').addEventListener('submit', function(e) {
        e.preventDefault()
          

        fetch(urlPostCardTransferRequest, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': csrfToken
            },
            body: JSON.stringify({
                "currencyName": myCurrencyList.value,
                "toCardNumber": toCardNumber.value,
                "transferAmount": transferAmount.value
            })
        })
                .then(response => {
                console.log('Успішна відповідь:', response);
                alert(response.message);
            })
            .catch(error => {
                console.error('Помилка:', error);
            });
    });    


}