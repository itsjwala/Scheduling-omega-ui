export class AppConstants{

    // public static get baseURL(): string { return "http://localhost:8080/api"; }
    public static get baseURL(): string { return "http://34b2c1dd.ngrok.io/api"; }
    // public static get baseURL(): string { return 'http://localhost:8080/api'; }

    public static get addScheduledSlotURL(): string { return this.baseURL+'/hrs/5/schedules';}

    public static get getCandidatesInfoURL(): string { return this.baseURL+'/candidates';}

    public static get getTechsURL(): string { return this.baseURL + '/technology';}

    public static get getLevelsURL(): string { return this.baseURL + '/levels';}

    public static  getAvailableEvents(from, to): string { return this.baseURL+`/interviewers/slots?from=${from}&to=${to}`}

    public static get addEmployee(): string { return this.baseURL+ '/employees';}

    public static get addInterviewer(): string { return this.baseURL+ '/employees/interviewers';}
}