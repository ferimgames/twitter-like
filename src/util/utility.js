export const generateHash = () => {
  return Math.floor(Math.random() * 100);
};

export const timeSince = (timeStamp) => {
  const dateFormating = new Date(timeStamp);
  const seconds = Math.floor((new Date() - dateFormating) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return (
      dateFormating.getDate() +
      "/" +
      (dateFormating.getMonth() + 1) +
      "/" +
      dateFormating.getFullYear()
    );
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
};
