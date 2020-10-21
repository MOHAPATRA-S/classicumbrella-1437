

export function handleValidations(text,type){

    if (type === 'phoneNumber') {
        var numberRegex = /^[1-9][0-9]{9,12}$/;

        if (text === '') {
            return {
                value: text,
                status: false,
                errorText: '*Please enter phone number.'
            }
        }
        else if (!numberRegex.test(text)) {
            return {
                status: false,
                value: text,
                errorText:'*Please enter valid phone number.'
            }
           
        }
    
        else {
            return {
                value: text,
                status: true,
                errorText: ''
            }
        }
    }

    else if (type === 'password') {
        let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ 
        if (text === '') {
            return {
                value: text,
                status: false,
                errorText: ''
            }
        }else if(!passwordRegex.test(text)){
            return {
                value: text,
                status: false,
                errorText: ''
            }
        } 
        else {
            password = text
            return {
                value: text,
                status: true,
                errorText: ''
            }
        }
    }
  }


