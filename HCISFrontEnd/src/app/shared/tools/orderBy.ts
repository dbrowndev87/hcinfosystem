/**
 * This is the OrderBy class which allows you to pass in an array, and the field name
 * and order your array by that field.
 * 
 * ex:
 * private orderBy = new OrderBy()
 * this.orderBy.transform(peopleArray,'first_Name');
 * 
 *  Made into a class form the @Pipe code from here:
 *  https://stackoverflow.com/questions/35158817/angular-2-orderby-pipe
 */

export class OrderBy {
    transform(array: any, field: string): any[] {
        if (!Array.isArray(array)) {
            return;
        }
        array.sort((a: any, b: any) => {
            if (a[field] < b[field]) {
                return -1;
            } else if (a[field] > b[field]) {
                return 1;
            } else {
                return 0;
            }
        });
        return array;
    }
}


