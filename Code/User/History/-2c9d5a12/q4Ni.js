export function validNameForSignUp( firstName, lastName ){
    return true;
}

export function validUserIdForSignUp( userId ){
    return true;
}

export function validEmailForSignUp( email ){
  var re = /\S+@\S+\.\S+/;
    return re.test(email.toLowerCase());
}

export function validPasswordForSignUp( password ){
    return !!password;
}

export function validPhoneNumberForSignUp( phoneNumber ){
    return true;
}

export function validUserAgeForSignUp( age ){
    return !!age;
}
