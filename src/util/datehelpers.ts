export function convertUTCToLocal(utcDateTimeString: any) {
  console.log(`${utcDateTimeString}`);

  return {
    date: `${utcDateTimeString}`.slice(4, 16),
    time: `${utcDateTimeString}`.slice(16, 21),
  };
}

export function generateRandomId(length: number): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
  let result = '';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }

  return result;
}
