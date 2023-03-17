export const getServices = async (page, size, date) => {
  const res = await fetch(`https://the-health-care.vercel.app/api/v1/services/list?page=${page}&size=${size}&date=${date}`);
  const data = res.json();

  return data;
}

export const getService = async (id, date) => {
  const res = await fetch(`https://the-health-care.vercel.app/api/v1/services/single/${id}?date=${date}`);
  const data = res.json();

  return data;
}

export const deleteService = async (id) => {
  const res = await fetch(`https://the-health-care.vercel.app/api/v1/services/delete/${id}`, {
    method: 'DELETE'
  });
  const data = res.json();

  return data;
}

export const editService = async (id, body) => {
  const res = await fetch(`https://the-health-care.vercel.app/api/v1/services/edit/${id}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  const data = res.json();

  return data;
}

export const createService = async (body) => {
  const res = await fetch(`https://the-health-care.vercel.app/api/v1/services/create`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  const data = res.json();

  return data;
}