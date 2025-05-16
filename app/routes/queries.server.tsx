import { createCookieSessionStorage } from "react-router";

type SessionData = {
  userId: string;
};

type SessionFlashData = {
  error: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>(
    {
      // a Cookie from `createCookie` or the CookieOptions to create one
      cookie: {
        name: "__session",

        // all of these are optional
        domain: "reactrouter.com",
        // Expires can also be set (although maxAge overrides it when used in combination).
        // Note that this method is NOT recommended as `new Date` creates only one date on each server deployment, not a dynamic date in the future!
        //
        // expires: new Date(Date.now() + 60_000),
        httpOnly: true,
        maxAge: 60,
        path: "/",
        sameSite: "lax",
        secrets: ["s3cret1"],
        secure: true,
      },
    }
  );

export { getSession, commitSession, destroySession };


export const performMutation = ({

}) => {

 
console.log('performMutation called with:', {
})
  return null
};
// export const calculateDayAndWeek = () => {
//   const date = new Date();
//   const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });
//   const weekOfYear = Math.ceil((date.getDate() + date.getDay()) / 7);
//   return { dayOfWeek, weekOfYear };
// };

export const calculateDayAndWeek = () => {
  const today = new Date();

  // Get current day of the week (0 = Sunday, 1 = Monday, etc.)
  let dayOfWeek = today.getDay(); // Sunday is 0, Monday is 1, etc.
  // Get current week number (ISO 8601 week date system)
  const startDate = new Date(today.getFullYear(), 0, 1); // Get the first day of the year
  const days = Math.floor((today.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)); // Calculate the number of days since the start of the year

  let weekOfYear = Math.ceil((days + 1) / 7); // Week is based on the number of days passed, rounded up

    // If it's Saturday (6) or Sunday (0), set it to Monday (1)
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    dayOfWeek = 1;
    weekOfYear++
  }

  return {
    dayOfWeek: dayOfWeek,// === 0 ? 7 : dayOfWeek, // Return 7 for Sunday, otherwise return dayOfWeek
    weekOfYear: weekOfYear+1, //start from week 1?
  };
};
// dayOfWeek: getISODay(today), // 1 = Monday, 7 = Sunday
//   weekOfYear: getISOWeek(today),