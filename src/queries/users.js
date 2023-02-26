export const getUser = async (uid) => {
  const res = await fetch(`http://localhost:5000/api/v1/users/single/${uid}`);
  const data = res.json();

  return data;
}