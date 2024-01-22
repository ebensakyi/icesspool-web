//import cron from 'node-cron';
//const cron = require("node-cron");
import * as cron from 'node-cron';

// function runCron  (numberOfHours: number)  {
//   const cronExpression = `0 */${numberOfHours} * * *`;

//   cron.schedule(cronExpression, () => {
//     // Your cron job logic here
//     console.log("Cron job executed every 30 secs!");
//   });
// };
export function runCronJob(intervalInHours: number, jobLogic: () => void): void {
    // Calculate the minutes and seconds from the interval
    const minutes = Math.floor((intervalInHours % 1) * 60);
    const hours = Math.floor(intervalInHours);
  
    // Create a cron expression based on the interval
    const cronExpression = `0 */${minutes} */${hours} * * *`;
  
    // Schedule the cron job
    cron.schedule(cronExpression, () => {
      // Execute the provided job logic
      jobLogic();
      console.log(`Cron job executed every ${hours} hours and ${minutes} minutes!`);
    });
  }
  
//   const myJobLogic = (): void => {
//     // Your custom job logic here
//     console.log('Executing my custom job logic...');
//   };

//   runCronJob(0.008333,myJobLogic);
