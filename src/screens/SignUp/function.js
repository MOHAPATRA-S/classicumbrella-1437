let password
export function handleValidations(text, type) {

    if (type === 'email') {
        let emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (text === '') {
            return {
                status: false,
                value: text,
                errorText: '*Please enter email.'
            }
        }
        else if (!emailRegex.test(text)) {
            return {
                status: false,
                value: text,
                errorText:'*Please enter valid email address.'
            }
           
        }
        else {
         
            return {
                value: text,
                status: true,
                errorText: ''
            }
        }
    }else if (type === 'firstname') {
        var nameRegex = /([A-z][\s\.]|[A-z])+$/;
      
        if (text === '') {
           
            return {
                value: text,
                status: false,
                errorText: '*Please  enter  name.'
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
    else if (type === 'lastname') {
        var nameRegex = /([A-z][\s\.]|[A-z])+$/;
        if (text === '') {
            return {
                value: text,
                status: false,
                errorText: '*Please enter company name.'
            }
        }
        else if (!nameRegex.test(text)) {
            return {
                status: false,
                value: text,
                errorText:'*Please enter valid  company  name.'
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
                errorText: '*Please enter phonenumber.'
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

    else if (type === 'password') {
       
        if (text === '') {
            return {
                value: text,
                status: false,
                errorText: '*Please enter password.'
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
    
    
    else if (type === 'confirmPassword') {
     
        if (text === '') {
            return {
                value: text,
                status: false,
                errorText: '*Please enter password again to confirm.'
            }
        } else if (password !== text) {
            return {
                value: text,
                status: false,
                errorText: '*Not matching with password.'
            }
        } 
        
       

        
        else {
            return {
                value: text,
                status:true,
                errorText: ''
            }
        }
    }else if (type === 'gstno') {
        let gstnoregex = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/
        if (text === '') {
            return {
                value: text,
                status: false,
                errorText: '*Please enter  GST  No.'
            }
        }else if(!gstnoregex.test(text)){
            return {
                value: text,
                status: false,
                errorText: '*Please enter valid GST  No.'
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
    
    else if (type === 'postcode') {
      
        if (text === '') {
            return {
                value: text,
                status: false,
                errorText: '* Please enter  postcode .'
            }
        }
        else if(text.length<6){
            return {
                value: text,
                status: false,
                errorText: '* Please enter  postcode .'
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

    else if (type === 'address') {
      
        if (text === '') {
            return {
                value: text,
                status: false,
                errorText: '* Please enter  address .'
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
                errorText: '* Please enter town.'
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
