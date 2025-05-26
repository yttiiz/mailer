export type SetContentType = {
  textContent: string;
  userFirstname: string;
};

export type SetRegisterContentType = SetContentType & {
  userEmail: string;
};

export type ResponseRegisterJsonType = { email: string; firstname: string };

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
};
