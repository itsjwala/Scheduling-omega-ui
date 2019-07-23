import Employee from '../Employee/Employee';

export default class Interviewer{
    private emp: Employee;
    private level: Array<Object>;
    private technology: Array<Object>;

    set setEmployee(emp){
        this.emp = emp;
    }

    set setLevel(level){
        this.level = level;
    }

    set setTechnology(tech){
        this.technology = tech;
    }
}