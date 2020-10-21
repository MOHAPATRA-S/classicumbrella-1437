
export function handleValidations(text, type) {
   console.log("textype=>>",text, type)
     if (type === 'firstname') {
        var nameRegex = /([A-z][\s\.]|[A-z])+$/;
        console.log("firstcase")
        if (text === '') {
            console.log("ifelse case")
            return {
                value: text,
                status: false,
                errorText: '*Please enter first name.'
            }
        }
        else if (!nameRegex.test(text)) {
         
            return {
                status: false,
                value: text,
                errorText:'*Please enter valid name.'
            }
           
        }
        
        else {
            console.log("else case")
            return {
                value: text,
                status: true,
                errorText: ''
            }
        }
    }
    else if (type === 'lastname') {
        var nameRegex = /([A-z][\s\.]|[A-z])+$/;
        if (text === '') {
            return {
                value: text,
                status: false,
                errorText: '*Please  enter last name.'
            }
        }
        else if (!nameRegex.test(text)) {
            return {
                status: false,
                value: text,
                errorText:'*Please enter valid name.'
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

    else if (type === 'phoneNumber') {
        var numberRegex = /^[1-9][0-9]{9,12}$/;

        if (text === '') {
            return {
                value: text,
                status: false,
                errorText: '*Please  enter phonenumber.'
            }
        }
        else if (!numberRegex.test(text)) {
            return {
                status: false,
                value: text,
                errorText:'*Please enter valid phonenumber.'
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
    else if (type === 'gstno') {
      
        if (text === '') {
            return {
                value: text,
                status: false,
                errorText: '*Please  enter  gstno .'
            }
        } else {
            return {
                value: text,
                status: true,
                errorText: ''
            }
        }
    }
    
    else if (type === 'postcode') {
      
        if (text === '') {
            return {
                value: text,
                status: false,
                errorText: '*Please  enter  postcode .'
            }
        } else {
            return {
                value: text,
                status: true,
                errorText: ''
            }
        }
    
    
    }

    else if (type === 'address') {
      
        if (text === '') {
            return {
                value: text,
                status: false,
                errorText: '*Please  enter  address .'
            }
        } else {
            return {
                value: text,
                status: true,
                errorText: ''
            }
        }
    
    
    }

    else if (type === 'transportName') {
      
        if (text === '') {
            return {
                value: text,
                status: false,
                errorText: '*Please  enter  transport name .'
            }
        } else {
            return {
                value: text,
                status: true,
                errorText: ''
            }
        }
    
    
    }


    else {  
        if (text === '') {
            return {
                value: text,
                status: false,
                errorText: '*Enter town.'
            }
        } else {
            return {
                value: text,
                status: true,
                errorText: ''
            }
        }
    }



   
}



