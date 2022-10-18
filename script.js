

let myLeads = [];
const inputEl = document.getElementById("input-el");

const inputBtn = document.getElementById("input-btn");

const ulEl = document.getElementById("ul-el");

const leadsfromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

const deleteBtn = document.getElementById("delete-btn");

const tabBtn = document.getElementById("tab-btn");

if(leadsfromLocalStorage){

    myLeads = leadsfromLocalStorage;
    render(myLeads);
}

tabBtn.addEventListener("click",function(){

    chrome.tabs.query({active: true, currentWindow:true }, function(tabs){

        myLeads.push(tabs[0].url);

        localStorage.setItem("myLeads",JSON.stringify(myLeads));    //storing in local storage
    
        render(myLeads);

    });
   

});

function render(leads){
    
    let listitems = ""; 

    for(let i = 0; i < leads.length ; i++){

       // ulEl.innerHTML += "<li>" + myLeads[i] + "</li>";
//listitems += "<li><a target = '_blank' href = '"+myLeads[i] +  "'>" + myLeads[i] + "</a></li>";

    listitems += 
    `<li>
    <a target = '_blank' href = " ${leads[i]} ">
    ${leads[i]}
    </a>
    </li>`;


    }

    ulEl.innerHTML = listitems;
}

deleteBtn.addEventListener("dblclick",function(){

    localStorage.clear();
    myLeads = [];
    render(myLeads);

});

inputBtn.addEventListener("click",function(){

    myLeads.push(inputEl.value);  // getting input vale and pushing to array
    inputEl.value = "";
    // local storage only stores string !
    localStorage.setItem("myLeads",JSON.stringify(myLeads));    //storing in local storage

    render(myLeads);

});

