import * as React from 'react';

import * as classNames from 'classnames';
import { autobind } from 'core-decorators';

import './grid.scss';
import { IGridProps, IHeaderProps, IGridState } from './grid.props';
import { Table } from 'semantic-ui-react';
import { SortDirectionEnum } from '../../common/enums';
import * as _ from 'lodash';

export default class Grid extends React.Component<IGridProps, IGridState> {
    constructor(props: IGridProps) {
        super(props);

        this.state = {
            clickedColumn: '',
            rows: this.props.rows,
            sortDirection: SortDirectionEnum.ASC
        };
    }

    @autobind
    _renderHeaders(headers: IHeaderProps[]) {
        return (
            <thead className='header'>
                <tr className='header-row'>
                    {
                        headers.map((header, index) => {
                            return <th
                                key={header.id}
                                className={header.className}>
                                {header.value}
                            </th>;
                        })
                    }
                </tr>
            </thead>
        );
    }

    @autobind
    _rowClicked(row: any) {
        if (this.props.onRowClicked) {
            this.props.onRowClicked(row);
        }
    }

    @autobind
    _renderRows(headers: IHeaderProps[]) {
        return (
            <tbody className='grid-body'>
                {this.state.rows.map((row, index) => {
                    const rowClassName = classNames('grid-body_row', row.className);

                    return <tr key={index} className={rowClassName} onClick={() => this._rowClicked(row)}>
                            {
                                headers.map(header => {
                                    return <td
                                        key={header.id}
                                        className='grid-body_row-cell'
                                    >
                                        {header.id in row ? row[header.id] : ' '}
                                    </td>;
                                })
                            }
                    </tr>;
                })
                }
            </tbody>
        );
    }

    render() {
        const tableClassName = classNames('grid', this.props.className);
        const headers = this._getHeaders();

        return (
            <table className={tableClassName}>
                {this._renderHeaders(headers)}
                {this._renderRows(headers)}
            </table>
        );
    }

    @autobind
    _sort(column: string) {
        const {
            rows,
            clickedColumn,
            sortDirection
        } = this.state;

        if (column === clickedColumn) {
            this.setState({
                rows: rows.reverse(),
                sortDirection: sortDirection === SortDirectionEnum.ASC ? SortDirectionEnum.DESC : SortDirectionEnum.ASC
            });

            return;
        }

        this.setState({
            rows: _.sortBy(rows, [column]),
            sortDirection: SortDirectionEnum.ASC,
            clickedColumn: column
        });
    }

    @autobind
    _getHeaders(): IHeaderProps[] {
        if (this.props.headers) {
            return this.props.headers;
        }

        let headers = new Array<IHeaderProps>();
        for (let value of this.props.rows) {
            let objectProperties = Object.getOwnPropertyNames(value);

            for (let objectProperty of objectProperties) {
                if (objectProperty === 'className') {
                    continue;
                }

                let header: IHeaderProps = {
                    id: objectProperty,
                    value: objectProperty,
                    isSortable: true,
                    isHidden: false
                };
                headers.push(header);
            }

            return headers;
        }

        return headers;
    }
}
