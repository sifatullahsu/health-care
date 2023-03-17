export const getDoctors = async (page, size) => {
  const res = await fetch(`https://the-health-care.vercel.app/api/v1/doctors/list?page=${page}&size=${size}`);
  const data = res.json();

  return data;
}

export const getDoctor = async (id) => {
  const res = await fetch(`https://the-health-care.vercel.app/api/v1/doctors/single/${id}`);
  const data = res.json();

  return data;
}

export const getAssociateDoctorsSearch = async (inputValue) => {
  const res = await fetch(`https://the-health-care.vercel.app/api/v1/doctors/search?name=${inputValue}`);
  const data = res.json();

  return data;
}

export const deleteDoctor = async (id) => {
  const res = await fetch(`https://the-health-care.vercel.app/api/v1/doctors/delete/${id}`, {
    method: 'DELETE'
  });
  const data = res.json();

  return data;
}

export const editDoctor = async (id, body) => {
  const res = await fetch(`https://the-health-care.vercel.app/api/v1/doctors/edit/${id}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  const data = res.json();

  return data;
}

export const createDoctor = async (body) => {
  const res = await fetch(`https://the-health-care.vercel.app/api/v1/doctors/create`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  const data = res.json();

  return data;
}