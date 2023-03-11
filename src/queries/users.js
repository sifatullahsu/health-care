export const getUser = async (uid) => {
  const res = await fetch(`https://the-health-care.vercel.app/api/v1/users/single/${uid}`);
  const data = res.json();

  return data;
}

export const editUser = async (id, body) => {
  const res = await fetch(`http://localhost:5000/api/v1/users/edit/${id}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  const data = res.json();

  return data;
}