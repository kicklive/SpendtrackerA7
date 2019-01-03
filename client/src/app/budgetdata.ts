export interface Budgetdata {
    _id:string,
    BudgetStartDate:string, 
    BudgetEndDate:string, 
    BudgetAmount:string, 
    BudgetStatus:string, 
    BudgetType:string
}

export interface BudgetDetails{
    _id:string,
    BudgetStartDate:string, 
    BudgetEndDate:string, 
    BudgetAmount:string, 
    BudgetStatus:string, 
    BudgetType:string,
    Transactions:BudgetTransactions[]
}
export interface BudgetTransactions{
    itemdescription: string,
    itemprice: string,
    store: string
    transdate: string,
    upc: string
}
