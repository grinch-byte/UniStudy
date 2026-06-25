import { useState } from "react"

export default function Wallet(){

const [balance,setBalance]=
useState(0)

const [amount,setAmount]=
useState("")

const history=[

{
type:"Session Payment",
amount:"-5"
},

{
type:"Quiz Reward",
amount:"+2"
}

]

function deposit(){

if(!amount)
return

setBalance(

balance+
Number(amount)

)

setAmount("")

}

return(

<main
style={{
padding:"30px"
}}
>

<h1>

🪙 UniWallet

</h1>

<div
style={{

background:"#4f46e5",

color:"white",

padding:"30px",

borderRadius:"18px"

}}

>

<h2>

Balance

</h2>

<h1>

$

{balance}

</h1>

</div>

<br/>

<input

placeholder=
"Deposit"

value={
amount
}

onChange={(e)=>

setAmount(
e.target.value
)

}

/>

<button
onClick={
deposit
}

>

Add Money

</button>

<br/>
<br/>

<h2>

History

</h2>

{

history.map(
(item,index)=>(

<div

key={index}

style={{

background:"white",

padding:"14px",

marginBottom:"10px",

borderRadius:"12px"

}}

>

{item.type}

{item.amount}

</div>

)

)

}

</main>

)

}
