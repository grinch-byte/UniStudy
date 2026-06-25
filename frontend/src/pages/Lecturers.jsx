import { useState } from "react"

export default function Lecturers(){

const [search,setSearch]=useState("")

const [message,setMessage]=useState("")

const [selected,setSelected]=
useState(null)

const lecturers=[

{
id:1,
name:"Dr. James",
department:"Computer Science",
free:[
"Monday 10:00",
"Wednesday 14:00",
"Friday 09:00"
]
},

{
id:2,
name:"Prof. Sarah",
department:"Software Engineering",
free:[
"Tuesday 11:00",
"Thursday 15:00"
]
},

{
id:3,
name:"Dr. Daniel",
department:"Networks",
free:[
"Monday 16:00"
]
}

]

const filtered=

lecturers.filter(

l=>

l.name
.toLowerCase()
.includes(
search.toLowerCase()
)

)

function askQuestion(){

if(
!selected
||
!message
)

return

alert(

`Question sent to

${selected.name}`

)

setMessage("")

}

function requestMeet(time){

alert(

`Meeting requested

${selected.name}

${time}`

)

}

return(

<main
style={{

background:"#f7f9fc",

minHeight:"100vh",

padding:"30px"

}}

>

<div
style={{
display:"flex",
gap:"10px"
}}
>

<button
onClick={()=>

window.location.href=
"/dashboard"

}

>

←

</button>

<h1>

Lecturer Connect

</h1>

</div>

<br/>

<input

placeholder=
"Search lecturer"

value={
search
}

onChange={(e)=>

setSearch(
e.target.value
)

}

style={{

width:"100%",

padding:"14px",

borderRadius:"10px"

}}

/>

<br/>
<br/>

<div
style={{

display:"grid",

gridTemplateColumns:
"320px 1fr",

gap:"20px"

}}

>

<div>

{

filtered.map(
(lec)=>(

<div

key={lec.id}

onClick={()=>

setSelected(
lec
)

}

style={{

background:"white",

padding:"18px",

borderRadius:"14px",

marginBottom:"10px",

cursor:"pointer"

}}

>

<h3>

👨‍🏫

{lec.name}

</h3>

<p>

{lec.department}

</p>

</div>

)

)

}

</div>

<div>

{

selected

?

<div
style={{

background:"white",

padding:"24px",

borderRadius:"16px"

}}

>

<h2>

{selected.name}

</h2>

<p>

{selected.department}

</p>

<hr/>

<h3>

Free Times

</h3>

{

selected.free.map(
(time)=>(

<button

key={time}

onClick={()=>

requestMeet(
time
)

}

style={{

display:"block",

marginBottom:"10px"

}}

>

Request Meet

{time}

</button>

)

)

}

<hr/>

<h3>

Ask Question

</h3>

<textarea

placeholder=
"Ask lecturer"

value={
message
}

onChange={(e)=>

setMessage(
e.target.value
)

}

style={{

width:"100%",

height:"120px"

}}

/>

<br/>
<br/>

<button

onClick={
askQuestion
}

>

Send Question

</button>

</div>

:

<div
style={{

background:"white",

padding:"30px",

borderRadius:"16px"

}}
>

Select Lecturer

</div>

}

</div>

</div>

</main>

)

}
