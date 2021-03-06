import { Component } from "@angular/core";

@Component({
    selector: "contributors",
    templateUrl: "contributors.component.html"
})
export class ContributorsComponent {

    constructor() {
    }

    getExperienceYears(beginYear: number): string {
        var beginYearValue = Number(beginYear);

        if (beginYearValue === 0) {
            return `-`;
        }

        let totalYears = new Date().getUTCFullYear() - beginYearValue;
        return `${totalYears}+`;
    }

    getJoinedOnDate(day: any, month: any, year: any): Date {
        return new Date(year, month - 1, day);
    }
}
