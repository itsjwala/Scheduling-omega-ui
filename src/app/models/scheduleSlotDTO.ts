import Candidate from './candidate';

export default class ScheduleSlotDTO {

    private slotId: number;
    private interviewerId: number;
    private hrId: number;
    private interviewDescription: string;
    private candidate: Candidate;
    private technologyId: number;
    private levelId: number;

    constructor() { }

    set setSlotId(slotId: number) {
        this.slotId = slotId;
    }

    set setInterviewerId(interviewerId: number) {
        this.interviewerId = interviewerId;
    }

    set setHrId(hrId: number) {
        this.hrId = hrId;
    }

    set setInterviewDescription(interviewerDescription: string) {
        this.interviewDescription = interviewerDescription;
    }

    set setCandidate(candidate: Candidate){
        this.candidate = candidate;
    }

    set setTechnologyId(tech: number){
        this.technologyId = tech;
    }

    set setLevelId(levelId: number){
        this.levelId = levelId;
    }
}