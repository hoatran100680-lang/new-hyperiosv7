//////////////////////////////////////////////////
// NEXORA V4 SCRIPT
//////////////////////////////////////////////////



// ======================
// KEY SYSTEM
// ======================


let savedKey =
localStorage.getItem("NEXORA_KEY");


let expire =
localStorage.getItem("NEXORA_EXPIRE");





window.onload=function(){


if(savedKey){


if(expire==0 ||
!expire ||
Date.now()<Number(expire)){


openApp(savedKey);


}

}



};







function checkKey(){


let exp =
localStorage.getItem("NEXORA_EXPIRE");



if(exp && exp!=0){


if(Date.now()>Number(exp)){



alert(
"🔒 KEY HẾT HẠN"
);



localStorage.clear();


location.reload();



}


}



}





setInterval(
checkKey,
1000
);








function checkKey(){


let key =
document
.getElementById("keyInput")
.value;



if(key.length<3){


document
.getElementById("lockMsg")
.innerHTML=
"❌ KEY SAI";


return;


}





let type =
prompt(
"Nhập hạn: 1h / 1d / 7d / 30d / vip"
);



let time=0;




if(type=="1h")

time =
Date.now()+3600000;



else if(type=="1d")

time =
Date.now()+86400000;



else if(type=="7d")

time =
Date.now()+604800000;



else if(type=="30d")

time =
Date.now()+2592000000;



else if(type=="vip")

time=0;



else{

alert("Sai loại key");

return;

}





localStorage.setItem(
"NEXORA_KEY",
key
);



localStorage.setItem(
"NEXORA_EXPIRE",
time
);




openApp(key);



}








function openApp(key){



document
.getElementById("lockScreen")
.style.display="none";



document
.getElementById("dashboard")
.style.display="block";



document
.getElementById("currentKey")
.innerHTML=key;



}









// ======================
// TAB
// ======================


function tab(id){


document
.querySelectorAll(".page")
.forEach(p=>{


p.classList.remove("active");


});



document
.getElementById(id)
.classList.add("active");


}









// ======================
// SOUND
// ======================


function sound(){



let audio =
new Audio(
"https://www.soundjay.com/buttons/sounds/button-16.mp3"
);



audio.volume=.25;


audio.play();



}









// ======================
// FUNC
// ======================


let funcs=[


["🎯 AIMLOCK",
"Bảm đầu thông minh - Al tự động căn chuẩn điểm ngắm vào đầu mục tiêu"],


["⚡ STABILITY ASSIST",
"Nhẹ tâm - Ön định đường ngắm, giảm độ trôi khi kéo tâm"],


["🎮 AIM HOLD",
"Ghim tâm - Giữ cố định điểm ngắm khi đứng yên tấn công"],


["🔥 AIM LOCKDOWN",
"Đầm tâm - Khóa vị trí ngắm chắc chắn trong vùng mục tiêu"],


["📱 SENVIBITY BOOSTER",
"Nhạy - Tăng độ nhạy cảm ứng và phản hồi cham nhanh hơn"],


["🚀 SCREEN BOOSTER",
"Buff mån - Nâng cao chất lượng hình ảnh, tăng độ nét và tương phản"],


["🌐 HEADSHOT FIX",
"Fix lỗi đầu - Hiệu chỉnh sai số điểm ngắm đầu người chính xác"],

];






let funcList =
document.getElementById("funcList");



funcs.forEach(f=>{


funcList.innerHTML+=`


<div class="func-item">


<b>${f[0]}</b>


<button class="toggle"></button>


<p class="note">

${f[1]}

</p>


</div>


`;


});







document
.querySelectorAll(".toggle")
.forEach(t=>{


t.onclick=function(){


this.classList.toggle("on");


sound();


};


});









// ======================
// BOOST
// ======================



let boosts=[

"⚡ AIMLOCK",
"🔥 STABILITY ASSIST",
"🎮 AIM HOLD",
"🚀 HEADSHOT FIX",
"📶 BULLET ALIGN",

];




let boostList =
document.getElementById("boostList");




boosts.forEach(b=>{


boostList.innerHTML+=`


<div class="card">


<h3>${b}</h3>


<input 
type="range"
min="0"
max="100"
value="0">


<p>
Level: 0%
</p>


</div>


`;

});






document
.querySelectorAll("input[type=range]")
.forEach(r=>{


r.oninput=function(){



this.nextElementSibling.innerHTML=
"Level: "
+
this.value
+
"%";



sound();


};



});









// ======================
// LIVE
// ======================



let canvas =
document.getElementById("chart");



let ctx =
canvas.getContext("2d");



canvas.width=360;

canvas.height=180;



let data=[];



function draw(){



data.push(
Math.random()*100
);



if(data.length>30)

data.shift();




ctx.clearRect(
0,
0,
360,
180
);



ctx.beginPath();



data.forEach((v,i)=>{


let x=i*12;

let y=180-v;



if(i==0)

ctx.moveTo(x,y);

else

ctx.lineTo(x,y);


});



ctx.strokeStyle="red";

ctx.lineWidth=3;


ctx.stroke();




document
.getElementById("ram")
.innerHTML=
Math.floor(
40+Math.random()*50
)
+"%";



document
.getElementById("cpu")
.innerHTML=
Math.floor(
30+Math.random()*40
)
+"°";



}



setInterval(
draw,
800
);







function cleanRam(){



document
.getElementById("console")
.innerHTML=
"⏳ Đang tối ưu...";



setTimeout(()=>{


document
.getElementById("console")
.innerHTML=
"✅ Hoàn tất dọn hệ thống";


},2000);



}









  // --- 6. KHỞI CHẠY GAME CHUYỂN HƯỚNG CHUẨN ĐƯỜNG DẪN STORE ---
function openGame(type){


let appUrl = "";
let storeUrl = "";



if(type=="ffmax"){


appUrl =
"freefiremax://";


storeUrl =
"https://apps.apple.com/app/free-fire-max/id1480516829";


}



if(type=="ffth"){


appUrl =
"freefire://";


storeUrl =
"https://apps.apple.com/app/garena-free-fire/id1300146617";


}



// đánh dấu thời gian

let start =
Date.now();



// mở game

window.location.href = appUrl;





// kiểm tra nếu không mở được app

let check = setInterval(()=>{


if(Date.now()-start > 2500){


clearInterval(check);



if(
document.visibilityState=="visible"
){

window.location.href =
storeUrl;


}



}



},500);




}

// ======================
// SETTING
// ======================



function changeColor(){


document.documentElement
.style
.setProperty(
"--main",
"#00aaff"
);


sound();


}






document
.querySelectorAll(".setting .toggle")
.forEach(t=>{


t.onclick=function(){


this.classList.toggle("on");


sound();


};


});





draw();

checkKey();
function openLink(type){


if(type=="fb"){


window.open(
"https://www.facebook.com/tandung0907206",
"_blank"
);


}


if(type=="zl"){


window.open(
"https://zalo.me/g/hh9rx4rmh34mz4xprive",
"_blank"
);


}


if(type=="tt"){


window.open(
"https://www.tiktok.com/@tdungfilexios?_r=1&_t=ZS-978luThTolr",
"_blank"
);


}


}