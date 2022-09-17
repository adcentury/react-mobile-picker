declare module "react-mobile-picker" {
    import * as React from "react";

    export interface ReactMobilePickerProps {
        /**
         * Key-value pairs as {name1: options1, name2: options2}. options is an array of all options for this name.
         */
        optionGroups?: Record<string, string[]>;

        /**
         * Selected value pairs as {name1: value1, name2: value2}.
         */
        valueGroups?: Record<string, string>;

        /**
         * Callback called when user pick a new value.
         */
        onChange?: (name: string, value: string) => void;

        /**
         * Callback called when user click on selected value.
         */
        onClick?: (name: string, value: string) => void;

        /**
         * Height of each item (that is each option). In px; default 36
         */
        itemHeight?: number;

        /**
         * Height of the picker. In px; default 216
         */
        height?: number;

        /**
         * Indicates the availibility and the direction of wheel change on the picker, `off`, `natural`, `normal`, default `off`
         */
        wheel?: 'off' | 'natural' | 'normal';
    }

    let ReactMobilePicker: React.ComponentClass<ReactMobilePickerProps>;
    export default ReactMobilePicker;
}
