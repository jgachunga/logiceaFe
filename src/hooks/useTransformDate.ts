  export const dateForHumans = (timestamp: number | undefined): string | undefined => {
    if (!timestamp) return undefined;
    let date = new Date(timestamp);
  
    let year = date.getFullYear();
    let monthNames = [
      "January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"
    ];
    let monthIndex = date.getMonth();
    let month = monthNames[monthIndex];
    let day = ("0" + date.getDate()).slice(-2);
  
    return `${month} ${day} ${year}`;
  };
  