export default class Employee {

    private email: string;
    private name: string;
    private wissenId: string;
    private phoneNumber: string;

    constructor(email,name,wissenId,phoneNumber){
        this.email = email;
        this.name = name;
        this.wissenId = wissenId;
        this.phoneNumber = phoneNumber;
    }

    get getEmail(): string {
        return this.email;
    }

    get getName(): string {
        return this.name;
    }

    get getwissenId(): string {
        return this.wissenId;
    }

    get getPhoneNum(): string {
        return this.phoneNumber;
    }

    set setEmail(email: string) {
        this.email = email;
    }

    set setName(name: string) {
        this.name = name;
    }

    set setWissenId(id: string) {
        this.wissenId = id;
    }

    set setPhoneNum(num: string) {
        this.phoneNumber = num;
    }
}