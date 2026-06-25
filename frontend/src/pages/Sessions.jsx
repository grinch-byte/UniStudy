import { useState, useRef } from "react"

export default function Sessions() {

const formRef =
useRef(null)

const [currentDate,setCurrentDate] =
useState(
new Date()
)

const [sessions,setSessions] =
useState([])

const [form,setForm] =
useState({

title:"",
type:"Online",
date:"",
time:"",
location:"",
link:""

})

const month =
currentDate.toLocaleString(
"default",
{
month:"long"
}
)

const year =
currentDate.getFullYear()

const totalDays =
new Date(
year,
currentDate.getMonth()+1,
0
).getDate()

const days =
Array.from(
{
length:totalDays
},
(_,i)=>i+1
)

function previousMonth(){

setCurrentDate(

new Date(
year,
currentDate.getMonth()-1,
1
)

)

}

function nextMonth(){

setCurrentDate(

new Date(
year,
currentDate.getMonth()+1,
1
)

)

}

function selectDay(day){

const selectedDate =

`${year}-${String(
currentDate.getMonth()+1
).padStart(2,"0")}-${String(
day
).padStart(2,"0")}`

setForm({

...form,

date:selectedDate

})

formRef.current
?.scrollIntoView({

behavior:
"smooth"

})

}

function update(e){

setForm({

...form,

[e.target.name]: e.target.value

})

}

function createSession(e){

e.preventDefault()

setSessions([
...sessions,
form
])

setForm({

title:"",
type:"Online",
date:"",
time:"",
location:"",
link:""

})

}

function openSession(session){

alert(

`${session.title}

${session.date}

${session.time}`

)

}

return (

<main
style={{
padding:"30px",
background:"#f6f8fc"
}}
>

<h1>

Sessions

</h1>

<section>

<h2>

Upcoming Events

</h2>

{sessions.length===0 ? (

<div
style={{
background:"white",
padding:"20px",
borderRadius:"12px"
}}
>

No upcoming events

</div>

) : (

sessions.map(
(session,index)=>(

<div

key={index}

onClick={()=>
openSession(
session
)
}

style={{

background:"white",

padding:"16px",

marginBottom:"12px",

borderRadius:"12px",

cursor:"pointer"

}}

>

<h3>

{session.title}

</h3>

<p>

{session.date}

</p>

<p>

{session.time}

</p>

</div>

)

)

)}

</section>

<br />

<section>

<div
style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center"
}}
>

<button
onClick={
previousMonth
}

>

←

</button>

<h2>

{month}

{" "}

{year}

</h2>

<button
onClick={
nextMonth
}

>

→

</button>

</div>

<div
style={{

display:"grid",

gridTemplateColumns:
"repeat(7,1fr)",

gap:"10px"

}}

>

{days.map(
(day)=>{

const fullDate =

`${year}-${String(
currentDate.getMonth()+1
).padStart(2,"0")}-${String(
day
).padStart(2,"0")}`

const event =
sessions.find(
s=>
s.date===fullDate
)

return (

<button

key={day}

onClick={()=>

event

?

openSession(
event
)

:

selectDay(
day
)

}

style={{

padding:"18px",

borderRadius:"12px",

border:"none",

background:

event

?

"#4f46e5"

:

"white",

color:

event

?

"white"

:

"black",

cursor:"pointer"

}}

>

<div>

{day}

</div>

{event && (

<div
style={{
fontSize:"10px"
}}
>

●

</div>

)}

</button>

)

}
)}

</div>

</section>

<br />

<section
ref={formRef}
style={{
background:"white",
padding:"20px",
borderRadius:"14px"
}}
>

<h2>

Create Session

</h2>

<form
onSubmit={
createSession
}
>

<input

name="title"

placeholder=
"Session Title"

value={
form.title
}

onChange={
update
}

/>

<br />
<br />

<select

name="type"

value={
form.type
}

onChange={
update
}

>

<option>

Online

</option>

<option>

Physical

</option>

</select>

<br />
<br />

<input

type="date"

name="date"

value={
form.date
}

onChange={
update
}

/>

<br />
<br />

<input

type="time"

name="time"

value={
form.time
}

onChange={
update
}

/>

<br />
<br />

{form.type==="Online" && (

<input

name="link"

placeholder=
"Meeting Link"

value={
form.link
}

onChange={
update
}

/>

)}

{form.type==="Physical" && (

<input

name="location"

placeholder=
"Place"

value={
form.location
}

onChange={
update
}

/>

)}

<br />
<br />

<button
type="submit"

>

Create Session

</button>

</form>

</section>

</main>

)

}
