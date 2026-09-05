
    let mnunmber = document.getElementById("mnunmber");
    let snum = document.getElementById("snum");
    let message=document.getElementById("shoe1");
    let login=document.getElementById("loginbutton");


    loginbutton.addEventListener("click",
        function(){
            const mobile=mnunmber.value.trim();
            const seat=snum.value.trim();
             

            if(mobile== ""){
        message.innerText="Please enter your mobile number";
        message.style.color="red";
        message.style.fontSize="20px";
        return;
    }
    if(!/[0-9]{10}$/.test(mobile)){
        message.innerText="Please enter valid 10 degit mobile number";
        message.style.color="red";
        message.style.fontSize="20px";
        return;
    }
    if(seat==""){
  message.innerText="Please enter your seat number";
        message.style.color="red";
        message.style.fontSize="20px";
        return;
    }
    const username="User"+mobile.slice(-4);
    localStorage.setItem("username",username);
    localStorage.setItem("mobileNumber",mobile);
    localStorage.setItem("seatNumber",seat);

    message.innerText="Login successful!";
    message.style.color="green";
    message.style.fontSize="20px";

    setTimeout(function(){
 window.location.href="../home.html";
    },700);

   
        });

