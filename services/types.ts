export type SetContentType = {
  textContent: string;
  userFirstname: string;
};

export type SetRegisterContentType = SetContentType & {
  userEmail: string;
};

export type ResponseRegisterJsonType = { email: string; firstname: string };

export type ResponseForgotPasswordJsonType = ResponseRegisterJsonType;

export type ResponseForgotPasswordTokenJsonType = ResponseRegisterJsonType & {
  token: string;
  url: string;
};

export type SetBookingContentType = SetContentType & {
  dates: {
    starting: string;
    ending: string;
  };
  apartment: {
    type: string;
    name: string;
  };
};

export type ResponseBookingJsonType = ResponseRegisterJsonType & {
  apartment: { type: string; name: string };
  dates: { starting: string; ending: string };
  fullname: string;
  price: number;
  numberOfDays: number;
};

export type SetContactContentType = SetContentType & {
  userLastname: string;
  userEmail: string;
  userMessage: string;
};

export type SetForgotPasswordContentType = SetContentType & {
  userNewPassword: string;
};

export type SetForgotPasswordTokenContentType = SetContentType & {
  url: string;
  token: string;
};

export type ResponseContactJsonType = ResponseRegisterJsonType & {
  lastname: string;
  message: string;
};

export type SetAdminContentType = {
  textContent: string;
  userFullname: string;
  userEmail: string;
  apartment: string;
  price: number;
  dates: { starting: string; ending: string };
  amount: number;
};
