export class AppConstants{

    public static get baseURL(): string { return 'http://localhost:8080/api'; }

    public static get addScheduledSlotURL(): string { return 'http://85519a1d.ngrok.io/api/hrs/5/schedules';}

    public static get getCandidatesInfoURL(): string { return 'http://85519a1d.ngrok.io/api/candidates';}

    public static get getLevelsURL(): string { return 'http://85519a1d.ngrok.io/api/levels'}

    public static  getAvailableEvents(from, to): string { return `http://85519a1d.ngrok.io/api/interviewers/slots?from=${from}&to=${to}`}

}