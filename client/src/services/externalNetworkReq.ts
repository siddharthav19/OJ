
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
