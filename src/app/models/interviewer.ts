import Employee from './Employee';

export default class Interviewer{
    private emp: Employee;
    private levels: Array<Object>;
    private technologies: Array<Object>;

    set setEmployee(emp){
        this.emp = emp;
    }

    set setLevel(levels){
        this.levels = levels;
    }

    set setTechnology(tech){
        this.technologies = tech;
    }
}