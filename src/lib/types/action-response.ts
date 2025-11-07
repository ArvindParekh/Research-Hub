export type ActionResponse<T = null> =
   | {
        success: true;
        data: T;
        message?: string;
     }
   | {
        success: false;
        data: null;
        message: string;
     };
