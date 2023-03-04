export const getUser = async (uid) => {
  const res = await fetch(`https://the-health-care.vercel.app/api/v1/users/single/${uid}`);
  const data = res.json();

  return data;
}