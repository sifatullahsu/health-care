export const loop = (data, fakeLoopItem) => {
  return data || Array(fakeLoopItem).fill('');
}