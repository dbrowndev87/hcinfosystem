/**
 * This is the Semesters class.
 * A bunch of little code snippets and methods which functions which 
 * pertain to the Semesters for this program.
 * 
 * - Semesters gives array of semester information you can access by "." notation.
 * - Get current school semester gives you the current semester and the days till it ends by "." notation.
 * - Get next semester gives you the next semester and how many days till it starts by "." notation.
 * - Get todays date is self explanitory (Used in the calculation process of the otehr methods)
 * - Convert dates to days gives you the days. Using this on the end date of the semesters is
 *   what allows me to calculate the current and next semesters
 * 
 * @author: Darcy Brown
 * @since: Febuary 2nd, 2019
 */


export class Semesters {
    constructor() { }

    /**
     * Return semesters as an array of key valued pairs. This has all the semester
     * information incase we need to use it for any  of the program.
     */
    public getSemesters() {
        let date = new Date();
        let year = date.getFullYear();

        // Initial Dates  yyyy     mm-dd
        let SpringStart = year + "-01-07";
        let SpringEnd = + year + "-04-18";

        let SummerStart = year + "-05-06";
        let SummerEnd = year + "-08-16";

        let FallStart = year + "-09-04";
        let FallEnd = year + "-12-14";

        // Return the Key Value Paired array list of semesters information
        return {
            'SpringStart': SpringStart, "SpringEnd": SpringEnd, 'SpringDays': 101,
            'SummerStart': SummerStart, "SummerEnd": SummerEnd, 'SummerDays': 102,
            'FallStart': FallStart, 'FallEnd': FallEnd, 'FallDays': 101
        }

    }

    /**
     * Get Current School Semester and the days left.
     * 
     * @author: Darcy Brown
     * @since Febuary 2nd, 2019
     */
    public getCurrentSemester() {
        // Declare semester and todays date
        let semesters = this.getSemesters();
        let todaysDate = this.getTodaysDate();

        /**
         * Get the amount of days from now until the end date. Using the end date, the
         * smallest number will always justify which semester we are in. Compare them
         * and get them to return the string of the current semester.
         */
        let todayVsSpring = this.convertDatesToDays(semesters['SpringEnd'], todaysDate);
        let todayVsSummer = this.convertDatesToDays(semesters['SummerEnd'], todaysDate);
        let todayVsFall = this.convertDatesToDays(semesters['FallEnd'], todaysDate);

        let minNumber = Math.min(todayVsSpring, todayVsFall, todayVsSummer);

        if (minNumber === todayVsSpring) {
            return { "semester": "Spring", "daysLeft": todayVsSpring };
        } else if (minNumber === todayVsSummer) {
            return { "semester": "Summer", "daysLeft": todayVsSummer };
        } else if (minNumber === todayVsFall) {
            return { "semester": "Fall", "daysLeft": todayVsFall };
        }
    }

    /**
   * Get the next School Semester and the days Until.
   * 
   * @author: Darcy Brown
   * @since Febuary 2nd, 2019
   */
    public getNextSemester() {
        // Declare semester and todays date
        let semesters = this.getSemesters();
        let todaysDate = this.getTodaysDate();

        let todayVsSpring = this.convertDatesToDays(semesters['SpringStart'], todaysDate);
        let todayVsSummer = this.convertDatesToDays(semesters['SummerStart'], todaysDate);
        let todayVsFall = this.convertDatesToDays(semesters['FallStart'], todaysDate);

        let currentSemester = this.getCurrentSemester();

        if (currentSemester['semester'] === "Spring") {
            return { "nextSemester": "Summer", "daysUntil": todayVsSummer };
        } else if (currentSemester['semester'] === "Summer") {
            return { "nextSemester": "Fall", "daysUntil": todayVsFall };
        } else if (currentSemester['semester'] === "Fall") {
            return { "nextSemester": "Spring", "daysUntil": todayVsSpring };
        }
    }


    /**
     * Get todays date
     */
    public getTodaysDate() {
        let now = new Date();
        return now.toLocaleDateString('fr-ca');
    }

    /**
     * Convert two string dates to get the difference in days.
     * (tested and works with yyyy-mm-dd format)
     * @param dateOne 
     * @param dateTwo 
     */
    public convertDatesToDays(dateOne: string, dateTwo: string) {
        // Get miliseconds between two dates
        let milliseconds = Math.abs(Date.parse(dateOne) - Date.parse(dateTwo));
        let days: number = (milliseconds / (1000 * 60 * 60 * 24));
        return days;
    }
}