import * as React from 'react';
import { connect } from 'react-redux';

import * as classNames from 'classnames';
import { autobind } from 'core-decorators';

import { IStore } from '../../store';
import { SeasonDuck } from '../../ducks';

export interface ISeasonSelectorProps {
    testName?: string;
    isLoading?: boolean;

    onTestBtnClick?(): void;
}

function mapStateToProps(state: IStore, ownProps: Partial<ISeasonSelectorProps>): ISeasonSelectorProps {
    return {
        testName: ownProps.testName,
        isLoading: state.seasonReducer.UI.isLoading
    };
}

function mapDispatchToProps(dispatch: any): ISeasonSelectorProps {
    return {
        onTestBtnClick: () => dispatch(SeasonDuck.actionCreators.getSeasonsList())
    };
}

class SeasonSelector extends React.Component<ISeasonSelectorProps, any> {
    constructor(props: ISeasonSelectorProps) {
        super(props);

    }

    render() {
        return (
            <div onClick={this.props.onTestBtnClick}>
                Name is:{this.props.testName} Click Me (is loading: {this.props.isLoading ? 'TRUE' : 'FALSE'})
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeasonSelector);
