import * as React from 'react';

import * as classNames from 'classnames';
import { autobind } from 'core-decorators';

import './customTable.scss';
import { SortDirectionEnum } from '../../common/enums';
import { Table } from 'semantic-ui-react';
import * as _ from 'lodash';
import { MOBILE_BREAKPOINT } from '../../constants/utils';

export interface IHeaderProps {
    id: string;
    value: string;
    mobileValue?: string;

    size?: number;
    mobileSize?: number;

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
    rowClassNames?: {[rowId: string]: string};

    onRowClicked?(row: any): void;
    onHeaderClicked?(headerId: string): void;
    onCustomRowRender?(row: any, header: IHeaderProps[]): JSX.Element;
}

export default class CustomTable extends React.Component<ICustomTableProps, ICustomTableState> {
    constructor(props: ICustomTableProps) {
        super(props);

        const htmlElement = document.querySelector('html');
        const size = htmlElement !== null ? window.innerWidth / parseFloat(getComputedStyle(htmlElement)['font-size']) : 1000;

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
        const size = htmlElement !== null ? window.innerWidth / parseFloat(getComputedStyle(htmlElement)['font-size']) : 1000;
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
                            const sizeClassName: string = `${this.state.isMobile && header.mobileSize ? 'column-sm' : 'column'}-${this.state.isMobile && header.mobileSize ? header.mobileSize : header.size}`;
                            const className = classNames(header.headerClassName, {[`${sizeClassName}`]: this.state.isMobile && header.mobileSize !== undefined || header.size !== undefined});

                            return <Table.HeaderCell
                                key={header.id}
                                className={className}
                                onClick={this._headerClicked(header.id)}>
                                {this.state.isMobile && header.mobileValue ? header.mobileValue : header.value}
                            </Table.HeaderCell>;
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
                        const rowClassName = this.props.rowClassNames && rowKey in this.props.rowClassNames ?
                            this.props.rowClassNames[rowKey] : undefined;

                        return <Table.Row key={index} className={rowClassName} onClick={() => this._rowClicked(rowValue)}>
                            {
                                headers.map((header, cellIndex) => {
                                    const sizeClassName = `${this.state.isMobile && header.mobileSize ? 'column-sm' : 'column'}-${this.state.isMobile && header.mobileSize ? header.mobileSize : header.size}`;
                                    const className = classNames(header.columnClassName, {[`${sizeClassName}`]: this.state.isMobile && header.mobileSize !== undefined || header.size !== undefined});

                                    return <Table.Cell
                                        key={header.id}
                                        className={className}
                                        textAlign={header.columnTextAlign}>
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

        return (
            <Table unstackable className='custom-table'>
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
