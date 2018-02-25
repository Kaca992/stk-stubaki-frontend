import * as React from 'react';

import * as classNames from 'classnames';
import { autobind } from 'core-decorators';

import './customText.scss';
import { CustomTextTypeEnum } from '../../common/enums';

export interface ICustomTextProps {
    text: string;
    textType?: CustomTextTypeEnum;
    as?: 'div' | 'span';

    isBold?: boolean;
    textAlign?: 'left' | 'right' | 'center';

    className?: string;
}

export interface ICustomTextState {

}

export default class CustomText extends React.Component<ICustomTextProps, ICustomTextState> {
    static defaultProps: Partial<ICustomTextProps> = {
        textType: CustomTextTypeEnum.normal,
        as: 'div'
    };

    constructor(props: ICustomTextProps) {
        super(props);

    }

    render() {
        const {
            text,
            textType,
            className,
            as,
            textAlign,
            isBold
        } = this.props;

        const ParentType = as !== undefined ? as : 'div';
        const textAlignClass = textAlign ? `custom_text-align-${textAlign}` : null;

        const customClassName = classNames(className, `custom_text-${textType}`, textAlignClass, {
            'custom_text-bold': isBold
        });

        return (
            <ParentType className={customClassName}>
                {text}
            </ParentType>
        );
    }
}
