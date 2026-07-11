const base_url="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"
const dropdowns = document.querySelectorAll(".dropdown select");
const btn= document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for(let select of dropdowns) {
    for(curr_code in countryList) {
        let newOption= document.createElement("option");
        newOption.innerText=curr_code;
        newOption.value=curr_code;
        if(select.name==="from" && curr_code==="USD")
            newOption.selected="selected";
        else if(select.name==="to" && curr_code==="INR")
            newOption.selected="selected";
        select.append(newOption);
    
    }
   select.addEventListener("change",(evt) =>{
        updateFlag(evt.target);
    });
}
 

const updateExchange=async() =>{
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal === "" || amtVal<1){
        amtVal=1;
        amount.value= "1";
    }
    const url=`${base_url}/${fromCurr.value.toLowerCase()}.json`;
    let response= await fetch(url);
   let data=await response.json();

    let rate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let final=amtVal*rate;
   
    msg.innerText=`${amtVal} ${fromCurr.value} = ${final} ${toCurr.value}`;
}


const updateFlag = (element) =>{
    let curr_code=element.value;
    let countryCode=countryList[curr_code];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
};

btn.addEventListener("click", async(evt) => {
    evt.preventDefault();
    updateExchange();
});

window.addEventListener("load", () =>{
    updateExchange();
});