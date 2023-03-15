export const getServices = async (page, size) => {
  const res = await fetch(`https://the-health-care.vercel.app/api/v1/services/list?page=${page}&size=${size}`);
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