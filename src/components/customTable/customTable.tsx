import * as React from 'react';

import * as classNames from 'classnames';
import { autobind } from 'core-decorators';

import './customTable.scss';
import { SortDirectionEnum } from '../../common/enums';
import { Table, Popup } from 'semantic-ui-react';
import * as _ from 'lodash';
import { MOBILE_BREAKPOINT } from '../../constants/utils';

export interface IHeaderProps {
    id: string;
    value: string;
    mobileValue?: string;
    tooltip?: string;

    size?: number;
    mobileSize?: number;
    isHiddenOnMobile?: boolean;

    columnClassName?: string;
    headerClassName?: string;

    columnTextAlign?: 'center' | 'left' | 'right';
}

export interface ICustomTableState {
    isMobile: boolean;
}

export interface ICustomTableProps {
    data: any[];
    rowKey: string;
    headers?: IHeaderProps[];

    className?: string;
    rowClassNames?: {[rowId: string]: string};
    isStripped?: boolean;

    onRowClicked?(row: any): void;
    onHeaderClicked?(headerId: string): void;
    onCustomRowRender?(row: any, header: IHeaderProps[]): JSX.Element;
}

export default class CustomTable extends React.Component<ICustomTableProps, ICustomTableState> {
    constructor(props: ICustomTableProps) {
        super(props);

        const htmlElement = document.querySelector('html');
        const size = htmlElement !== null ? window.innerWidth : 1000;

        this.state = {
            isMobile: size <= (MOBILE_BREAKPOINT + 5)
        };
    }

    componentDidMount() {
        window.addEventListener("resize", this._resize);
    }

    @autobind
    _resize() {
        const htmlElement = document.querySelector('html');
        const size = htmlElement !== null ? window.innerWidth : 1000;
        this.setState({
            isMobile: size <= (MOBILE_BREAKPOINT + 5)
        });
    }

    @autobind
    _renderHeaders(headers: IHeaderProps[]) {
        return (
            <Table.Header className='custom-table_header'>
                <Table.Row>
                    {
                        headers.map((header, index) => {
                            if (this.state.isMobile && header.isHiddenOnMobile) {
                                return;
                            }
                            const sizeClassName: string = `${this.state.isMobile && header.mobileSize ? 'column-sm' : 'column'}-${this.state.isMobile && header.mobileSize ? header.mobileSize : header.size}`;
                            const className = classNames(header.headerClassName, {
                                [`${sizeClassName}`]: this.state.isMobile && header.mobileSize !== undefined || header.size !== undefined,
                                clickable_header: this.props.onHeaderClicked !== undefined
                            });

                            const HeaderCell = <Table.HeaderCell
                                key={header.id}
                                className={className}
                                singleLine
                                onClick={this._headerClicked(header.id)}>
                                {this.state.isMobile && header.mobileValue ? header.mobileValue : header.value}
                            </Table.HeaderCell>;

                            return header.tooltip ? <Popup key={header.id} trigger={HeaderCell} content={header.tooltip} position='top center'/>
                                                    : HeaderCell;
                        })
                    }
                </Table.Row>
            </Table.Header>
        );
    }

    @autobind
    _renderBody(headers: IHeaderProps[]) {
        const {
            data,
            onRowClicked,
            onCustomRowRender
        } = this.props;

        return (
            <Table.Body className='custom-table_body'>
                {
                    data.map((rowValue, index) => {
                        if (onCustomRowRender) {
                            return onCustomRowRender(rowValue, headers);
                        }

                        const rowKey = rowValue[this.props.rowKey];
                        const baseRowClassName = this.props.rowClassNames && rowKey in this.props.rowClassNames ?
                            this.props.rowClassNames[rowKey] : undefined;
                        const rowClassName = classNames(baseRowClassName, {
                            clickable_row: this.props.onRowClicked !== undefined
                        });

                        return <Table.Row key={index} className={rowClassName} onClick={() => this._rowClicked(rowValue)}>
                            {
                                headers.map((header, cellIndex) => {
                                    if (this.state.isMobile && header.isHiddenOnMobile) {
                                        return;
                                    }

                                    const sizeClassName = `${this.state.isMobile && header.mobileSize ? 'column-sm' : 'column'}-${this.state.isMobile && header.mobileSize ? header.mobileSize : header.size}`;
                                    const className = classNames(header.columnClassName, {[`${sizeClassName}`]: this.state.isMobile && header.mobileSize !== undefined || header.size !== undefined});

                                    return <Table.Cell
                                        key={header.id}
                                        className={className}
                                        textAlign={header.columnTextAlign ? header.columnTextAlign : 'center'}>
                                        {header.id in rowValue ? rowValue[header.id] : ' '}
                                    </Table.Cell>;
                                })
                            }
                        </Table.Row>;
                    })
                }
            </Table.Body>
        );
    }

    render() {
        const headers = this._getHeaders();
        const className = classNames(this.props.className, 'custom-table');

        return (
            <Table unstackable striped={this.props.isStripped} className={className}>
                {this._renderHeaders(headers)}
                {this._renderBody(headers)}
            </Table>
        );
    }

    @autobind
    _rowClicked(row: any) {
        if (this.props.onRowClicked) {
            this.props.onRowClicked(row);
        }
    }

    @autobind
    _headerClicked(headerId: string) {
        if (this.props.onHeaderClicked) {
            this.props.onHeaderClicked(headerId);
        }
    }

    @autobind
    _getHeaders(): IHeaderProps[] {
        if (this.props.headers) {
            return this.props.headers;
        }

        let headers = new Array<IHeaderProps>();
        for (let value of this.props.data) {
            let objectProperties = Object.getOwnPropertyNames(value);

            for (let objectProperty of objectProperties) {
                let header: IHeaderProps = {
                    id: objectProperty,
                    value: objectProperty
                };
                headers.push(header);
            }

            return headers;
        }

        return headers;
    }
}
