export async function GetUsers(page) {
  //   try {
  const response = await fetch(`https://reqres.in/api/users?page=${page}`)
  return await response.json()
  //   } catch (error) {
  //     console.error('ERROR')
  //   }
}

export async function AddUser(name, surname, avatar) {
  //   try {
  const response = await fetch('https://reqres.in/api/users', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, surname, avatar }),
  })
  return await response.json()
  //   } catch (error) {
  //     console.error('ERROR')
  //   }
}
