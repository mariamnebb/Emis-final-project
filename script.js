"use strict"


// burgerbar

// let navigation = document.getElementById('navigation')
// let burger = document.getElementById('burger')
// // აიქონზე დაკლიკებისას 
// burger.addEventListener('click',function(){
//     if(navigation.classList.contains('activeNavigation')){
//         navigation.classList.remove('activeNavigation')
//         burger.innerHTML =' <i class="fa-solid fa-bars"></i>'

//     }else{
//         navigation.classList.add('activeNavigation')
//         burger.innerHTML= '<i class="fas fa-times"></i>'

//     }
// })


burger.addEventListener('click', function(){
if (navigation.classList.contains('activeNavigation')){
    //ნავიგაციას აქრობს
    navigation.classList.remove('activeNavigation')
    //ბურგერ მენიუდ გადააქცევს x
    burger.innerHTML= '<i class="fa-solid fa-bars"></i> '
}

else {
    //გამოიტანს ნავიგაციის მენიუს
    navigation.classList.add('activeNavigation')
    //გამოაჩენს x
    burger.innerHTML ='<i class="fas fa-times"></i>'
}

})

// registractin valisation

document.getElementById('registration').addEventListener('submit',function(event){
    
    event.preventDefault()

    let errors ={
      
        
    }

    let form = event.target

    let userName= document.getElementById('username').value

    if(userName.length < 2 || userName == ''){
        errors.username = " please write username"

    }

    let password =document.getElementById('password').value
    let password2 = document.getElementById('password2').value

    if(password != password2 || password == ''){
        errors.password = 'password can not be empty'
        errors.password2 = 'passwords do not match'

    }

    let agree = document.getElementById('checkAgree').checked
    if(!agree){
        errors.agree = 'you must check'

    }

    let age =false
    form.querySelectorAll('[name ="age"]').forEach(element=>{
        if(element.checked){
            age = true
        }
    })

    if(!age){
        errors.age = 'select your age'
    }


    

    for(let item in errors){
        let errorSpan= document.getElementById('error_' + item)
        if(errorSpan){
            errorSpan.innerText = errors[item]

        }

    }



if(Object.keys(errors).length == 0){
    form.submit()
}
    
})

// fetch 

let currentPage = 1;
let totalPages;

function getUsers(page) {
  fetch("https://reqres.in/api/users?page=" + page, {
    method: "GET",
  })
    .then(function (response) {
      if (response.status !== 200) {
        throw response.status;
      }
      return response.json();
    })
    .then(function (responseData) {
      let container = document.getElementById('container')
      let fragment = document.createDocumentFragment();
      totalPages = responseData.total_pages;
      console.log(responseData);

      
      responseData.data.forEach(function (item) {
        let container = document.createElement("div"); 
        container.style.textAlign = "center"; 
        
        let image = document.createElement("img");
        image.src = item.avatar;
        image.style.display = "block"; 
        image.style.margin = "0 auto"; 
        image.style.width = "150px"; 
        image.style.height = "150px"; 
        
        let li = document.createElement("li");
        li.textContent = item.email;
        li.style.listStyle = "none"; 
    
        container.appendChild(image); 
        container.appendChild(li); 
    
        fragment.appendChild(container); 
    });
    

      document.getElementById("ul_list").innerHTML = " ";
      document.getElementById("ul_list").appendChild(fragment);
    })
    .catch(function () {
      let container = document.getElementById("container");
      let p = document.createElement("p");
      p.textContent = "server error 404";
      container.appendChild(p);
    });
}

document.getElementById("loadprev").addEventListener("click", function () {
  if (currentPage === 1) {
    return;
  }

  currentPage -= 1;
  getUsers(currentPage);
  
});

document.getElementById("loadnext").addEventListener("click", function () {
  if (currentPage === totalPages) {
    return;
  }
  currentPage += 1;
  getUsers(currentPage);
});

getUsers(currentPage);
