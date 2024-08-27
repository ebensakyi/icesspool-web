export const generateCode = async (length: number) => {
  try {
    var chars = "0123456789";

    var result = "";
    for (var i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  } catch (error) {
    console.log(error);
  }
};


  export const generateTransactionCode = async (serviceArea:string,service:string) => {

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-GB').split('/').reverse().join('').slice(0, 6);

  let code = '';
  
  // Ensure the first digit is not 0
  code += Math.floor(Math.random() * 9) + 1;

  // Generate the remaining 4 digits
  for (let i = 0; i < 4; i++) {
    code += Math.floor(Math.random() * 10);
  }

  return serviceArea + service+ formattedDate + code;
}
