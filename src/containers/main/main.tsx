import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as classNames from 'classnames';
import { autobind } from 'core-decorators';

import { IStore } from '../../store';

import './main.scss';
import Header from '../../components/header/header';
import AppRoutes from '../../routes';
import { NAVBAR_LINKS, HEADER_LINK } from '../../constants/route.config';
import { RouteComponentProps } from 'react-router';
import { SeasonDuck } from '../../ducks';

export interface IMainOwnProps extends RouteComponentProps<any> {

}

export interface IMainProps extends IMainOwnProps {
    initSeasonsList: () => void;
}

export interface IMainState {

}

function mapStateToProps(state: IStore, ownProps: IMainOwnProps): Partial<IMainProps> {
    return {

    };
}

function mapDispatchToProps(dispatch: any): Partial<IMainProps> {
    return {
        initSeasonsList: () => dispatch(SeasonDuck.actionCreators.initSeasonsList())
    };
}

class Main extends React.Component<IMainProps & RouteComponentProps<any>, IMainState> {
    constructor(props: IMainProps) {
        super(props);

    }

    componentDidMount() {
        this.props.initSeasonsList();
    }

    render() {
        return (
            <div className="app-container">
                <Header links={NAVBAR_LINKS} headerLink={HEADER_LINK} className='desktop-navigation' />
                <Header links={NAVBAR_LINKS} headerLink={HEADER_LINK} isMobile className='mobile-navigation' />
                <div className="app-content">
                    <AppRoutes />
                </div>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
