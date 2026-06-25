import { useState, useEffect } from "react"

export default function Groups() {

const [groups, setGroups] =
useState([])

const [showForm, setShowForm] =
useState(false)

const [formData, setFormData] =
useState({
name:"",
description:""
})

const apiUrl =
import.meta.env.VITE_API_URL || ""

const token =
localStorage.getItem("token")

useEffect(() => {
fetchGroups()
}, [])

async function fetchGroups() {

try {

const res =
await fetch(
`${apiUrl}/groups`,
{
headers:{
Authorization:
"Bearer " + token
}
}
)

const data =
await res.json()

if(res.ok){

setGroups(data)

}

}

catch{

alert(
"Failed to load groups"
)

}

}

async function createGroup(e){

e.preventDefault()

try{

const res =
await fetch(
`${apiUrl}/groups`,
{

method:"POST",

headers:{

"Content-Type":
"application/json",

Authorization:
"Bearer " + token

},

body:
JSON.stringify(formData)

}
)

const data =
await res.json()

if(res.ok){

alert(
"Group created"
)

setFormData({
name:"",
description:""
})

setShowForm(false)

fetchGroups()

}

else{

alert(
data.message
)

}

}

catch{

alert(
"Create failed"
)

}

}

async function deleteGroup(id){

const confirmDelete =
window.confirm(
"Delete this group?"
)

if(
!confirmDelete
)
return

try{

const res =
await fetch(

`${apiUrl}/groups/${id}`,

{

method:
"DELETE",

headers:{
Authorization:
"Bearer " + token
}

}

)

if(res.ok){

fetchGroups()

}

else{

alert(
"Delete failed"
)

}

}

catch{

alert(
"Delete failed"
)

}

}

return (

<main>

<h1>

Your Groups

</h1>

<button
onClick={() =>
setShowForm(
!showForm
)
}

>

{showForm
?
"Cancel"
:
"Create Group"
}

</button>

<br />
<br />

{showForm && (

<form
onSubmit={
createGroup
}
>

<input

placeholder=
"Group Name"

value={
formData.name
}

onChange={(e)=>

setFormData({

...formData,

name:
e.target.value

})

}

/>

<br />
<br />

<textarea

placeholder=
"Description"

value={
formData.description
}

onChange={(e)=>

setFormData({

...formData,

description:
e.target.value

})

}

/>

<br />
<br />

<button
type="submit"
>

Create

</button>

</form>

)}

<br />

{groups.length===0 ? (

<p>

No groups yet

</p>

) : (

groups.map(
(group)=>(

<div

key={
group.id
}

style={{

border:
"1px solid #ddd",

padding:
"12px",

marginBottom:
"12px",

cursor:
"pointer"

}}

onClick={()=>

window.location.href=
"/chat"

}

>

<h3>

{group.name}

</h3>

<p>

{group.description}

</p>

<p>

Members:

{" "}

{group.members?.length || 0}

</p>

<button

onClick={(e)=>{

e.stopPropagation()

deleteGroup(
group.id
)

}}

>

Delete

</button>

</div>

)

)

)}

</main>

)

}
