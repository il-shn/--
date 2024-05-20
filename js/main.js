
window.onload = function(){
    let herokuLink = 'https://moneyguard-fc72823844dd.herokuapp.com'    
    // let herokuLink = ''

    let urlGetMineCurrencyRequest = herokuLink + '/moneyTransfer/getMineCurrency';
    const reqestCurrencyListURL = 'https://moneyguard-fc72823844dd.herokuapp.com/main/api/currency'

    let urlCreateAccountRequest = herokuLink + '/main/api/createAccount'
    let urlProfileRequest = herokuLink + '/main/api/profile'
    let urlReplenishmentRequest = herokuLink + '/main/api/cheatingAccountReplenishment'
    let urlExchangeRatesRequest = herokuLink + '/main/api/exchangeRates' 
    let urlAccountsRequest = herokuLink + '/main/api/account/0'
    let urlTransactionsRequest = herokuLink + '/main/api/transaction/0'


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
                            helmetImgSrc.src = '../helmet9.png'
                            break;
                        case "HERALD":
                            helmetImgSrc.src = '../helmet1.png'
                            break;
                        case "GUARDIAN":
                            helmetImgSrc.src = '../helmet2.png'
                            break;
                        case "CRUSADER":
                            helmetImgSrc.src = '../helmet3.png'
                            break;
                        case "ARCHON":
                            helmetImgSrc.src = '../helmet4.png'
                            break;
                        case "LEGEND":
                            helmetImgSrc.src = '../helmet5.png'
                            break;
                        case "ANCIENT":
                            helmetImgSrc.src = '../helmet6.jpg'
                            break;
                        case "DIVINE":
                            helmetImgSrc.src = '../helmet7.jpg'
                            break;
                        case "IMMORTAL":
                            helmetImgSrc.src = '../helmet8.jpg'
                            break;
                            
                            default:
                            helmetImgSrc.src = '../helmet10.jpg'
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
            console.log(response);
            console.log(response.success);
            let banan = response.success
            if (!banan) {
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
    loadData(0);
    
    
    function loadPages() {
        fetch(urlAccountsRequest)
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
                    pageLink.id = i;
                    pageLink.textContent = 'Page ' + (i + 1);
            
                    const listItem = document.createElement('li');
                    listItem.classList.add('page-item');
                    listItem.appendChild(pageLink);
            
                    pageContainer.appendChild(listItem);
                }
                document.getElementById('pages').addEventListener('click', function(event) {
                    if (event.target.classList.contains('page-link')) {
                        loadData(event.target.id);
                    }
                });
            })
            .catch(error => {
                console.error('Failed to load pages:', error);
            });
    
    }
    
    function loadData(page) {
        const dataContainer = document.getElementById('data');
        dataContainer.innerHTML = '';
    
        fetch(urlAccountsRequest)
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

    loadPagesTr();
    loadDataTr(0);
    
    
    function loadPagesTr() {
        fetch(urlTransactionsRequest)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(responseTransaction => {
                const pageCount = responseTransaction.data.totalPages;
                const pagesContainer = document.getElementById('pagination');
    
                for (let i = 0; i < pageCount; i++) {
                    const pageLink = document.createElement('a');
                    pageLink.classList.add('page-link');
                    pageLink.id = i;
                    pageLink.textContent = 'Page ' + (i + 1);
    
                    const listItem = document.createElement('li');
                    listItem.classList.add('page-item');
                    listItem.appendChild(pageLink);
    
                    pagesContainer.appendChild(listItem);
                }
                document.getElementById('pagination').addEventListener('click', function(event) {
                    if (event.target.classList.contains('page-link')) {
                        loadData(event.target.id);
                    }
                });
            })
            .catch(error => {
                console.error('Failed to load pages:', error);
            });
    
    }
    
    function loadDataTr(page) {
        const dataContainer = document.getElementById('accountList');
        dataContainer.innerHTML = ''; 
    
        fetch(urlTransactionsRequest)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(responseTransaction => {
            responseTransaction.data.content.forEach(transaction => {
                const listItem = document.createElement('li');
                listItem.classList.add('list-group-item');
                listItem.innerHTML = `
                    <p>Date/Time: ${transaction.dateTimeOfTransaction}</p>
                    <p>Name: ${transaction.nameOfTransaction}</p>
                    <p>From: ${transaction.fromCardNumber}</p>
                    <p>To: ${transaction.toCardNumber}</p>
                    <p>Amount: ${transaction.howMuch}</p>
                `;
                dataContainer.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Failed to load data:', error);
        });
    }
}