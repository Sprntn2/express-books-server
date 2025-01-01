

export default class RegisterRequest{
    fullName: string;
    email: string;
    password: string;

    constructor(fullName: string, email: string, password: string){
        this.fullName = fullName;
        this.email = email
        this.password = password
    }

    isValid(){
        //if(!this.email || this.email == "") throw "Email error"
        return true;
    }
}