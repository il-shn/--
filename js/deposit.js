window.onload =function(){

    let urlGetVariantDepositRequest = 'https://moneyguard-fc72823844dd.herokuapp.com/service/getVariant/deposit'
    let urlPostGetServiseRequest = 'https://moneyguard-fc72823844dd.herokuapp.com/service/getService/deposit'
    let urlGetMineCurrencyRequest = 'https://moneyguard-fc72823844dd.herokuapp.com/moneyTransfer/getMineCurrency'


    const csrfToken = document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, '$1');

    let depositSelect = document.querySelector('#select');
    let selectCurr = document.querySelector('#selectCurr');
    let amount = document.querySelector('#amount');

    fetch(urlGetVariantDepositRequest, {
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
        let data = response.data;
        
        const block1 = document.getElementById('block1');
        const block2 = document.getElementById('block2');
        const block3 = document.getElementById('block3');
    
        function displayData(block, item) {
            const [name, percentage, months] = item;
            block.innerHTML = `
                <div><span class="label">Name:</span> ${name}</div>
                <div><span class="label">Percentage:</span> ${percentage * 100}%</div>
                <div><span class="label">Duration:</span> ${months} months</div>
            `;
        }
        displayData(block1, data[0]);
        displayData(block2, data[1]);
        displayData(block3, data[2]);

        data.forEach(item => {
            const name = item[0];
            const option = document.createElement('option');
            option.textContent = name;
            option.value = name;
            depositSelect.appendChild(option);
        })

            
    })
    .catch(error => {
        console.log('Помилка: ' + error.message);
    });
    


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
            currencyItems.forEach(item => {
                let option = document.createElement('option');
                option.textContent = item;
                option.value = item;
                selectCurr.appendChild(option);
            })
    })
    .catch(error => {
        alert('Помилка: ' + error.message);
    });



    
    document.getElementById('currencyForm').addEventListener('submit', function(e) {
        e.preventDefault()
        console.log(amount.value);
        
        fetch(urlPostGetServiseRequest, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': csrfToken
            },
            body: JSON.stringify({
                "serviceName": depositSelect.value,
                "currencyName": selectCurr.value,
                "transfer": amount.value
            })
        })
                .then(response => {
                console.log('Успішна відповідь:', response);
                alert(JSON.stringify(response.message));
            })
            .catch(error => {
                console.error('Помилка:', error);
            });
    });    


}