import * as React from 'react';
import { connect } from 'react-redux';

import * as classNames from 'classnames';
import { autobind } from 'core-decorators';

import { Button } from 'semantic-ui-react';

import { IStore } from '../../store';
import { SeasonDuck } from '../../ducks';
import { SeasonTypeEnum } from '../../common/enums';
import { ISeasonInfo } from '../../common/dataStructures';

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
            seasonList.map(season => {
                if (season.type === seasonType) {
                    return <Button key={season.id}>{season.name}</Button>;
                }
            })
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

        if (isLoading) {
            return <div>
                Loading...
            </div>;
        }

        return (
            <div>
                <Button.Group>
                    {
                        includedSeasonTypes && includedSeasonTypes.map(seasonType => {
                            return <Button key={seasonType} onClick={() => this._onChangeSeasonType(seasonType)}>{seasonType}</Button>;
                        })
                    }
                </Button.Group>
                <div>
                    {
                        this._renderButtonGroup(this.state.selectedSeasonType)
                    }
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeasonSelector);
