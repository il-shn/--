
window.onload = function(){
    
    const reqestCurrencyListURL = '/main/api/currency'

    function sendGetRequest(method,url) {
        return new Promise((resolve,reject)=>{
            const xhr = new XMLHttpRequest()

            xhr.open(method, url)
            xhr.responseType = 'json'
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
    sendGetRequest('GET', reqestCurrencyListURL)
    .then(data => {
        let currencyList = document.querySelector('.currencyList');
        let currencyItems = data.data;
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

    function sendPostRequest(method,url,body=null) {
        return new Promise((resolve,reject)=>{
            const xhr = new XMLHttpRequest()

            xhr.open(method, url)
            xhr.responseType = 'json'
            xhr.setRequestHeader('Content-type', 'application/json')
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
    currencyList.addEventListener('change', function() {
        let selectedValue = this.value;
        sendPostRequest('POST', '/main/api/createAccount', `{
            "nameOfCurrency": "${selectedValue}" }`)
            .then(response => {
                console.log('Успішна відповідь:', response);
                profileGetRequest()
                // window.location.href = '/html/profile.html'
                alert(`Account with ${this.value} currency has created successfully`);
            })
            .catch(error => {
                console.error('Помилка:', error);
                alert('Account with this currency is created')
            });
    });    


    // ================================


    // ================================

    function profileGetRequest(params) {
        
        let helmetImgSrc = document.querySelector('.helmetImg').src

        fetch('/profile')
            .then(response=>{
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json()
            })
            .then(data => {
                if (data.success = true) {
                    let profileList = document.querySelector('#profileList');
                    // let profileItems = data;
                    // if (profileItems.length > 0) {
                    //     console.log(data);
                    //     profileList.innerHTML = '';
                    //     data.forEach(item => {
                    //         profileList.innerHTML += `<li>${item}</li>`;
                    //     });                
                    // }
                    switch (data.titul.name) {
                        case "ADMIN":
                            helmetImgSrc = '/helmet9.png'
                            break;
                        case "HERALD":
                            helmetImgSrc = '/helmet1.png'
                            break;
                        case "GUARDIAN":
                            helmetImgSrc = '/helmet2.png'
                            break;
                        case "CRUSADER":
                            helmetImgSrc = '/helmet3.png'
                            break;
                        case "ARCHON":
                            helmetImgSrc = '/helmet4.png'
                            break;
                        case "LEGEND":
                            helmetImgSrc = '/helmet5.png'
                            break;
                        case "ANCIENT":
                            helmetImgSrc = '/helmet6.png'
                            break;
                        case "DIVINE":
                            helmetImgSrc = '/helmet7.png'
                            break;
                        case "IMMORTAL":
                            helmetImgSrc = '/helmet8.png'
                            break;
                            
                            default:
                            helmetImgSrc = '/helmet10.png'
                            break;
                    }
                    helmetImgSrc = '/helmet1.png'
                    const profileCard = `
                        <div>
                            <h2>Profile info</h2>
                            <p><strong>IBAN:</strong> ${data.IBAN}</p>
                            <p><strong>First name:</strong> ${data.firstName}</p>
                            <p><strong>Last Name:</strong> ${data.secondName}</p>
                            <p><strong>Date of birth:</strong> ${data.dateOfBirth}</p>
                            <p><strong>Phone number:</strong> ${data.phoneNumber}</p>
                            <p><strong>Email:</strong> ${data.email}</p>
                            <p><strong>Titul name:</strong> ${data.titul.name}</p>
                            <p><strong>Limit for service:</strong> ${data.titul.limitForService}</p>
                            <p><strong>Cashback:</strong> ${data.cashBackInUSD}</p>
                        </div>
                    `;   
    
                    profileList.innerHTML = profileCard;     
    
                }
            })
            .catch(err => console.log(err))
    }

    //  ================================



    // ================================

    function getRequestEchangeRates(url) {

        fetch('/main/api/exchangeRates')
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                const currencies = data.data;
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
                console.error('Failed to retrieve currency rates:', data.message);
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });    
    }

    getRequestEchangeRates();



    // //Пагінація аккаунтів
    document.addEventListener('DOMContentLoaded', function() {
        loadPages();
        loadData(0);
    });
    
    function loadPages() {
        fetch('/admin/count')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const pageCount = data.data.totalPages;
                const pagesContainer = document.getElementById('pages');
    
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
            })
            .catch(error => {
                console.error('Failed to load pages:', error);
            });
    
        document.getElementById('pages').addEventListener('click', function(event) {
            if (event.target.classList.contains('page-link')) {
                loadData(event.target.id);
            }
        });
    }
    
    function loadData(page) {
        const dataContainer = document.getElementById('data');
        dataContainer.innerHTML = ''; 
    
        fetch('/admin/geo?page=' + page)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                data.data.content.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${item.cardIds[0].cardNumber}</td>
                        <td>${item.cardIds[0].ownerName}</td>
                        <td>${item.amountOfMoney}</td>
                        <td>${item.currencyName}</td>
                    `;
                    dataContainer.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Failed to load data:', error);
            });
    }
    
    //ПАгінація транзакцій
    document.addEventListener('DOMContentLoaded', function() {
        loadPages();
        loadData(0);
    });
    
    function loadPages() {
        fetch('/main/api/transaction/{0}')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const pageCount = data.data.totalPages;
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
            })
            .catch(error => {
                console.error('Failed to load pages:', error);
            });
    
        document.getElementById('pagination').addEventListener('click', function(event) {
            if (event.target.classList.contains('page-link')) {
                loadData(event.target.id);
            }
        });
    }
    
    function loadData(page) {
        const dataContainer = document.getElementById('accountList');
        dataContainer.innerHTML = ''; 
    
        fetch(`/main/api/transaction/{0}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                data.data.content.forEach(transaction => {
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

    //==========================================================================

    //==========================================================================

    //==========================================================================


    /////////////
    ////TEST/////!!!!!!!!!!!!
    /////////////
    // let data = {
    //     "success": true,
    //     "message": "",
    //     "data": [
    //     "CHF", "MXN", "ZAR", "TND", "XAU", "VND", "AUD", "ILS", "MDL", "IDR", "AMD", "TRY", "LBP", "TJS", "IQD", "TWD", "AED", 
    //     "HKD", "RSD", "EUR", "DOP", "DKK", "MYR", "BGN", "NOK", "GEL", "RON", "MAD", "AZN", "CZK", "PKR", "SEK", "KZT", "SAR", 
    //     "IRR", "INR", "XPD", "THB", "CNY", "UZS", "KRW", "JPY", "PLN", "BDT", "GBP", "BYN", "LYD", "HUF", "XPT", "RUB", "XDR", 
    //     "USD", "DZD", "EGP", "SGD", "KGS", "NZD", "TMT", "BRL", "XAG"
    //     ]
    // }

    // let currencyItems = data.data;

    // let currencyList = document.querySelector('.currencyList');

    // if (currencyItems.length > 0) {
    //     currencyItems.forEach(item => {
    //         let option = document.createElement('option');
    //         option.textContent = item;
    //         option.value = item;
    //         currencyList.appendChild(option);
    //     });
    // } else {
    //     console.log('No available currency');
    // }

    // currencyList.addEventListener('change', function() {
    //     let selectedValue = this.value;
    //     sendPostRequest('POST', 'https://jsonplaceholder.typicode.com/posts', { selectedValue })
    //         .then(response => {
    //             console.log('Успішна відповідь:', response);
    //             alert(`Account with ${this.value} currency has created`);
    //             window.location.href = '/html/profile.html'
    //         })
    //         .catch(error => {
    //             console.error('Помилка:', error);
    //         });
    // });    




    /////////////
    ////TEST/////!!!!!!!!!!!!!!!!
    /////////////
    // let data = {
    //     "success": true,
    //     "message": "Retrieved top three currency rates",
    //     "data": [
    //       {
    //         "rateId": 1,
    //         "shortName": "USD",
    //         "fullName": "United States Dollar",
    //         "sellRate": 1.1000,
    //         "buyRate": 1.0800
    //       },
    //       {
    //         "rateId": 2,
    //         "shortName": "EUR",
    //         "fullName": "Euro",
    //         "sellRate": 1.2000,
    //         "buyRate": 1.1700
    //       },
    //       {
    //         "rateId": 3,
    //         "shortName": "GBP",
    //         "fullName": "British Pound",
    //         "sellRate": 1.3000,
    //         "buyRate": 1.2800
    //       }
    //     ]
    //   }

    // if (data.success) {
    //     const currencies = data.data;
    //     const currencyContainer = document.getElementById('currencyContainer');
  
    //     currencies.forEach(currency => {
    //       const currencyBlock = document.createElement('div');
    //       currencyBlock.classList.add('currency');
          
    //       currencyBlock.innerHTML = `
    //         <h4>${currency.shortName}</h4>
    //         <div>Sell Rate: ${currency.sellRate}</div>
    //         <div>Buy Rate: ${currency.buyRate}</div>
    //       `;
    //       currencyContainer.appendChild(currencyBlock);
    //     });
    //   } else {
    //     console.error('Failed to retrieve currency rates:', data.message);
    //   }


    /////////////
    ////TEST/////!!!!!!!!!!!!!!!! PAGINATION ACCOUNTS
    /////////////

    // let data = {
    //     "success": true,
    //     "message": "",
    //     "data": {
    //       "content": [
    //         {
    //           "cardIds": [
    //             {
    //               "validity": "2024-12-31T23:59:59",
    //               "cvv": 123,
    //               "ownerName": "John Doe",
    //               "cardNumber": "1234-5678-9101-1121"
    //             },
    //             {
    //               "validity": "2025-11-30T23:59:59",
    //               "cvv": 456,
    //               "ownerName": "Jane Smith",
    //               "cardNumber": "1223-4567-8910-1112"
    //             }
    //           ],
    //           "amountOfMoney": 1500.00,
    //           "currencyName": "USD"
    //         }
    //       ],
    //       "pageable": {
    //         "pageSize": 10,
    //         "pageNumber": 0,
    //         "offset": 0,
    //         "unpaged": false,
    //         "paged": true
    //       },
    //       "totalElements": 1,
    //       "totalPages": 1,
    //       "last": true,
    //       "size": 10,
    //       "number": 0,
    //       "sort": {
    //         "sorted": false,
    //         "unsorted": true,
    //         "empty": true
    //       },
    //       "numberOfElements": 1,
    //       "first": true,
    //       "empty": false
    //     }
    // }
    
    // document.addEventListener('DOMContentLoaded', function() {
    //     loadPages(data);
    //     loadData(data, 0);
    // });
    
    // function loadPages(data) {
    //     const pageCount = data.data.totalPages;
    //     const pagesContainer = document.getElementById('pages');
    
    //     for (let i = 0; i < pageCount; i++) {
    //         const pageLink = document.createElement('a');
    //         pageLink.classList.add('page-link');
    //         pageLink.id = i;
    //         pageLink.textContent = 'Page ' + (i + 1);
    
    //         const listItem = document.createElement('li');
    //         listItem.classList.add('page-item');
    //         listItem.appendChild(pageLink);
    
    //         pagesContainer.appendChild(listItem);
    //     }
    
    //     document.getElementById('pages').addEventListener('click', function(event) {
    //         if (event.target.classList.contains('page-link')) {
    //             loadData(data, event.target.id);
    //         }
    //     });
    // }
    
    // function loadData(data, page) {
    //     const dataContainer = document.getElementById('data');
    //     dataContainer.innerHTML = '';
    
    //     data.data.content.forEach(item => {
    //         const cardItem = document.createElement('div');
    //         cardItem.classList.add('list-group-item');
    //         cardItem.innerHTML = `
    //             <h5 class="card-title">Card Number: ${item.cardIds[0].cardNumber}</h5>
    //             <p class="card-text">Owner Name: ${item.cardIds[0].ownerName}</p>
    //             <p class="card-text">Amount: ${item.amountOfMoney}</p>
    //             <p class="card-text">Currency: ${item.currencyName}</p>
    //         `;
    //         dataContainer.appendChild(cardItem);
    //     });
    // }

}
