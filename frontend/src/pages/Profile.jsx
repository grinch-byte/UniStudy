import { useEffect,useState } from "react"

export default function Profile(){

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

setWallet(
Number(balance||0)
)

setHistory(

transactions

?

JSON.parse(
transactions
)

:

[]

)

},[])

function updateHistory(item){

const updated=[

item,

...history

]

setHistory(
updated
)

localStorage.setItem(

"walletHistory",

JSON.stringify(
updated
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

const newBalance=

wallet+
value

setWallet(
newBalance
)

localStorage.setItem(
"wallet",
newBalance
)

updateHistory({

type:
"Deposit",

amount:
value,

date:
new Date()
.toLocaleString()

})

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
value>wallet
){

alert(
"Insufficient balance"
)

return

}

const newBalance=

wallet-
value

setWallet(
newBalance
)

localStorage.setItem(
"wallet",
newBalance
)

updateHistory({

type:
"Withdraw",

amount:
value,

date:
new Date()
.toLocaleString()

})

}

return(

<main
style={{
maxWidth:"900px",
margin:"auto"
}}
>

<h1>

Profile

</h1>

<div
style={{

background:"white",

padding:"20px",

borderRadius:"18px"

}}

>

<div
style={{
display:"flex",
gap:"20px",
alignItems:"center"
}}
>

<div
style={{

width:"80px",

height:"80px",

borderRadius:"50%",

background:"#4f46e5",

color:"white",

display:"flex",

justifyContent:"center",

alignItems:"center",

fontSize:"30px"

}}

>

U

</div>

<div>

<h2>

Student

</h2>

<p>

🟢 Online

</p>

</div>

</div>

<hr/>

<h2>

🪙 Wallet

</h2>

<h1>

$

{wallet}

</h1>

<div
style={{
display:"flex",
gap:"10px"
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

<h2>

Transaction History

</h2>

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

padding:"14px",

background:"#f7f7f7",

borderRadius:"12px",

marginBottom:"10px"

}}

>

<strong>

{item.type}

</strong>

<br/>

$

{item.amount}

<br/>

{item.date}

</div>

)

)

}

</div>

</main>

)

}
