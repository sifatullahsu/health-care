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