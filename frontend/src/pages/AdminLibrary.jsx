import { useState } from "react"

export default function AdminLibrary(){

const [pending,setPending]=
useState([

{
id:1,
title:"Student Physics Notes",
author:"Community"
}

])

function approve(id){

setPending(

pending.filter(
b=>
b.id!==id
)

)

alert(
"Book approved"
)

}

function reject(id){

setPending(

pending.filter(
b=>
b.id!==id
)

)

alert(
"Book rejected"
)

}

return(

<main
style={{
padding:"30px",
background:"#f7f9fc",
minHeight:"100vh"
}}
>

<button
onClick={()=>
window.history.back()
}

>

← Back

</button>

<h1>

Library Review

</h1>

{pending.length===0 && (

<p>

No books pending

</p>

)}

{pending.map(
(book)=>(

<div

key={book.id}

style={{

background:"white",

padding:"20px",

borderRadius:"14px",

marginBottom:"16px"

}}

>

<h3>

{book.title}

</h3>

<p>

Uploaded by:
{book.author}

</p>

<div
style={{
display:"flex",
gap:"10px"
}}
>

<button

onClick={()=>

approve(
book.id
)

}

>

Approve

</button>

<button

onClick={()=>

reject(
book.id
)

}

>

Reject

</button>

</div>

</div>

)

)}

</main>

)

}
