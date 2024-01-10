export const getCurrentDate = ()=> {
    const today = new Date();
    
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const year = today.getFullYear();
  
    return day +"/"+ month +"/"+ year;
  }

 export const getCurrentTime = ()=> {
    const today = new Date();
  
    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
    const seconds = String(today.getSeconds()).padStart(2, '0');
  
    return hours + ':' + minutes + ':' + seconds;
  }