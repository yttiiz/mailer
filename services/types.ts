export type ResponseRegisterJsonType = { email: string; firstname: string };

export type ResponseForgotPasswordJsonType = ResponseRegisterJsonType;

export type ResponseForgotPasswordTokenJsonType = ResponseRegisterJsonType & {
  token: string;
  url: string;
};

export type ResponseBookingJsonType = ResponseRegisterJsonType & {
  apartment: { type: string; name: string };
  dates: { starting: string; ending: string };
  fullname: string;
  price: number;
  numberOfDays: number;
};

export type ResponseContactJsonType = ResponseRegisterJsonType & {
  lastname: string;
  message: string;
};
