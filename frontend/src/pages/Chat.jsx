import { useState } from "react"

export default function Chat() {

const [input, setInput] =
useState("")

const [messages, setMessages] =
useState([

{
id:1,
sender:"John",
text:"Uploading notes now",
time:"08:32",
mine:false
},

{
id:2,
sender:"Mary",
text:"Meeting starts at 7 PM",
time:"08:35",
mine:false
}

])

function sendMessage(){

if(!input.trim())
return

const time =
new Date()
.toLocaleTimeString(
[],
{
hour:"2-digit",
minute:"2-digit"
}
)

setMessages([

...messages,

{
id:Date.now(),
sender:"You",
text:input,
time,
mine:true
}

])

setInput("")

}

function handleEnter(e){

if(
e.key==="Enter"
){

sendMessage()

}

}

return (

<main
style={{

height:"100vh",

display:"flex",

flexDirection:"column",

background:"#efeae2"

}}

>

<div
style={{

background:"#075e54",

color:"white",

padding:"14px",

display:"flex",

alignItems:"center",

gap:"14px",

boxShadow:
"0 2px 8px rgba(0,0,0,0.2)"

}}

>

<button

onClick={()=>

window.location.href=
"/groups"

}

style={{

background:"transparent",

border:"none",

color:"white",

fontSize:"22px",

cursor:"pointer"

}}

>

←

</button>

<div>

<h2
style={{
margin:0
}}
>

Database Masters

</h2>

<div
style={{
opacity:0.8
}}
>

12 members

</div>

</div>

</div>

<div
style={{

flex:1,

overflowY:"auto",

padding:"20px"

}}

>

{messages.map(
(msg)=>(

<div

key={msg.id}

style={{

display:"flex",

justifyContent:

msg.mine

?

"flex-end"

:

"flex-start",

marginBottom:"16px"

}}

>

<div

style={{

background:

msg.mine

?

"#dcf8c6"

:

"white",

padding:"10px",

borderRadius:"14px",

maxWidth:"65%",

boxShadow:
"0 1px 4px rgba(0,0,0,0.15)"

}}

>

{!msg.mine && (

<div
style={{

color:"#075e54",

fontWeight:"600",

marginBottom:"5px"

}}

>

{msg.sender}

</div>

)}

<div
style={{

fontSize:"15px"

}}

>

{msg.text}

</div>

<div
style={{

marginTop:"6px",

fontSize:"11px",

textAlign:"right",

color:"#666"

}}

>

{msg.time}

</div>

</div>

</div>

)

)}

</div>

<div
style={{

display:"flex",

padding:"12px",

background:"#f0f2f5",

gap:"10px"

}}

>

<input

value={input}

onChange={(e)=>

setInput(
e.target.value
)

}

onKeyDown={
handleEnter
}

placeholder=
"Type a message"

style={{

flex:1,

padding:"14px",

borderRadius:"24px",

border:"none",

outline:"none",

fontSize:"15px"

}}

/>

<button

onClick={
sendMessage
}

style={{

background:"#25d366",

color:"white",

border:"none",

padding:
"0 20px",

borderRadius:
"24px",

cursor:
"pointer"

}}

>

Send

</button>

</div>

</main>

)

}
