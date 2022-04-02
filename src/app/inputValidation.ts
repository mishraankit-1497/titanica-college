export const emailValidation = (email: string) => {
  let re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const nameValidation = (name: string) => {
  let re = /^([a-zA-Z ]){2,30}$/;
  return re.test(name);
};

export function passwordValidation(password: string): any {
  //   let reg = /^(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[!@#\$%\^&\*])(?=.{8,})/;
  let reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  if (reg.test(password)) {
    return {
      res: true,
      error: '',
    };
  } else {
    return {
      res: false,
      error:
        'Password should contains at least one lowercase, one uppercase, one special character and must be eight characters or longer',
    };
  }
  return true;
}

export const emailValidation1 = (email: string) => {
  let re = /\S+@\S+\.\S+/;
  if (re.test(email)) {
    return {
      res: true,
      error: '',
    };
  } else {
    return {
      res: false,
      error: 'Please enter a valid email address. Eg. abc@xyz.com',
    };
  }
};

export const nameValidation1 = (name: string) => {
  let re = /^([a-zA-Z ]){2,30}$/;
  if (re.test(name)) {
    return {
      res: true,
      error: '',
    };
  } else {
    return {
      res: false,
      error: 'Not a valid first name',
    };
  }
};

export const lastNameValidation1 = (name: string) => {
  let re = /^([a-zA-Z ]){2,30}$/;
  if (re.test(name)) {
    return {
      res: true,
      error: '',
    };
  } else {
    return {
      res: false,
      error: 'Not a valid last name',
    };
  }
};

export const passwordValidation1 = (password: string) => {
  return {
    res: true,
    error: '',
  };
};

export const cvvValidation = (cvv: string) => {
  let re = /^(0|[1-9]\d*)$/;

  if (!(cvv.length == 3 || cvv.length == 4)) {
    return {
      error: 'cvv length should be 3 or 4',
    };
  } else if (!re.test(cvv)) {
    return {
      error: 'cvv should be number',
    };
  } else {
    return {
      error: null,
    };
  }
};

export const cardExpiryDateValidation = (date: string) => {
  let splittedData = date.split('/');
  let month1 = splittedData[0];
  let year1 = splittedData[1];
  var today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  console.log('splitted data', splittedData);
  console.log('current month and year', month, year);
  if (splittedData.length > 2) {
    return {
      error: 'Enter valid expiry date',
    };
  }
  //   if(!Number(month1) || !Number(year1) ) {
  //     return {
  //         error: "Enter valid expiry date",
  //       };
  //     }
  //   }
  if (parseInt(splittedData[1]) < year) {
    return {
      error: 'Enter valid expiry date',
    };
  } else if (
    parseInt(splittedData[0]) == year &&
    parseInt(splittedData[1]) < month
  ) {
    return {
      error: 'Enter valid expiry date',
    };
  } else {
    return {
      error: null,
    };
  }
};

export const cardNumberValidation = (cardNumber: string) => {
  let re = /^(0|[1-9]\d*)$/;
  if (cardNumber.length == 0) {
    return {
      error: 'Enter card number',
    };
  } else if (!re.test(cardNumber)) {
    return {
      error: 'card number should be numeric',
    };
  } else {
    return {
      error: null,
    };
  }
};

export const userNameValidation = (userName: string) => {
  let re = /\s/;
  if (!userName.includes(' ')) {
    return {
      res: true,
      error: '',
    };
  } else {
    return {
      res: false,
      error: 'Username shouldn`t contain space',
    };
  }
};

export const phoneNumberValidation = (phoneNumber: any) => {
  let re = /^[6-9]{1}[0-9]{9}$/;
  if (re.test(phoneNumber)) {
    return {
      res: true,
      error: '',
    };
  } else {
    return {
      res: false,
      error: 'Number must be of 10 digits and start with 6 to 9',
    };
  }
};

export const rollNumberValidation = (rollNumber: string) => {
  let re = /^[1]{1}[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{3}$/;
  if (re.test(rollNumber)) {
    return {
      res: true,
      error: '',
    };
  } else {
    return {
      res: false,
      error: 'Please enter in correct format. Eg. 1ME17CS001',
    };
  }
};
