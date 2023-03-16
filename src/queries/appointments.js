export const getAppointments = async (page, size) => {
  const res = await fetch(`https://the-health-care.vercel.app/api/v1/appointments/list?page=${page}&size=${size}`);
  const data = res.json();

  return data;
}

export const getAppointmentsByDoctor = async (id, page, size) => {
  const res = await fetch(`https://the-health-care.vercel.app/api/v1/appointments/list/doctor/${id}?page=${page}&size=${size}`);
  const data = res.json();

  return data;
}

export const getAppointment = async (id) => {
  const res = await fetch(`https://the-health-care.vercel.app/api/v1/appointments/single/${id}`);
  const data = res.json();

  return data;
}

export const getDashData = async (userId) => {
  const res = await fetch(`https://the-health-care.vercel.app/api/v1/appointments/dash-data/${userId}`);
  const data = res.json();

  return data;
}

export const createAppointment = async (body) => {
  const res = await fetch(`https://the-health-care.vercel.app/api/v1/appointments/create`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  const data = res.json();

  return data;
}