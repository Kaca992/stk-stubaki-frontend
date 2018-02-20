import * as React from 'react';
import { connect } from 'react-redux';

import * as classNames from 'classnames';
import { autobind } from 'core-decorators';

import { Button, Divider, Header, Dropdown, DropdownItemProps, Label, Icon } from 'semantic-ui-react';

import { IStore } from '../../store';
import { SeasonDuck } from '../../ducks';
import { SeasonTypeEnum } from '../../common/enums';
import { ISeasonInfo } from '../../common/dataStructures';
import { getSeasonDisplayName } from '../../utils/displayFormaters';

import './seasonSelector.scss';
import ButtonLink from '../../components/buttonLink/buttonLink';

export interface ISeasonSelectorOwnProps {
    urlLink?: string;
    showNextBtn?: boolean;
    selectedSeasonType?: SeasonTypeEnum;
    includedSeasonTypes?: SeasonTypeEnum[];
}

export interface ISeasonSelectorProps {
    urlLink?: string;
    showNextBtn?: boolean;
    selectedSeasonType?: SeasonTypeEnum;
    includedSeasonTypes?: SeasonTypeEnum[];

    isLoading?: boolean;
    seasonList?: ISeasonInfo[];

    onSeasonTypeChanged?: (seasonType: SeasonTypeEnum) => void;
    onSeasonIdChanged?: (seasonId: number) => void;

    initSeasonsList?: () => void;
}

export interface ISeasonSelectorState {
    selectedSeasonType: SeasonTypeEnum;
    selectedSeasonId?: number;
}

function mapStateToProps(state: IStore, ownProps: ISeasonSelectorOwnProps): ISeasonSelectorProps {
    return {
        ...ownProps,
        isLoading: state.season.UI.isLoading,
        seasonList: SeasonDuck.selectors.getAllSeasons(state),
    };
}

function mapDispatchToProps(dispatch: any): ISeasonSelectorProps {
    return {
        initSeasonsList: () => dispatch(SeasonDuck.actionCreators.initSeasonsList())
    };
}

class SeasonSelector extends React.Component<ISeasonSelectorProps, ISeasonSelectorState> {
    public static defaultProps: Partial<ISeasonSelectorProps> = {
        urlLink: '#',
        showNextBtn: true,
        includedSeasonTypes: [SeasonTypeEnum.PrvaLiga, SeasonTypeEnum.DrugaLiga, SeasonTypeEnum.Kup],
    };

    private maxSeasonId: number = -1;

    constructor(props: ISeasonSelectorProps) {
        super(props);

        this.state = {
            selectedSeasonType: props.selectedSeasonType ? props.selectedSeasonType : SeasonTypeEnum.PrvaLiga
        };
    }

    componentDidMount() {
        if (this.props.initSeasonsList) {
            this.props.initSeasonsList();
        }
    }

    @autobind
    _onChangeSeasonType(seasonType: SeasonTypeEnum) {
        if (this.props.onSeasonTypeChanged) {
            this.props.onSeasonTypeChanged(seasonType);
        }

        this.setState({
            selectedSeasonType: seasonType,
            selectedSeasonId: undefined
        });
    }

    @autobind
    _onChangeSeasonId(seasonId: number) {
        if (this.props.onSeasonIdChanged) {
            this.props.onSeasonIdChanged(seasonId);
        }

        this.setState({
            selectedSeasonId: seasonId
        });
    }

    @autobind
    _createDropdownSeasonOptions(seasonType: SeasonTypeEnum): DropdownItemProps[] {
        let { seasonList } = this.props;

        if (!seasonList) {
            return [];
        }

        this.maxSeasonId = -1;
        let items: DropdownItemProps[] = [];
        seasonList.map(season => {
            if (season.type === seasonType) {
                items.push({
                    key: season.id,
                    text: season.godina,
                    value: season.id,
                    onClick: () => this._onChangeSeasonId(season.id)
                });

                this.maxSeasonId = this.maxSeasonId > season.id ? this.maxSeasonId : season.id;
            }
        });

        return items;
    }

    @autobind
    _createDropdownSeasonTypeOptions(): DropdownItemProps[] {
        if (!this.props.includedSeasonTypes) {
            return [];
        }

        return this.props.includedSeasonTypes.map(seasonType => {
            return {
                key: seasonType,
                text: getSeasonDisplayName(seasonType),
                value: seasonType,
                onClick: () => this._onChangeSeasonType(seasonType)
            };
        });
    }

    @autobind
    _createUrlLink(selectedSeasonOption: number): string {
        const url = this.props.urlLink ? this.props.urlLink : "#";

        return `${url}/${selectedSeasonOption}`;
    }

    render() {
        let {
            isLoading,
            seasonList,
            includedSeasonTypes,
            showNextBtn
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

        let seasonOptions = this._createDropdownSeasonOptions(this.state.selectedSeasonType);
        let selectedSeasonOption = this.state.selectedSeasonId ? this.state.selectedSeasonId : this.maxSeasonId;

        return (
            <div className="season-selector">
                <Header as='h1'>Odaberite Sezonu</Header>
                <Divider />

                <div className="season-selector_item">
                    <Label size="medium">
                        Natjecanje
                    </Label>
                    <Dropdown value={this.state.selectedSeasonType} selection scrolling fluid options={this._createDropdownSeasonTypeOptions()} />
                </div>

                <div className="season-selector_item">
                    <Label size="medium">
                        Sezona
                    </Label>
                    <Dropdown value={selectedSeasonOption} selection scrolling fluid options={this._createDropdownSeasonOptions(this.state.selectedSeasonType)} />
                </div>

                {
                    showNextBtn && <ButtonLink to={this._createUrlLink(selectedSeasonOption)} className="season-selector_btn" size="large" icon labelPosition='right'>
                        Dalje
                        <Icon name="arrow right" />
                    </ButtonLink>
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeasonSelector);
