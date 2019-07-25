export class AppConstants{


    constructor(){}


    // public static get baseURL(): string { return "http://localhost:8080/api"; }
    public static get baseURL(): string { return "http://2889523d.ngrok.io/api"; }
    // public static get baseURL(): string { return 'http://localhost:8080/api'; }

    public static addScheduledSlotURL(a): string {

        return this.baseURL + `/hrs/${a}/schedules`;

    }

    public static get getCandidatesInfoURL(): string { return this.baseURL+'/candidates';}

    public static get getTechsURL(): string { return this.baseURL + '/technology';}

    public static get getLevelsURL(): string { return this.baseURL + '/levels';}

    public static get getInterviewerNamesURL(): string { return this.baseURL + '/employees/interviewers/names';}

    public static  getAvailableEvents(from, to): string { return this.baseURL+`/interviewers/slots?from=${from}&to=${to}`}

    public static get addEmployee(): string { return this.baseURL+ '/employees';}

    public static get addInterviewer(): string { return this.baseURL+ '/employees/interviewers';}

    public static loginUser(): string{ return this.baseURL + '/login'}

    public static postFeedback(id: number): string{ return this.baseURL + `/interviewers/${id}/schedules/feedback`}

    public static getPreviousSlotsHr(id: number): string { return this.baseURL + `/hrs/${id}/schedules/previous`}

    public static getPreviousSlotsInterviewer(id: number): string { return this.baseURL + `/interviewers/${id}/schedules/previous`}

    public static  getHRReport(from, to): string {  return this.baseURL+`/reports/hrs?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`}

    public static  getInteviewerReport(from, to): string { return this.baseURL+`/reports/interviewers?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`}

    public static  getInteviewerReportNoSlotGiven(from, to): string { return this.baseURL+`/reports/interviewers/no-slots?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`}
}