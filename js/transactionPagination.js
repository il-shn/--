window.onload = function(){

        /////////////
    ////TEST/////!!!!!!!!!!!!!!!! ПАгінація транзакцій
    /////////////

    const responseTransaction = {
        "success": true,
        "message": "",
        "data": {
          "content": [
            {
              "dateTimeOfTransaction": "2024-04-26T15:30:00",
              "nameOfTransaction": "Payment to Vendor",
              "fromCardNumber": "1234-5678-9101-1121",
              "toCardNumber": "1121-1098-7654-3212",
              "howMuch": 200
            },
            {
              "dateTimeOfTransaction": "2024-04-25T12:45:00",
              "nameOfTransaction": "Transfer to Savings",
              "fromCardNumber": "1234-5678-9101-1121",
              "toCardNumber": "2211-9988-7766-5454",
              "howMuch": 1500
            }
          ],
          "pageable": {
            "pageSize": 10,
            "pageNumber": 0,
            "offset": 0,
            "unpaged": false,
            "paged": true
          },
          "totalElements": 2,
          "totalPages": 1,
          "last": true,
          "size": 10,
          "number": 0,
          "sort": {
            "sorted": true,
            "unsorted": false,
            "empty": false
          },
          "numberOfElements": 2,
          "first": true,
          "empty": false
        }
      }
        
    loadPagesTr();
    loadDataTr(0);
    
    function loadPagesTr() {
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
                loadDataTr(event.target.id);
            }
        });
    }
    
    function loadDataTr(page) {
        const dataContainer = document.getElementById('accountList');
        dataContainer.innerHTML = ''; 
    
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
    }


}