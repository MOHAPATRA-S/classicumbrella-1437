export function validateMobileNumber(mobileNo) {
    var numberRegex = /^[1-9][0-9]{9,12}$/;
    mobileNo = mobileNo.trim()
    if (mobileNo == "" || mobileNo == undefined || mobileNo == null) {
        return { status: false, error: "Please enter Mobile Number." }
    }else if(!numberRegex.test(mobileNo)){
        return { status: false, error: "*Please enter a valid mobile number." }
    }else {
        return { status: true, error: '' }
    }
}
export function validatePassword(password) {
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ ;
    password = password.trim();

    if (password == "" || password == undefined || password == null) {
        return { status: false, error: "*Please enter password." }
    } 
    else if (!passwordRegex.test(password)) {
        return { status: false, error: "*Please Enter valid password."};
    }
    // else if (password.length < 8) {
    //     return { status: false, error: "Password must contain atleast 8 character."}
    // }
    else {
        return { status: true, error: '' }
    }
}