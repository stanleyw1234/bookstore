window.addEventListener('DOMContentLoaded', async () => {
  const{publishable_key}= await fetch('/publishable_key').then(res=>res.json())
  console.log(publishable_key)
})


