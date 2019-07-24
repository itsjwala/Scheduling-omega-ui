

export default class Candidate{
    private id: number;
    private name: string;
    private phoneNum: number;
    private fileName: string;

    constructor(){}

    set setId(id: number){
        this.id = id;
    }

    set setName(name: string){
        this.name = name;
    }

    set setPhNum(phoneNum: number){
        this.phoneNum = phoneNum;
    }

    set setFileName(fileName){
        this.fileName = fileName;
    }

}