// export const dynamic = "force-dynamic";

import { sendFCM, sendFCToMultipleDevices } from "@/libs/send-fcm";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
 // try {
    
  // let res =  await sendFCToMultipleDevices(
  //       "New Request",
  //       `Hello biodigester request is available`,
  //       ['dgp7VTlaRYWNzufGwG0Uew:APA91bE699Y1UgL75id6iWGe5nLXXjCzthdv2-mVbL2QX5l-DoNY21l5Ad_UWP8uaoQ8tnc6Ktf1ljWdXwEuvszwW2zLp8GTojnBq3ftseAFZUNe3lPO0Zn7ehTpg4UbodLuUc2diIfl',
  //         'dN21cH7STjmOd7NOgfN_6W:APA91bEdEi6MLsyCEIrW8NltdMzSksFC891WoeXWE6c9mJqiShgP9T2pkAHH1bkLMsHQzhkMPSs-GF_3taTCy9JlsN34SoYWkTlXpZ4tCYlLmX3opWf435HNtr5AiOO-QBfhUayKB-bN'
  //       ]
  //     );
      

      let res =  await sendFCM(
        "New Request",
        `Hello biodigester request is available`,
        'dgp7VTlaRYWNzufGwG0Uew:APA91bE699Y1UgL75id6iWGe5nLXXjCzthdv2-mVbL2QX5l-DoNY21l5Ad_UWP8uaoQ8tnc6Ktf1ljWdXwEuvszwW2zLp8GTojnBq3ftseAFZUNe3lPO0Zn7ehTpg4UbodLuUc2diIfl',
         
      );
    return NextResponse.json({res});
  // } catch (error) {
  //   console.log(error);

  //   return NextResponse.json(error);
  // }
}
