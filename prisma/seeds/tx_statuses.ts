export const txStatuses = [
  {
    id: 1,
    name: "Offer Made",
  },
  {
    id: 2,
    name: "Offer Accepted",
  },
  {
    id: 3,
    name: "Payment Made / Offer in place",
  },
  {
    id: 4,
    name: "Work started request", //by sp
  },
  {
    id: 41,
    name: "Work started", //by client
  },
  {
    id: 40,
    name: "Work not started", //by client
  },
  {
    id: 5,
    name: "Work completed request", //by client
  },
  {
    id: 51,
    name: "Work completed", //by client
  },
  {
    id: 50,
    name: "Work not completed", //by client
  },
 
  {
    id: 6,
    name: "Offer closed", // by admin, sp, or client
  },{
    id: 7,
    name: "Offer rated",
  },
  {
    id: 8,
    name: "Offer cancelled by sp",  // by sp or client
  },
 {
    id: 9,
    name: "Cancelled by cl", //make as deleted and set status to 10
  },
  {
    id: 10,
    name: "Offer Re-assigned", // if cancelled by sp. push back to pool
  },
 
 

];


