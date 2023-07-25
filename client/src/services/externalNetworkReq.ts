
export interface postResponseUser {
     status: string;
     data: {
          name: string;
          mail: string;
          token: string;
     };
}

export interface AError extends Error {
     response: {
          data: {
               status: string;
               message: string;
          };
     };
}


export interface Problem {
     difficulty: string;
     name: string;
     id: string;
     _id?: string;
     submissionsCount: number;
     testCaseId?: string;
     description?: string;
}

export interface AllProblems {
     status: string;
     result: {
          problems: Problem[];
     };
}

export interface submissionsInterface {
     submissions: [
          {
               _id: string;
               problem: {
                    name: string;
                    id: string;
               };
               submittedAt: string;
               language: string;
               verdict: string;
          }
     ];
}


export function getTimeElapsed(dateString: string) {
     const inputDate = new Date(dateString);
     const currentDate = new Date();
     const timeDifference = currentDate.getTime() - inputDate.getTime();
     const millisecondsPerMinute = 60 * 1000;
     const millisecondsPerHour = 60 * millisecondsPerMinute;

     if (timeDifference < millisecondsPerMinute) {
          return "less than a minute ago";
     } else if (timeDifference < millisecondsPerHour) {
          const totalMinutes = Math.floor(timeDifference / millisecondsPerMinute);
          return `${totalMinutes}mins ago`;
     } else if (timeDifference < 24 * millisecondsPerHour) {
          const totalHours = Math.floor(timeDifference / millisecondsPerHour);
          return `${totalHours}h ago`;
     } else {
          const totalDays = Math.floor(timeDifference / (24 * millisecondsPerHour));
          const months = Math.floor(totalDays / 30);
          const remainingDays = totalDays % 30;
          if (months == 0) return `${remainingDays}D ago`
          return `${months}M and ${remainingDays}D ago`;
     }
}
