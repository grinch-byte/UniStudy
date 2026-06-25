import { Link } from "react-router-dom"

export default function Dashboard(){

const sessions=[

{
id:1,
title:"Database Revision"
},

{
id:2,
title:"AI Discussion"
}

]

const groups=[

{
id:1,
name:"Networks Group"
},

{
id:2,
name:"Algorithms Group"
}

]

const books=[

"📘",
"📗",
"📙",
"📕",
"📘",
"📗"

]

return(

<main
style={{

padding:"30px",

background:"#f7f9fc",

minHeight:"100vh"

}}

>

<p
style={{
fontSize:"18px"
}}
>

Study together. Build knowledge.

</p>

<br/>

<section>

<h2>

Upcoming Sessions

</h2>

<div
style={{

display:"flex",

gap:"14px",

flexWrap:"wrap"

}}

>

{

sessions.map(
(session)=>(

<div

key={session.id}

onClick={()=>

window.location.href=
"/sessions"

}

style={{

background:"white",

padding:"18px",

borderRadius:"18px",

cursor:"pointer",

width:"220px",

boxShadow:
"0 2px 10px rgba(0,0,0,.05)"

}}

>

<div
style={{
fontSize:"30px"
}}
>

📅

</div>

<h3>

{session.title}

</h3>

<p>

Tap to open

</p>

</div>

)

)

}

</div>

</section>

<br/>

<section>

<h2>

Your Groups

</h2>

<div
style={{

display:"flex",

gap:"14px",

flexWrap:"wrap"

}}

>

{

groups.map(
(group)=>(

<div

key={group.id}

onClick={()=>

window.location.href=
"/groups"

}

style={{

background:"white",

padding:"18px",

borderRadius:"18px",

cursor:"pointer",

width:"220px",

boxShadow:
"0 2px 10px rgba(0,0,0,.05)"

}}

>

<div
style={{
fontSize:"30px"
}}
>

👥

</div>

<h3>

{group.name}

</h3>

<p>

Tap to open

</p>

</div>

)

)

}

</div>

</section>

<br/>

<section>

<div
style={{

display:"flex",

justifyContent:"space-between",

alignItems:"center"

}}

>

<h2>

Library

</h2>

<Link
to="/library"
>

Open →

</Link>

</div>

<div
style={{

display:"grid",

gridTemplateColumns:
"repeat(3,90px)",

gap:"12px"

}}

>

{

books.map(
(book,index)=>(

<div

key={index}

style={{

background:"white",

height:"110px",

borderRadius:"14px",

display:"flex",

justifyContent:"center",

alignItems:"center",

fontSize:"34px",

boxShadow:
"0 2px 10px rgba(0,0,0,.05)"

}}

>

{book}

</div>

)

)

}

</div>

</section>

<br/>

<section
style={{

background:"white",

padding:"24px",

borderRadius:"18px",

boxShadow:
"0 2px 10px rgba(0,0,0,.05)"

}}

>

<h2>

👨‍🏫 Lecturer Connect

</h2>

<p>

Search lecturers, ask questions and request meetings.

</p>

<button

onClick={()=>

window.location.href=
"/lecturers"

}

style={{

padding:"12px 18px",

background:"#25d366",

color:"white",

border:"none",

borderRadius:"12px",

cursor:"pointer"

}}

>

Open Lecturer Connect

</button>

</section>

</main>

)

}
