export const getUserByUid = async (uid) => {
  const res = await fetch(`https://the-health-care.vercel.app/api/v1/users/single/uid/${uid}`);
  const data = res.json();

  return data;
}

export const getUser = async (id) => {
  const res = await fetch(`https://the-health-care.vercel.app/api/v1/users/single/${id}`);
  const data = res.json();

  return data;
}

export const getUsers = async (page, size) => {
  const res = await fetch(`https://the-health-care.vercel.app/api/v1/users/list?page=${page}&size=${size}`);
  const data = res.json();

  return data;
}

export const editUser = async (id, body) => {
  const res = await fetch(`https://the-health-care.vercel.app/api/v1/users/edit/${id}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  const data = res.json();

  return data;
}

export const createUser = async (body) => {
  const res = await fetch(`https://the-health-care.vercel.app/api/v1/users/create`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  const data = res.json();

  return data;
}