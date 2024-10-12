const imageToBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.readAsDataURL(file)
    reader.onload = function () {
      resolve(reader.result)
    }
    reader.onerror = function (error) {
      reject('Error: ', error)
    }
  })
}

export async function GetUsers(page, search) {
  //   try {
  const response = await fetch(
    `https://reqres.in/api/users?page=${page}${search ? `&s=${search}` : ''}`,
  )
  return await response.json()
  //   } catch (error) {
  //     console.error('ERROR')
  //   }
}

export async function GetUser(id) {
  //   try {
  const response = await fetch(`https://reqres.in/api/users/${id}`)
  return await response.json()
  //   } catch (error) {
  //     console.error('ERROR')
  //   }
}

export async function AddUser({ first_name, last_name, avatar }) {
  //   try {
  //   avatar = await imageToBase64(avatar)

  const response = await fetch('https://reqres.in/api/users', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ first_name, last_name, avatar }),
  })
  return await response.json()
  //   } catch (error) {
  //     console.error('ERROR')
  //   }
}

export async function UpdateUser(id, { first_name, last_name, avatar }) {
  //   try {
  //   if (avatar) avatar = await imageToBase64(avatar)

  const response = await fetch(`https://reqres.in/api/users/${id}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ first_name, last_name, avatar }),
  })
  return await response.json()
  //   } catch (error) {
  //     console.error('ERROR')
  //   }
}
