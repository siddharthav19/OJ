
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
     difficulty: "easy" | "medium" | "hard";
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