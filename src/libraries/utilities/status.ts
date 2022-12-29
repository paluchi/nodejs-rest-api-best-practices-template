import CreateError from "http-errors";

export interface IGenericStatus {
  success: boolean;
  message?: string;
  data?: any;
}

export interface ISuccess extends IGenericStatus {
  success: true;
  message: string;
  data: any;
}
export interface IFailure extends IGenericStatus {
  success: false;
  message: string;
  data: any;
}

export type IStatus = IFailure | ISuccess;

// Very flexible status generator
export const createNewStatus = (
  status: boolean | number,
  message: string = "Operation made successfully",
  data: any
): IStatus => {
  if (typeof status === "boolean") {
    return { success: status, message, data };
  } else {
    return {
      success: false,
      message: message,
      data: CreateError(status, message, data),
    };
  }
};

export const failure = (
  status: number | false,
  message: string,
  data?: any
) => {
  return createNewStatus(status, message, data);
};

export const success = <IData>(data?: IData, message?: string) => {
  return createNewStatus(true, message, data);
};
