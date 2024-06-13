// window.onload = function(){

//     let herokuLink = ''

//     const csrfToken = document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, '$1');

//     let urlGetVariantCreditRequest = herokuLink + '/login';

//     let username = document.querySelector('#username');
//     let password = document.querySelector('#password');


//     document.querySelector('form').addEventListener('submit', async (event) => {
//         event.preventDefault();

//         try {
//             const response = await fetch(urlGetVariantCreditRequest, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'X-XSRF-TOKEN': csrfToken
//                 },
//                 body: JSON.stringify({
//                     'X-XSRF-TOKEN': csrfToken,
//                     '_csrf': csrfToken,
//                     "email": username.value,
//                     "password": password.value,
//                 })
//             });

//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }

//             const result = await response.json();

//             console.log('Успішна відповідь:', result);
            

//         } catch (error) {
//             console.error('Помилка:', error);
//         }
//     });

// }
document.addEventListener('DOMContentLoaded', () => {
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const closeModalFooterBtn = document.getElementById('closeModalFooterBtn');
    const modal = document.getElementById('staticBackdrop');
  
    openModalBtn.addEventListener('click', () => {
      modal.style.display = 'block';
    });
  
    closeModalBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  
    closeModalFooterBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  
    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  });
  