import { SeasonTypeEnum } from "../common/enums";

export function getSeasonDisplayName(seasonType: SeasonTypeEnum) {
    switch (seasonType) {
        case SeasonTypeEnum.PrvaLiga:
            return '1. Liga';
        case SeasonTypeEnum.DrugaLiga:
            return '2. Liga';
        case SeasonTypeEnum.Kup:
            return 'Kup';
    }
}
