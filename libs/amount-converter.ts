export const amtConverter = async (amt: string) => {
  if (amt.includes(".")) {
    let amtPart1 = amt.split(".")[0];
    let amtPart2 = amt.split(".")[1];

    // console.log("amt: " + amt.split(".")[0]);

    // console.log("amtPart1: " + amtPart1);
    // console.log("amtPart2: " + amtPart2);
    let part1 = await appendFrontZeroes(amtPart1);
    let part2 = await appendBackZeroes(amtPart2);

    // console.log("part1: "+ part1)
    // console.log("part2: "+ part2)

    let amount = part1 + "" + part2;

    return amount;
  } else {
    let amount = "";
    if (amt.length == 1) {
      amount = "000000000" + amt + "00";
    } else if (amt.length == 2) {
      amount = "00000000" + amt + "00";
    } else if (amt.length == 3) {
      amount = "0000000" + amt + "00";
    } else if (amt.length == 4) {
      amount = "000000" + amt + "00";
    } else if (amt.length == 5) {
      amount = "00000" + amt + "00";
    }

    return amount;
  }
};

const appendBackZeroes = async (amount: String) => {
  if (amount.charAt(amount.length - 1) == "0")
    amount = amount.replace(/.$/, "");

  if (amount.length == 0) {
    amount = amount + "00";
  } else if (amount.length == 1) {
    amount = amount + "0";
  }

  return amount;
};

const appendFrontZeroes = async (amount: String) => {
  if (amount.length == 1) {
    amount = "000000000" + amount;
  } else if (amount.length == 2) {
    amount = "00000000" + amount;
  } else if (amount.length == 3) {
    amount = "0000000" + amount;
  } else if (amount.length == 4) {
    amount = "000000" + amount;
  } else if (amount.length == 5) {
    amount = "00000" + amount;
  } else if (amount.length == 0) {
    amount = "0000000000" + amount;
  }
  return amount;
};
