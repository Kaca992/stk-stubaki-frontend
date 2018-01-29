import { SortDirectionEnum } from "../../common/enums";

export interface IHeaderProps {
    id: string;
    value: string;

    isSortable?: boolean;
    isHidden?: boolean;
    className?: string;
}

export interface IRowProps {
    [key: string]: any;
    className?: string;
}

export interface IGridProps {
    rows: IRowProps[];
    headers?: IHeaderProps[];

    className?: string;

    onRowClicked?(rowData: any): void;
}

export interface IGridState {
    rows: IRowProps[];

    clickedColumn: string;
    sortDirection: SortDirectionEnum;
}
