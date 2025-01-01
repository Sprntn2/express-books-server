

export default class IBookRequest{
    bookId: string;
    bookName: string;
    imageSrc: string;
    userEmail: string;

    constructor(id: string, name: string, image: string, email: string){
        this.bookId = id;
        this.bookName = name;
        this.imageSrc = image;
        this.userEmail = email
    }
    
    isValid(){
        return true
    }
}