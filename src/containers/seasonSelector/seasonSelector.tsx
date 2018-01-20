import * as React from 'react';
import { connect } from 'react-redux';

import * as classNames from 'classnames';
import { autobind } from 'core-decorators';

import { Button, Divider, Header, Grid } from 'semantic-ui-react';

import { IStore } from '../../store';
import { SeasonDuck } from '../../ducks';
import { SeasonTypeEnum } from '../../common/enums';
import { ISeasonInfo } from '../../common/dataStructures';
import { getSeasonDisplayName } from '../../utils/displayFormaters';

import './seasonSelector.scss';
import GridColumn from 'semantic-ui-react/dist/commonjs/collections/Grid/GridColumn';

export interface ISeasonSelectorProps {
    urlLink?: string;
    selectedSeasonType?: SeasonTypeEnum;
    includedSeasonTypes?: SeasonTypeEnum[];

    isLoading?: boolean;
    seasonList?: ISeasonInfo[];

    initSeasonsList?: () => void;
}

export interface ISeasonSelectorState {
    selectedSeasonType: SeasonTypeEnum;
}

function mapStateToProps(state: IStore): ISeasonSelectorProps {
    return {
        isLoading: state.seasonReducer.UI.isLoading,
        seasonList: SeasonDuck.selectors.getAllSeasons(state),
    };
}

function mapDispatchToProps(dispatch: any): ISeasonSelectorProps {
    return {
        initSeasonsList: () => dispatch(SeasonDuck.actionCreators.initSeasonsList())
    };
}

class SeasonSelector extends React.Component<ISeasonSelectorProps, any> {
    public static defaultProps: Partial<ISeasonSelectorProps> = {
        urlLink: '#',
        selectedSeasonType: SeasonTypeEnum.PrvaLiga,
        includedSeasonTypes: [SeasonTypeEnum.PrvaLiga, SeasonTypeEnum.DrugaLiga, SeasonTypeEnum.Kup],
    };

    constructor(props: ISeasonSelectorProps) {
        super(props);

        this.state = {
            selectedSeasonType: props.selectedSeasonType
        };
    }

    componentDidMount() {
        if (this.props.initSeasonsList) {
            this.props.initSeasonsList();
        }
    }

    @autobind
    _renderButtonGroup(seasonType: SeasonTypeEnum) {
        let { seasonList } = this.props;

        if (!seasonList) {
            return;
        }

        return (
            <Grid columns={3} stackable textAlign="center">
                {seasonList.map(season => {
                    if (season.type === seasonType) {
                        return <GridColumn>
                            <Button key={season.id} size="big" >{season.name}</Button>
                        </GridColumn>;
                    }
                })}
            </Grid>
        );
    }

    @autobind
    _onChangeSeasonType(seasonType: SeasonTypeEnum) {
        this.setState({
            selectedSeasonType: seasonType
        });
    }

    render() {
        let {
            isLoading,
            seasonList,
            includedSeasonTypes
        } = this.props;

        let {
            selectedSeasonType
        } = this.state;

        if (isLoading) {
            return <div>
                Loading...
            </div>;
        }

        const btnGroupClassName = "season-selector_season-group-btn";
        const btnGroupSelectedClassName = classNames("season-selector_season-group-btn", "season-selector_season-group-btn-selected");

        return (
            <div className="season-selector">
                <Header as='h1'>Odaberite sezonu</Header>
                <Divider />

                <Button.Group size="large" className="season-selector_season-group">
                    {
                        includedSeasonTypes && includedSeasonTypes.map(seasonType => {
                            return <Button
                                className={selectedSeasonType === seasonType ? btnGroupSelectedClassName : btnGroupClassName}
                                key={seasonType}
                                onClick={() => this._onChangeSeasonType(seasonType)}>{getSeasonDisplayName(seasonType)}
                            </Button>;
                        })
                    }
                </Button.Group>
                <div className="season-selector_container">
                    {
                        this._renderButtonGroup(this.state.selectedSeasonType)
                    }
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeasonSelector);
