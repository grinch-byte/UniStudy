import { useState } from "react"

export default function Library(){

const [search,setSearch]=useState("")
const [selectedBook,setSelectedBook]=useState(null)

const [question,setQuestion]=useState("")
const [answer,setAnswer]=useState("")

const [showQuiz,setShowQuiz]=
useState(false)

const [score,setScore]=
useState(0)

const [index,setIndex]=
useState(0)

const books=[

{
id:1,
title:"Database Systems",
author:"Elmasri",
pdf:"/books/database.pdf"
},

{
id:2,
title:"Algorithms",
author:"CLRS",
pdf:"/books/algorithms.pdf"
},

{
id:3,
title:"Computer Networks",
author:"Tanenbaum",
pdf:"/books/networks.pdf"
}

]

const quiz=[

{
question:
"What is a database?",

choices:[
"Stores data",
"Browser",
"Programming language"
],

answer:
"Stores data"
},

{
question:
"What does an algorithm do?",

choices:[
"Solve problems",
"Store photos",
"Play music"
],

answer:
"Solve problems"
},

{
question:
"What connects computers?",

choices:[
"Networks",
"Books",
"Printers"
],

answer:
"Networks"
}

]

function openBook(book){

setSelectedBook(book)

setQuestion("")
setAnswer("")

}

function askAI(){

if(
!selectedBook
||
!question
)

return

setAnswer(

`Answer from:

${selectedBook.title}

Question:

${question}`

)

}

function uploadBook(e){

const file =
e.target.files[0]

if(!file)
return

alert(

`${file.name}

submitted for review`

)

}

function choose(choice){

if(

choice===

quiz[index]
.answer

){

setScore(
score+1
)

}

setIndex(
index+1
)

}

const filtered=

books.filter(

book=>

book.title
.toLowerCase()
.includes(
search.toLowerCase()
)

)

return(

<main
style={{

height:"100vh",

display:"flex",

background:"#f7f9fc"

}}

>

<div
style={{

width:"320px",

background:"white",

padding:"20px",

overflow:"auto"

}}

>

<div
style={{
display:"flex",
justifyContent:"space-between"
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

<button
onClick={()=>

window.location.href=
"/admin-library"

}

>

Review

</button>

</div>

<h1>

Library

</h1>

<input

placeholder=
"Search"

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

padding:"12px"

}}

/>

<br/>
<br/>

<label
style={{

background:"#4f46e5",

color:"white",

padding:"12px",

display:"inline-block",

borderRadius:"10px",

cursor:"pointer"

}}

>

Upload PDF

<input

hidden

type="file"

accept=".pdf"

onChange={
uploadBook
}

/>

</label>

<br/>
<br/>

{

filtered.map(
(book)=>(

<div

key={book.id}

style={{

padding:"16px",

background:"white",

border:
"1px solid #ddd",

marginBottom:"10px",

borderRadius:"12px"

}}

>

<h3>

📚

{book.title}

</h3>

<p>

{book.author}

</p>

<button

onClick={()=>

openBook(
book
)

}

>

Read

</button>

</div>

)

)

}

</div>

<div
style={{
flex:1,
padding:"20px"
}}
>

{

selectedBook

?

<>

<iframe

src={
selectedBook.pdf
}

style={{

width:"100%",

height:"82%",

border:"none",

borderRadius:"12px"

}}

/>

<br/>
<br/>

<button

onClick={()=>

setShowQuiz(true)

}

style={{

background:"#4f46e5",

color:"white",

padding:"12px",

border:"none",

borderRadius:"10px"

}}

>

Finished Reading

</button>

</>

:

<div>

Select a Book

</div>

}

</div>

<div
style={{

width:"360px",

background:"white",

padding:"20px"

}}

>

<h2>

Ask AI

</h2>

<input

placeholder=
"Ask question"

value={
question
}

onChange={(e)=>

setQuestion(
e.target.value
)

}

style={{

width:"100%",

padding:"12px"

}}

/>

<br/>
<br/>

<button
onClick={
askAI
}

>

Send

</button>

<br/>
<br/>

{

answer

&&

<div
style={{

background:"#eef2ff",

padding:"16px",

borderRadius:"12px"

}}

>

🤖

{answer}

</div>

}

</div>

{

showQuiz && (

<div
style={{

position:"fixed",

top:"50%",

left:"50%",

transform:
"translate(-50%,-50%)",

background:"white",

padding:"30px",

borderRadius:"16px",

width:"500px"

}}

>

{

index
<
quiz.length

?

<>

<h2>

Quickfire

</h2>

<h3>

{
quiz[index]
.question
}

</h3>

{

quiz[index]
.choices
.map(
(c)=>(

<button

key={c}

onClick={()=>

choose(c)

}

style={{

display:"block",

marginBottom:"10px"

}}

>

{c}

</button>

)

)

}

</>

:

<>

<h2>

Completed

</h2>

<p>

Score:

{score}

/

{
quiz.length
}

</p>

<button

onClick={()=>{

setShowQuiz(false)

setScore(0)

setIndex(0)

}}

>

Close

</button>

</>

}

</div>

)

}

</main>

)

}
