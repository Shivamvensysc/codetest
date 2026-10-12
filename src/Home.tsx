/*
what is  javascript . 
javascript  is synchronous single threaded language . 

what is difference between == and === 
== only check the  value not type 
=== check both  type and value  . 

what is difference between undefine and not define . 
define means varibale

what is hoisting. 
hoisting in  javascript  a process where declearation of variable and function are move to there scope.  

what is difference between  let , const and var. 
var are introduce in es5 and let , const are  introduce in es6. 
var are function scope and let, const are braces  scope . 
var are  itself attach to window and let , const are not attach to itself window. 
var are redeclear , reassign  and let and reassign but not redeclear and const is neither redeclear nor reassign.
var are hoisted and let, const are alos hoisted in temporal dead zone . 

what is  Temporal dead zone .
temporal dead zone menas time being a let , const varibale define to till value are assign  time is know as temporal dead zone. 

what is function statement, function expression, function  declearation . 
function  statement/function  declearation  
function  abc(){
   console.log("this is  funtion  statement/declearation ")
}

function  expression  
const xyz= function abc(){
    console.log("this is function expression");
}
function  statement/declearation  are access before function  define  but in  function expression  bot access before function are define. 

what is first class function. 
A function treated like a variable that can pass into another function as an argument or return from another  function from it. 
function store into a varibale  
const greet = function (){
  console.log("hello");
}
greet();

function can pass into another function 
function  greet(){
   console.log("hello")
}
function demo(abc){
   abc();
}
demo();

return function from another function . 
function  outer(){
   return function inner(){
      console.log("inner function  will be call");
   }
}
const ans= outer();
ans();   


A function that take another function as an argument know as first class . 
const greet= function (){
   console.log("hello");
}

function abc(abc){
  greet();
}


what is closoure . 
closoure is combination of function bundle togther  its lexical environment . 
function  abc(){
    var a=10;
    function pqr(){
       function xyz(){
           console.log("value of a is ", a);
       }
       xyz();
    }
    pqr();
}
abc();

what is higher order function .
A function that take another function as an argument or return  another function from it  . 

what is callback function  . 
a function that you pass as an argument to another function so that recive function can execute it. 
with the  help of callback you can write  asynchronous code . 
setTimeout(()=>{
   console.log("callback function");
}, 2000)

what is event loop. 
in javascript event loop is a mechanism that allow to handle the  asynchronous operation without blocking the main thread. 
console.log("statement 1")
setTimeout(()=>{
  console.log("statement 2")
}, 2000);
console.log("statement 3");
statement 1
statement 3
statement 2

when code are executed then create a execution context executin context are two phase one is memory phase and another is  code execution phase . 
in memory phase each varibale are assign to undefine and function are assign to hole code . and in code execution phase code  are execute line 
by line . if any async operation are occure then those async operation are go into webapi spce this feature will be provided by browser  in this
space all async operation are execute  the process after process are execute  completly then  it go on queue there are two type  of  queue  one is  
microtask queue and anoter is macrotask queue  . microtask queue is higher  priority  then  macrotask queue  in microtask queue promise and  
mutationobserver and in macrotask queue setTimeout,setInterval etc. and event loop are continous watching the  callstack is empty or not  if empty 
then event loop are push  async operation from queue to callstack for  execution . 

what is  callback hell . 
callback hell When  nested callback inside another callback then  its creat the  callback hell problem  in this case code are look like  primide of dom
in callback hell maintaing  the  code is more difficult . error handling are more difficult. debugging is more harder  in callback hell. 
function  submitCandidateApplication (candidateId){
   getCandidate(candidateId, (candidate)=>{
       checkApplicationForm(candidate.id, (form)=>{
          checkPayment(candidate.id, (payment)=>{
             uploadDocument(candidate.id, (document)=>{
                submitApplication(candidate.id, form.id, payment.id, document, (application)={
                   console.log("application are submitted", application.applicationNumber);
                })
             })
          })
       })
   })
}
submitCandidateApplication(101);
in callback hell inversion  of  control  is  major issue  . this problem solve by  promise  . 

what is promise . 
promise is object  that represent the  eventual completion  of async operation . there are three state  pending, fullfill,  rejected . 
const promise= new Promise((reject, resolve)=>{
   resolve("promise is  resolve successfully");
})
promise
.then((result) => console.log("result of promise is ", result))
.catch( (error) => console.log("error occure in promise resolve", error))   

what is async and await  . 
async and await are syntatic suger over  .then and .catch . 
async function are always return  the  promise  if  you return the  value then t take a value and wrap into a promise then return . 
and await are always  using  inside the  async function . await  are puse the  current execution of  code  . 
async function  submitCandidateApplication(candidateId){
   try{
        const candidate = await getCandidate(candidateId);
        const form = await checkApplicationForm(candidate.id);
        const  payment = await  checkPayment(candidate.id);
        const document = await uploadDocument(candidate.id);
        const application = await submitApplication(candidate.id, form.id, payment.id, document);
        console.log("Application submitted:", application.applicationNumber);
    }catch(error){
      console.error("Application submission failed:", error);
    }
}
submitCandidateApplication(101)  

there are multiple  way to handle  the  parallel promise  
promise.all() : in this method  return  first succes promise if any  one reject then  its return  directly error not wait for another promise response   
promise.allsettled() : in this method it wait for all promise are settled  either  fullfill or reject  . its return  the  array of object  . 
promise.race() : in this  method return  first settled promise either  promise is sucess or failure  . 
promise.any() : in this method return first settled success promise . if all are rejected or errro  then  its return  the  aggrigate error  in array.


what is map , filter and reduce. 
map , filter and reduce  are array method . 
map are  use to transform  the array and its return  the new array  
const candidates = [
  { id: 1, name: "Rahul" },
  { id: 2, name: "Priya" },
  { id: 3, name: "Amit" },
];

function CandidateList() {
  return (
        <ul>
            {candidates.map((candidate)=>()
            <li key={candidate.id}>{candidate.name}<li>
            ))}
        </ul>
    );
}

filter are use to filter the  value 
const applications = [
  { id: 1, name: "Rahul", status: "submitted" },
  { id: 2, name: "Priya", status: "draft" },
  { id: 3, name: "Amit", status: "submitted" },
];
const answer = application.filter((application) =>{
  return application.status === "submitted"
})
console.log("filter ans", answer)

reduce are use to reduce the  value  
const payment = [100, 200, 300, 400, 500];
const total = payment.reduce((sum, payment) => {
   return  sum+payment;
}, 0)
console.log(total);

what is debounce and throttling . 
debounce and throttling is technique used to control how frequently a function execute . 
debounce : execute the function after event are stop for specified time  . 
function debounce(callback, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
Search candidate names, validate a username after typing, autosave after editing, or wait before filtering a large dataset.


throttling  : execute the function at most once during the specified time interval .
function throttle(callback, delay) {
  let lastExecuted = 0;

  return function (...args) {
    const now = Date.now();

    if (now - lastExecuted >= delay) {
      lastExecuted = now;
      callback(...args);
    }
  };
}
Limit scroll handlers, track pointer movement, report periodic progress, or limit how often a resize handler runs.

what is event bubbling , capturing , event delegation  . 
event bubbling : event are propagates from target element to its parent element.
<div id="parent">
  <button id="child">Click me</button>
</div>
const parent = document.getElementById("parent");
const child = document.getElementById("child");

parent.addEventListener("click", () => {
  console.log("Parent clicked");
});

child.addEventListener("click", () => {
  console.log("Child clicked");
});
when  click on button  then  
Child clicked
Parent clicked

event capturing : event are propagated from  parent to target element .
parent.addEventListener( "click", () => {
    console.log("Parent capturing");
  },
  true
);

child.addEventListener("click", () => {
  console.log("Child clicked");
});
when  click on button  then  output is 
Parent capturing
Child clicked

event delegation : event delegation menas attaching one event listner to a parent element to handle event from multiple child element . 
<div id="candidate-list">
  <button class="view-btn" data-id="101">View Rahul</button>
  <button class="view-btn" data-id="102">View Priya</button>
  <button class="view-btn" data-id="103">View Amit</button>
</div>
without event delegation  
document.querySelectorAll(".view-btn").forEach((button) => {
  button.addEventListener("click", () => {
    console.log("View candidate");
  });
});
const candidateList = document.getElementById("candidate-list");

candidateList.addEventListener("click", (event) => {
  const button = event.target.closest(".view-btn");

  if (!button || !candidateList.contains(button)) {
    return;
  }

  const candidateId = button.dataset.id;

  console.log("View candidate:", candidateId);
});

what is  this  value  . 
this value are depend on how function are call not where to write  . 
this  value are also depend on  mode (strict and no-strict mode ) 
this value  on global : 
undefine = non-stric mode 
windown = strict mode 
this value  inside function : 
undefine = non-stric mode 
windown = strict mode 
this value inside object  : 
this  point  to current  on object value . 
this  inside  arrow function  : there are not this value  on  arrow function  it take reference  of parent function /method  . 

what is call , apply , bind method  . 
call, apply and bind method are use to explictly set  this  value  
call() : 
The call method invokes a function immediately and allows you to pass arguments one by one (comma-separated).
• Syntax: functionName.call(thisArg, arg1, arg2, ...)
apply() : 
The apply method works exactly like call and invokes the function immediately. The only difference is that it accepts arguments as an array (or array-like object).
• Syntax: functionName.apply(thisArg, [arg1, arg2, ...])
bind():
Unlike call and apply, bind does not execute the function immediately. Instead, it returns a brand-new function with the this context permanently locked to the object you provided. You can run this new function whenever you want in the future.
• Syntax: const newFunc = functionName.bind(thisArg, arg1, arg2, ...)

what is cros issue  
CORS stands for Cross-Origin Resource Sharing. It is a browser security mechanism that controls whether a
frontend application is allowed to access resources from a different origin


//----------------------------------------------------------------------- 
what is async and differ attribute  . 
Normal script vs async vs defer
Normal script : parsing html  -> pause html -> Download and execute JS ->Continue parsing HTML 
async script : Parse HTML + download JS in parallel -> Pause HTML  when JS is ready to execute -> Continue parsing HTML
defer script : Parse HTML + download JS in parallel -> Finish parsing HTML -> Execute JS before DOMContentLoaded 
What is async?
Use async when a script can execute independently of the HTML parsing process and other scripts.
<script async src="analytics.js"></script>


How it works:
- The browser downloads the JavaScript while continuing to parse HTML.
- As soon as the file is ready, the browser pauses HTML parsing if necessary and executes it.
- The script's execution order is not guaranteed relative to other async scripts.
For example:
<script async src="analytics.js"></script>
<script async src="chat-widget.js"></script>


Even though analytics.js appears first, chat-widget.js might execute first if it finishes downloading sooner.
Use cases: Independent analytics scripts, advertising scripts, or third-party scripts that do not depend on your page's other scripts.
4. What is defer?
Use defer when you want the browser to download a script without blocking HTML parsing, then execute it after the HTML has been fully parsed.
<script defer src="app.js"></script>


How it works:
- The browser downloads the file while parsing HTML.
- HTML parsing continues without being blocked by the download.
- The script executes after HTML parsing finishes.
- Deferred classic scripts execute in document order.
- They execute before the DOMContentLoaded event fires.
Example:
<script defer src="library.js"></script>
<script defer src="app.js"></script>


The execution order is guaranteed:
1. library.js
2. app.js






*/