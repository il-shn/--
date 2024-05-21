
window.onload = function(){
    let herokuLink = 'https://moneyguard-fc72823844dd.herokuapp.com'    
    // let herokuLink = ''

    let urlGetMineCurrencyRequest = herokuLink + '/moneyTransfer/getMineCurrency';
    const reqestCurrencyListURL = herokuLink + '/main/api/currency'
    let urlCreateAccountRequest = herokuLink + '/main/api/createAccount'
    let urlProfileRequest = herokuLink + '/main/api/profile'
    let urlReplenishmentRequest = herokuLink + '/main/api/cheatingAccountReplenishment'
    let urlExchangeRatesRequest = herokuLink + '/main/api/exchangeRates' 
    let urlAccountsRequest = herokuLink + '/main/api/account/'
    let urlTransactionsRequest = herokuLink + '/main/api/transaction/'


    const csrfToken = document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, '$1');
    
    // Get CurrencyList (Create account)

    function sendGetRequest(method,url) {
        return new Promise((resolve,reject)=>{
            const xhr = new XMLHttpRequest()

            xhr.open(method, url)
            xhr.responseType = 'json'
            xhr.setRequestHeader('X-XSRF-TOKEN', csrfToken);
            xhr.onload = () => {
                if (xhr.status>=400) {
                    reject('Помилка: ' + xhr.status)
                } else {
                    resolve(xhr.response)
                }
            }
            xhr.onerror = () => {
                reject (xhr.response);
            }
            xhr.send()
        })
    }
    
    let currencyList = document.querySelector('.currencyList');
    
    sendGetRequest('GET', reqestCurrencyListURL)
    .then(response => {
        let currencyItems = response.data;
        if (currencyItems.length > 0) {
            currencyItems.forEach(item => {
                let option = document.createElement('option');
                option.textContent = item;
                option.value = item;
                currencyList.appendChild(option);
            });
        } else {
            console.log('No available currency');
        }
    })
    .catch(err => console.log(err))

    // ================================
    
    
    
    // Post Currency option (Create account) 

    function sendPostRequest(method,url,body=null) {
        return new Promise((resolve,reject)=>{
            const xhr = new XMLHttpRequest()

            xhr.open(method, url)
            xhr.responseType = 'json'
            xhr.setRequestHeader('Content-type', 'application/json')
            xhr.setRequestHeader('X-XSRF-TOKEN', csrfToken);
            xhr.onload = () => {
                if (xhr.status>=400) {
                    reject(xhr.response)
                } else {
                    resolve(xhr.response)
                }
            }
            xhr.onerror = () => {
                reject (xhr.response);
            }
            xhr.send(JSON.stringify(body))
        })

    }

    document.getElementById('currencyForm').addEventListener('submit', function(e) {
        e.preventDefault()
          
        sendPostRequest('POST', urlCreateAccountRequest, {
            "currencyName": currencyList.value })
            .then(response => {
                console.log('Успішна відповідь:', response);
                alert(`Account with ${currencyList.value} currency has created successfully`);
                window.location.href = '/main';
            })
            .catch(error => {
                console.error('Помилка:', error);
                alert('Account with this currency has been created')
            });
    });    

    // ================================


    // Get Profile data

    fetch(urlProfileRequest, {
        method: 'GET',
        headers: {
            'X-XSRF-TOKEN': csrfToken
        }
    })
    
        .then(response=>{
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json()
        })
        .then(profileDataResponse => {
            if (profileDataResponse.success = true) {
                console.log(profileDataResponse);

                let profileList = document.querySelector('#profileList');
        
            const profileCard = `
                <div>
                    <h2>Profile info</h2>
                    <p class="fw-lighter"><strong>IBAN:</strong> ${profileDataResponse.data.iban}</h5>
                    <p class="fw-lighter"><strong>First name:</strong> ${profileDataResponse.data.firstName}</p>
                    <p class="fw-lighter"><strong>Last Name:</strong> ${profileDataResponse.data.secondName}</p>
                    <p class="fw-lighter"><strong>Date of birth:</strong> ${profileDataResponse.data.dateOfBirth}</p>
                    <p class="fw-lighter"><strong>Phone number:</strong> ${profileDataResponse.data.phoneNumber}</p>
                    <p class="fw-lighter"><strong>Email:</strong> ${profileDataResponse.data.email}</p>
                    <p class="fw-lighter"><strong>Cashback:</strong> ${profileDataResponse.data.cashBackInUSD}</p>
                    <p class="fw-lighter"><strong>Titul name:</strong> ${profileDataResponse.data.titul}</p>
                    <p class="fw-lighter"><strong>Limit for service:</strong> ${profileDataResponse.data.limitForService}</p>
                    <p class="fw-lighter"><strong>IBAN:</strong> ${profileDataResponse.data.iban}</p>
                    </div>
                    `;   
            profileList.innerHTML = profileCard;  

                function titulImg(params) {
                    let helmetImgSrc = document.querySelector('#helmetImg');
        
                    switch (profileDataResponse.data.titul) {
                        case "ADMIN":
                            helmetImgSrc.src = '/images/helmet9.png'
                            break;
                        case "HERALD":
                            helmetImgSrc.src = '/images/helmet1.png'
                            break;
                        case "GUARDIAN":
                            helmetImgSrc.src = '/images/helmet2.png'
                            break;
                        case "CRUSADER":
                            helmetImgSrc.src = '/images/helmet3.png'
                            break;
                        case "ARCHON":
                            helmetImgSrc.src = '/images/helmet4.png'
                            break;
                        case "LEGEND":
                            helmetImgSrc.src = '/images/helmet5.png'
                            break;
                        case "ANCIENT":
                            helmetImgSrc.src = '/images/helmet6.png'
                            break;
                        case "DIVINE":
                            helmetImgSrc.src = '/images/helmet7.png'
                            break;
                        case "IMMORTAL":
                            helmetImgSrc.src = '/images/helmet8.png'
                            break;
                            
                            default:
                            helmetImgSrc.src = '/images/helmet10.png'
                            break;
                    }
                }
                titulImg()  
            
            } else {
                alert(JSON.stringify(profileDataResponse.message)); 

            }
        })
        .catch(err => console.log(err))
    


    //  ================================


    // Replenishment

    let replenishSelect = document.querySelector('#replenishSelect');
    sendGetRequest('GET', urlGetMineCurrencyRequest)
    .then(response => {
        let currencyItems = response.data;
        if (currencyItems.length > 0) {
            currencyItems.forEach(item => {
                let option = document.createElement('option');
                option.textContent = item;
                option.value = item;
                replenishSelect.appendChild(option);
            });
        } else {
            console.log('No available currency');
            console.log(response);
        }
    })
    .catch(err => console.log(err))


    document.getElementById('replenishForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        let replanish = document.querySelector('#replenishBox')
        replanish.innerHTML = ""

        try {
            const response = await fetch(urlReplenishmentRequest, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': csrfToken
                },
                body: JSON.stringify({
                    "currencyName": replenishSelect.value
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            if (!response.success) {
                let replanish = document.querySelector('#replenishBox')
                replanish.innerHTML = `<h6>${response.message}</h6>`
            }
            console.log('Успішна відповідь:', result);
            let replanish = document.querySelector('#replenishBox')
            replanish.innerHTML = `<h6>${result.message}</h6>`

        } catch (error) {
            console.error('Помилка:', error);
            let replanish = document.querySelector('#replenishBox')
            replanish.innerHTML = ""
            replanish.innerHTML = `<h6>${'Помилка: ' + error.message}</h6>`
        }
    });

    // ================================
    


    // Get Exchange Rates


    fetch(urlExchangeRatesRequest, {
        method: 'GET',
        headers: {
            'X-XSRF-TOKEN': csrfToken
        }   
    })
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(response => {
        if (response.success=true) {
            console.log('response.success=true');
            console.log(response.message);

            const currencies = response.data;
            const currencyContainer = document.getElementById('currencyContainer');
            
            currencies.forEach(currency => {
                const currencyBlock = document.createElement('div');
                currencyBlock.classList.add('currency');
                
                currencyBlock.innerHTML = `
                <h4>${currency.shortName}</h4>
                <div>Sell Rate: ${currency.sellRate}</div>
                <div>Buy Rate: ${currency.buyRate}</div>
                `;
                currencyContainer.appendChild(currencyBlock);
            });
        } else {
            console.log(response);
        }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });    
        

    // Пагінація аккаунтів

        loadPages();

        function loadPages() {
            fetch(urlAccountsRequest + '0')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(response => {
                    const pageCounts = response.data.totalPages;
                    const pageContainer = document.getElementById('pages');

                    for (let i = 0; i < pageCounts; i++) {
                        const pageLink = document.createElement('a');
                        pageLink.classList.add('page-link');
                        pageLink.setAttribute('data-page', i);
                        pageLink.textContent = 'Page ' + (i + 1);

                        const listItem = document.createElement('li');
                        listItem.classList.add('page-item');
                        listItem.appendChild(pageLink);

                        pageContainer.appendChild(listItem);
                    }

                    pageContainer.addEventListener('click', function(event) {
                        if (event.target.classList.contains('page-link')) {
                            const page = parseInt(event.target.getAttribute('data-page'));
                            loadData(page);

                            document.querySelectorAll('.page-link').forEach(link => link.classList.remove('active'));
                            event.target.classList.add('active');
                        }
                    });

                    loadData(0);
                    pageContainer.querySelector('a[data-page="0"]').classList.add('active');
                })
                .catch(error => {
                    console.error('Failed to load pages:', error);
                });
        }

        function loadData(page) {
            const dataContainer = document.querySelector('#data tbody');
            dataContainer.innerHTML = '';

            fetch(urlAccountsRequest + page)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(response => {
                    response.data.content.forEach(item => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td class="card-title">${item.cardIds[0].cardNumber}</td>
                            <td class="card-text">${item.cardIds[0].ownerName}</td>
                            <td class="card-text">${item.amountOfMoney}</td>
                            <td class="card-text">${item.currencyName}</td>
                        `;
                        dataContainer.appendChild(row);
                    });
                })
                .catch(error => {
                    console.error('Failed to load data:', error);
                });
        }

        //ПАгінація транзакцій


        loadTransactionPages();

        function loadTransactionPages() {
            fetch(urlTransactionsRequest + '0')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(response => {
                    const pageCounts = response.data.totalPages;
                    const pageContainer = document.getElementById('transactionPages');

                    for (let i = 0; i < pageCounts; i++) {
                        const pageLink = document.createElement('a');
                        pageLink.classList.add('page-link');
                        pageLink.setAttribute('data-page', i);
                        pageLink.textContent = 'Page ' + (i + 1);

                        const listItem = document.createElement('li');
                        listItem.classList.add('page-item');
                        listItem.appendChild(pageLink);

                        pageContainer.appendChild(listItem);
                    }

                    pageContainer.addEventListener('click', function(event) {
                        if (event.target.classList.contains('page-link')) {
                            const page = parseInt(event.target.getAttribute('data-page'));
                            loadTransactionData(page);

                            // Update active link
                            document.querySelectorAll('.page-link').forEach(link => link.classList.remove('active'));
                            event.target.classList.add('active');
                        }
                    });

                    // Load the first page by default
                    loadTransactionData(0);
                    // Set the first page link as active
                    pageContainer.querySelector('a[data-page="0"]').classList.add('active');
                })
                .catch(error => {
                    console.error('Failed to load pages:', error);
                });
        }

        function loadTransactionData(page) {
            const dataContainer = document.querySelector('#transactionData tbody');
            dataContainer.innerHTML = '';

            fetch(urlTransactionsRequest + page)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(response => {
                    response.data.content.forEach(item => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                        <td>${item.dateTimeOfTransaction}</td>
                        <td>${item.nameOfTransaction}</td>
                        <td>${item.toCardNumber}</td>
                        <td>${item.howMuch}</td>
                        `;
                        dataContainer.appendChild(row);
                    });
                })
                .catch(error => {
                    console.error('Failed to load data:', error);
                });
        }
}