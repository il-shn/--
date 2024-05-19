window.onload = async function () {
    let urlGetVariantDepositRequest = 'https://moneyguard-fc72823844dd.herokuapp.com/service/getVariant/deposit';
    let urlPostGetServiceRequest = 'https://moneyguard-fc72823844dd.herokuapp.com/service/getService/deposit';
    let urlGetMineCurrencyRequest = 'https://moneyguard-fc72823844dd.herokuapp.com/moneyTransfer/getMineCurrency';
    let urlServicePayDepositRequest = 'https://moneyguard-fc72823844dd.herokuapp.com/service/pay/deposit';
    
    let urlWithdrawDepositRequest = 'https://moneyguard-fc72823844dd.herokuapp.com//service/withdraw/deposit/';

    
    let serviceId;
    const csrfToken = document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, '$1');

    let depositSelect = document.querySelector('#select');
    let selectCurr = document.querySelector('#selectCurr');
    let amount = document.querySelector('#amountPay');

    try {
        const response = await fetch(urlGetVariantDepositRequest, {
            method: 'GET',
            headers: {
                'X-XSRF-TOKEN': csrfToken
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const { data } = await response.json();
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
        });
    } catch (error) {
        console.error('Помилка: ' + error.message);
        alert('Помилка: ' + error.message);
    }

    try {
        const response = await fetch(urlGetMineCurrencyRequest, {
            method: 'GET',
            headers: {
                'X-XSRF-TOKEN': csrfToken
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const { data: currencyItems } = await response.json();
        currencyItems.forEach(item => {
            let option = document.createElement('option');
            option.textContent = item;
            option.value = item;
            selectCurr.appendChild(option);
        });
    } catch (error) {
        console.error('Помилка: ' + error.message);
        alert('Помилка: ' + error.message);
    }

    document.getElementById('currencyForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(urlPostGetServiceRequest, {
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

    const dataContainer = document.getElementById('activeService');

    try {
        const response = await fetch(`https://moneyguard-fc72823844dd.herokuapp.com/service/showActiveService/deposit`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }


        const { success, message, data } = await response.json();
        // console.log(data.message);
        if (success !== true) {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item');
            listItem.classList.add('fw-lighter');
            listItem.innerHTML = `
            <h5 class="fw-lighter">${message}</h5>`;
            dataContainer.appendChild(listItem);

        } else {
            
            data.forEach(data => {
                const listItem = document.createElement('li');
                listItem.classList.add('list-group-item');
                listItem.classList.add('fw-lighter');
                listItem.innerHTML = `
                <h5 class="fw-lighter serviceId">Service Id: ${data.serviceId}</h5>
                <h5 class="fw-lighter">Service name: ${data.serviceName}</h5>
                <h5 class="fw-lighter">Currency name: ${data.currencyName}</h5>
                <h5 class="fw-lighter">Amount: ${data.amount}</h5>
                <h5 class="fw-lighter">Interest rate per month: ${data.interestRatePerMonth}</h5>
                <h5 class="fw-lighter">Service duration to: ${data.serviceDurationTo}</h5>
                <h5 class="fw-lighter">Accumulated: ${data.accumulated}</h5>
                `;
                dataContainer.appendChild(listItem);
                serviceId = data.serviceId
            });
        }

    } catch (error) {
        console.error('Failed to load data:', error);
        alert('Помилка: ' + error.message);
    }

    document.getElementById('payForm').addEventListener('submit', async function(e) {
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
    
    
    
    
    document.getElementById('withdrawForm').addEventListener('submit', async function(e) {
        e.preventDefault();

        try {
            const response = await fetch(`${urlWithdrawDepositRequest}${serviceId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': csrfToken
                },
                body: JSON.stringify({
                    "id": serviceId,
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

 //dsdsd




};