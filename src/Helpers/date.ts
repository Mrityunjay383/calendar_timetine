export const getCurrentMonthAndYear = (): {
  currentMonth: string;
  currentYear: number;
} => {
  const date: Date = new Date();
  const monthNames: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonth: string = monthNames[date.getMonth()];
  const currentYear: number = date.getFullYear();

  return { currentMonth, currentYear };
};

export const getDaysInCurrentMonth = (): string[] => {
  const date: Date = new Date();
  const year: number = date.getFullYear();
  const month: number = date.getMonth();

  // Get the number of days in the current month
  const daysInMonth: number = new Date(year, month + 1, 0).getDate();

  // Array of weekday names
  const weekdayNames: string[] = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  // Array to store the formatted date strings
  const daysArray: string[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const currentDate: Date = new Date(year, month, day);
    const dayName: string = weekdayNames[currentDate.getDay()];
    daysArray.push(`${day} ${dayName}`);
  }

  return daysArray;
};
