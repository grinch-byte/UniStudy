import { Link } from "react-router-dom"
import { useState,useEffect } from "react"

export default function MainLayout({ children }) {

const [open,setOpen]=
useState(false)

const [wallet,setWallet]=
useState(0)

const [history,setHistory]=
useState([])

useEffect(()=>{

const balance=

localStorage.getItem(
"wallet"
)

const transactions=

localStorage.getItem(
"walletHistory"
)

if(balance===null){

localStorage.setItem(
"wallet",
"0"
)

setWallet(0)

}else{

setWallet(
Number(balance)
)

}

if(transactions){

setHistory(
JSON.parse(
transactions
)
)

}

},[])

function saveHistory(newHistory){

setHistory(
newHistory
)

localStorage.setItem(

"walletHistory",

JSON.stringify(
newHistory
)

)

}

function deposit(){

const amount=

prompt(
"Deposit amount"
)

if(
!amount
)
return

const value=
Number(amount)

if(
value<=0
)
return

const updated=

wallet+
value

setWallet(
updated
)

localStorage.setItem(
"wallet",
updated
)

saveHistory([

{
type:"Deposit",

amount:value,

date:
new Date()
.toLocaleString()

},

...history

])

}

function withdraw(){

const amount=

prompt(
"Withdraw amount"
)

if(
!amount
)
return

const value=
Number(amount)

if(

value<=0

||

value>wallet

){

alert(
"Invalid amount"
)

return

}

const updated=

wallet-
value

setWallet(
updated
)

localStorage.setItem(
"wallet",
updated
)

saveHistory([

{
type:"Withdraw",

amount:value,

date:
new Date()
.toLocaleString()

},

...history

])

}

function logout(){

localStorage.removeItem(
"token"
)

window.location.href=
"/login"

}

return(

<div
style={{
minHeight:"100vh"
}}
>

<header
style={{

background:"white",

padding:"20px",

boxShadow:
"0 2px 10px rgba(0,0,0,.08)"

}}

>

<h1
style={{
textAlign:"center",
color:"#4f46e5"
}}
>

UniStudy

</h1>

<div
style={{

display:"flex",

justifyContent:"center",

gap:"28px"

}}

>

<Link to="/dashboard">

Dashboard

</Link>

<Link to="/groups">

Groups

</Link>

<Link to="/sessions">

Sessions

</Link>

<Link to="/library">

Library

</Link>

<Link to="/lecturers">

Lecturers

</Link>

</div>

<div
style={{
position:"absolute",
right:"20px",
top:"20px"
}}
>

<div

onClick={()=>

setOpen(
!open
)

}

style={{

width:"44px",

height:"44px",

background:"#4f46e5",

color:"white",

borderRadius:"50%",

display:"flex",

alignItems:"center",

justifyContent:"center",

cursor:"pointer"

}}

>

U

</div>

{

open && (

<div
style={{

position:"absolute",

top:"60px",

right:"0",

width:"320px",

background:"white",

padding:"18px",

borderRadius:"16px",

boxShadow:
"0 10px 25px rgba(0,0,0,.15)",

maxHeight:"75vh",

overflow:"auto"

}}

>

<h3>

👤 Profile

</h3>

<hr/>

<Link to="/profile">

Open Profile

</Link>

<br/>
<br/>

<h3>

🪙 Wallet

</h3>

<p>

Balance

</p>

<h2>

$

{wallet}

</h2>

<div
style={{
display:"flex",
gap:"8px"
}}
>

<button
onClick={
deposit
}

>

Deposit

</button>

<button
onClick={
withdraw
}

>

Withdraw

</button>

</div>

<br/>

<h4>

History

</h4>

{

history.length===0

?

<p>

No transactions

</p>

:

history.map(
(item,index)=>(

<div

key={index}

style={{

padding:"10px",

background:"#f6f6f6",

borderRadius:"10px",

marginBottom:"8px"

}}

>

<strong>

{item.type}

</strong>

<br/>

$

{item.amount}

<br/>

<small>

{item.date}

</small>

</div>

)

)

}

<br/>

<button

onClick={
logout
}

style={{

width:"100%",

padding:"12px",

background:"#ef4444",

color:"white",

border:"none",

borderRadius:"10px"

}}

>

Logout

</button>

</div>

)

}

</div>

</header>

<div
style={{
padding:"24px"
}}
>

{children}

</div>

</div>

)

}
