export const getDoctors = async (page, size) => {
  const res = await fetch(`https://the-health-care.vercel.app/api/v1/doctors/list?page=${page}&size=${size}`);
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