// const BASE_URL =
//   "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
//  const BASE_URL ="https://2024-03-06.currency-api.pages.dev/v1/currencies/";
const BASE_URL ="https://latest.currency-api.pages.dev/v1/currencies/";


const dropdown = document.querySelectorAll(".drop_down select");
let exchange = document.querySelector("#exechange");
const amount = document.querySelector("#enter");
const button = document.querySelector("form button");
const fromcurr =document.querySelector(".from select");
const tocurr =document.querySelector(".to select");

  for(let select of dropdown){
    for (code in countryList){
        let newopt = document.createElement("option");
        newopt.innerText=code;
        newopt.value =code;
        if(select.name==="from" && code === "USD"){
            newopt.selected="selected";
        } else if(select.name==="to" && code === "INR"){
            newopt.selected="selected";
        }
        select.append(newopt);
    }
   select.addEventListener("change",(evt)=>{
     updateflage(evt.target);
   });
  }

  const updateflage=(element)=>{
   let currcode=element.value;
   let cuntrrycode = countryList[currcode];
   let newsrc = `https://flagsapi.com/${cuntrrycode}/flat/64.png`;
   let img = element.parentElement.querySelector("img");
   img.src= newsrc;
};

   button.addEventListener("click", async(evt)=>{
      evt.preventDefault();//stoping pase refres
      updaterate();
   });

   const updaterate = async ()=>{
    let amount_value=amount.value;
    if(amount_value===""||amount_value<=0){
      amount_value=1;
      amount.value="1";
    }      
    const url = `${BASE_URL}/${fromcurr.value.toLowerCase()}.json`;
    let response =  await fetch (url);
    let data = await response.json();
    let rate= data[fromcurr.value.toLowerCase()];
    let final_rate =rate[tocurr.value.toLowerCase()]
    let final_amount = final_rate * amount_value;
    exchange.innerText=`${amount_value} ${fromcurr.value} = ${final_amount} ${tocurr.value}`
   };
   window.addEventListener("load",()=>{
    updaterate();
   });



