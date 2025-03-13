"use strict"

// registractin valisation

document.getElementById('registration').addEventListener('submit',function(event){
    
    event.preventDefault()

    let errors ={
      
        
    }

    let form = event.target

    let userName= document.getElementById('username').value

    if(userName.length < 2 || userName == ''){
        errors.username = " დაწერეთ მომხმარებლის სახელი"

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