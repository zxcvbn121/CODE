class Person {
    constructor(name, birthYear, gender, email, tel, address){
        this.name = name;
        this.birthYear = birthYear;
        this.gender = gender;
        this.email = email;
        this.tel = tel;
        this.address = address;
    }
    getAge() {
        let now = new Date();
        return now=getFullYear() - this.birthYear;
    }
 }