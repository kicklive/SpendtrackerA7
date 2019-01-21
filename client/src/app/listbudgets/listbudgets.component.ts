import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../services/authenticate.service";
import { UserDetails } from "../services/authentication.model";
import { NavstateService } from "../services/navstate.service";
import { Budgetdata } from "../models/budgetdata";
import { BudgetDataService } from '../services/budget-data.service';
import { Router } from "@angular/router";
import { SharedService } from "../services/shared.service";
import { DataresolveService } from "../services/dataresolve.service";
import { ActivatedRoute } from "@angular/router";
import { nextContext } from '@angular/core/src/render3';
import { PersistanceService } from "../services/persistance.service";

interface PageRoute {
        name: string;
        route: string;
}


@Component({
        selector: 'app-listbudgets',
        templateUrl: './listbudgets.component.html',
        styleUrls: ['./listbudgets.component.css']
})
export class ListbudgetsComponent implements OnInit {

        title = 'client';
        greeting = '';
        userDetails: UserDetails;
        userName: string;
        showGrid?: boolean;
        data: BudgetDataService[] = [];

        displayedColumns = ['BudgetStartDate', 'BudgetEndDate', 'NumOfDays', 'BudgetAmount', 'BudgetStatus', 'details'];
        // dataSource = this.data;



        routes: PageRoute[] = [];
        constructor(private auth: AuthenticationService, private n: NavstateService, private ds: BudgetDataService, private route: Router,
                private service: SharedService, private drs: DataresolveService,
                private ac: ActivatedRoute, private ps: PersistanceService) {
                this.n.setNavBarState(false);
                this.n.setUserName('Hello, ' + this.auth.getUsername());
                this.n.setNavLinks(false);
        }


        ngOnInit() {
                this.routes = [{ name: 'Budget List', route: '/budgetlist' }, { name: 'Search Items', route: '/search' },
                { name: 'History', route: '/history' }, { name: 'Trends', route: '/trends' }, { name: 'About', route: '/about' },
                ];

                this.ac.data.subscribe((ret) => {
                        debugger;
                        this.data = ret.data;
                        if (this.data == null) {
                                this.showGrid = false;
                        } else {
                                this.showGrid = true;
                        }
                });
        }

        newBudget() {
                debugger;
                this.route.navigateByUrl('/newbudget');
        }

        findDiff(budget) {
                return this.ds.getNumberOFDays(budget);
        }

        ShowDetails(url, budgetId) {
                this.ps.changeMsg(budgetId);
                this.route.navigateByUrl(url);
        }

}
