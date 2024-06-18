

export interface IFilterCallbackProps
{
    key: string,
    label: string,
    filterFunction: any,
    filterParams: any
}

export interface FilterSetting
{
    key: string,
    defaultIndex: number,
    filter: (props: any) => JSX.Element,
    options: any
}


export interface IFilterSupportFunction
{
    getAttributeToFilter: (item:  any) => any,
    filterFunction: (dataSource: any[], targetData: any| null) => any,
    getTagLabel: (params: any | null) => any | null
}

