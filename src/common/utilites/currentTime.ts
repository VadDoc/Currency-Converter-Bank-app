const addZero = (number: number) => number < 10 ? `0${number}` : number

export const currentDate = (data: Date) => {
  const Year = data.getFullYear();
  const Month = data.getMonth();
  const Day = data.getDate();

  return `${Year}-${addZero(Month+1)}-${addZero(Day)}`
}

export const currentTime = (data: Date) => {
  const Hour = data.getHours();
  const Minutes = data.getMinutes();
  const Seconds = data.getSeconds();

  return `${addZero(Hour)}:${addZero(Minutes)}:${addZero(Seconds)}`
}

