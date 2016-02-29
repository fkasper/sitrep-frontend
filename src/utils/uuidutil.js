export function generateUUID() {
  let da = new Date().getTime();
  if (window.performance && typeof window.performance.now === 'function') {
    da += performance.now(); // use high-precision timer if available
  }
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (cs) => {
    const ar = (da + Math.random() * 16) % 16 | 0;
    da = Math.floor(da / 16);
    return (cs === 'x' ? ar : (ar & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}
