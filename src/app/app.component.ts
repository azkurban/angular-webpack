import { Component } from '@angular/core';
import '../assets/css/styles.css';
@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    tooltip: any = 
    {
        visible: true,
        formatFunction: (value: string): string => {
            const realVal = parseInt(value);
            return 'Year: 2016 Price Index:' + realVal;
        }
    };

    values: number[] = [102, 115, 130, 137];
}
