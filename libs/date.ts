export const getCurrentDate = () => {
  const today = new Date();

  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const year = today.getFullYear();

  return day + "/" + month + "/" + year;
};



export const getMergedDate=() =>{
  const today = new Date();

  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const year = today.getFullYear();

  return year + "" + month + "" + day;
}

export const getCurrentTime = () => {
  const today = new Date();

  const hours = String(today.getHours()).padStart(2, "0");
  const minutes = String(today.getMinutes()).padStart(2, "0");
  const seconds = String(today.getSeconds()).padStart(2, "0");

  return hours + ":" + minutes + ":" + seconds;
};

export const convertDateToISO8601 = (inputDateString: any) => {
  const [day, month, year] = inputDateString.split("/");

  // Create a new Date object using the components
  const dateObject = new Date(`${year}-${month}-${day}`);

  // Convert the date object to ISO-8601 format
  const iso8601DateString = dateObject.toISOString();

  return iso8601DateString;
};

export const convertTimeToISO8601 = (inputTimeString: any) => {
  const [hours, minutes, seconds] = inputTimeString.split(":");

  const dateObject = new Date();

  // Set the time components
  dateObject.setHours(hours);
  dateObject.setMinutes(minutes);
  dateObject.setSeconds(seconds);

  // Convert the date object to ISO-8601 format
  const iso8601DateTimeString = dateObject.toISOString();
  return iso8601DateTimeString;
};
