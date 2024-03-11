/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/*
 * Copyright (c) 2019, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import Popper from '@mui/material/Popper';
import ListSubheader from '@mui/material/ListSubheader';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';
import useAutocomplete, { createFilterOptions } from './useAutocomplete';

export { createFilterOptions };

const PREFIX = 'Autocomplete';

const classes = {
    root: `${PREFIX}-root`,
    focused: `${PREFIX}-focused`,
    fullWidth: `${PREFIX}-fullWidth`,
    tag: `${PREFIX}-tag`,
    tagSizeSmall: `${PREFIX}-tagSizeSmall`,
    hasPopupIcon: `${PREFIX}-hasPopupIcon`,
    hasClearIcon: `${PREFIX}-hasClearIcon`,
    inputRoot: `${PREFIX}-inputRoot`,
    input: `${PREFIX}-input`,
    inputFocused: `${PREFIX}-inputFocused`,
    endAdornment: `${PREFIX}-endAdornment`,
    clearIndicator: `${PREFIX}-clearIndicator`,
    clearIndicatorDirty: `${PREFIX}-clearIndicatorDirty`,
    popupIndicator: `${PREFIX}-popupIndicator`,
    popupIndicatorOpen: `${PREFIX}-popupIndicatorOpen`,
    popper: `${PREFIX}-popper`,
    popperDisablePortal: `${PREFIX}-popperDisablePortal`,
    paper: `${PREFIX}-paper`,
    listbox: `${PREFIX}-listbox`,
    loading: `${PREFIX}-loading`,
    noOptions: `${PREFIX}-noOptions`,
    option: `${PREFIX}-option`,
    groupLabel: `${PREFIX}-groupLabel`,
    groupUl: `${PREFIX}-groupUl`,
};

const Root = styled('div')(({ theme }) => ({
    [`& .${classes.root}`]: {
        // more to be added...
        [`&.${classes.focused} .${classes.clearIndicatorDirty}`]: {
            visibility: 'visible',
        },
        [`&:hover .${classes.clearIndicator}`]: {
            visibility: 'visible',
        },
    },
    [`& .${classes.focused}`]: { 
        // no change
    },
    [`&.${classes.fullWidth}, & .${classes.fullWidth}`]: {
        width: '100%',
    },
    [`& .${classes.tag}`]: {
        margin: 3,
        maxWidth: 'calc(100% - 6px)',
    },
    [`& .${classes.tagSizeSmall}`]: {
        margin: 2,
        maxWidth: 'calc(100% - 4px)',
    },
    [`& .${classes.hasPopupIcon}`]: {
        // no change
    },
    [`& .${classes.hasClearIcon}`]: {
        // no change
    },
    [`& .${classes.inputRoot}`]: {
        flexWrap: 'wrap',
        [`.${classes.hasPopupIcon} &, .${classes.hasClearIcon} &`]: {
            paddingRight: 30,
        },
        [`.${classes.hasPopupIcon}.${classes.hasClearIcon} &`]: {
            paddingRight: 56,
        },
        // --------------------------

        [`& .${classes.input}}`]: {
            width: 0,
            minWidth: 30,
        },
        [`&[class*="MuiInput-root"]`]: {
            paddingBottom: 1,
            [`& .${classes.input}`]: {
                padding: 4,
            },
            [`& .${classes.input}:first-child`]: {
                padding: '6px 0',
            },
        },
        [`&[class*="MuiInput-root"][class*="MuiInput-marginDense"]`]: {
            [`& .${classes.input}`]: {
                padding: '4px 4px 5px',
            },
            [`& .${classes.input}:first-child`]: {
                padding: '3px 0 6px',
            },
        },
        [`&[class*="MuiOutlinedInput-root"]`]: {
            padding: 9,
            [`.${classes.hasPopupIcon} &, .${classes.hasClearIcon} &`]: {
                paddingRight: 26 + 4 + 9,
            },
            [`.${classes.hasPopupIcon}.${classes.hasClearIcon} &`]: {
                paddingRight: 52 + 4 + 9,
            },
            [`& .${classes.input}`]: {
                padding: '9.5px 4px',
            },
            [`& .${classes.input}:first-child`]: {
                paddingLeft: 6,
            },
            [`& .${classes.endAdornment}`]: {
                right: 9,
            },
        },
        [`&[class*="MuiOutlinedInput-root"][class*="MuiOutlinedInput-marginDense"]`]: {
            padding: 6,
            [`& .${classes.input}`]: {
                padding: '4.5px 4px',
            },
        },
        [`&[class*="MuiFilledInput-root"]`]: {
            paddingTop: 19,
            paddingLeft: 8,
            [`.${classes.hasPopupIcon} &, .${classes.hasClearIcon} &`]: {
                paddingRight: 26 + 4 + 9,
            },
            [`.${classes.hasPopupIcon}.${classes.hasClearIcon} &`]: {
                paddingRight: 52 + 4 + 9,
            },
            [`& .${classes.input}`]: {
                padding: '9px 4px',
            },
            [`& .${classes.endAdornment}`]: {
                right: 9,
            },
        },
        [`&[class*="MuiFilledInput-root"][class*="MuiFilledInput-marginDense"]`]: {
            paddingBottom: 1,
            [`& .${classes.input}`]: {
                padding: '4.5px 4px',
            },
        },
        // --------------------------
    },
    [`& .${classes.input}`]: {
        flexGrow: 1,
        textOverflow: 'ellipsis',
        opacity: 0,
    },
    [`& .${classes.inputFocused}`]: {
        opacity: 1,
    },
    [`& .${classes.endAdornment}`]: {
        // We use a position absolute to support wrapping tags.
        position: 'absolute',
        right: 0,
        top: 'calc(50% - 14px)', // Center vertically
    },
    [`& .${classes.clearIndicator}`]: {
        marginRight: -2,
        padding: 4,
        visibility: 'hidden',
    },
    [`& .${classes.clearIndicatorDirty}`]: {
        // no change
    },
    [`& .${classes.popupIndicator}`]: {
        padding: 2,
        marginRight: -2,
    },
    [`& .${classes.popupIndicatorOpen}`]: {
        transform: 'rotate(180deg)',
    },
    [`& .${classes.popper}`]: {
        zIndex: theme.zIndex.modal,
    },
    [`& .${classes.popperDisablePortal}`]: {
        position: 'absolute',
    },
    [`& .${classes.paper}`]: {
        ...theme.typography.body1,
        overflow: 'hidden',
        margin: '4px 0',
    },
    [`& .${classes.listbox}`]: {
        listStyle: 'none',
        margin: 0,
        padding: '8px 0',
        maxHeight: '40vh',
        overflow: 'auto',
    },
    [`& .${classes.loading}`]: {
        color: theme.palette.text.secondary,
        padding: '14px 16px',
    },
    [`& .${classes.noOptions}`]: {
        color: theme.palette.text.secondary,
        padding: '14px 16px',
    },
    [`& .${classes.option}`]: {
        minHeight: 48,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        cursor: 'pointer',
        paddingTop: 6,
        boxSizing: 'border-box',
        outline: '0',
        WebkitTapHighlightColor: 'transparent',
        paddingBottom: 6,
        paddingLeft: 16,
        paddingRight: 16,
        [`&[aria-selected="true"]`]: {
            backgroundColor: theme.palette.action.selected,
        },
        [`&[data-focus="true"]`]: {
            backgroundColor: theme.palette.action.hover,
        },
        [`&:active`]: {
            backgroundColor: theme.palette.action.selected,
        },
        [`&[aria-disabled="true"]`]: {
            opacity: 0.5,
            pointerEvents: 'none',
        },
    },
    [`& .${classes.groupLabel}`]: {
        backgroundColor: theme.palette.background.paper,
        top: -8,
    },
    [`& .${classes.groupUl}`]: {
        padding: 0,
        [`& .${classes.option}`]: {
            paddingLeft: 24,
        },
    },
}));

function DisablePortal(props) {
    // eslint-disable-next-line react/prop-types
    const { anchorEl, open, ...other } = props;
    return <div {...other} />;
}

const Autocomplete = React.forwardRef((props, ref) => {
    /* eslint-disable no-unused-vars */
    const {
        autoComplete = false,
        autoHighlight = false,
        autoSelect = false,
        blurOnSelect = false,
        ChipProps,
        className,
        clearOnBlur = !props.freeSolo,
        clearOnEscape = false,
        clearText = 'Clear',
        closeIcon = <CloseIcon fontSize='small' />,
        closeText = 'Close',
        debug = false,
        defaultValue = props.multiple ? [] : null,
        disableClearable = false,
        disableCloseOnSelect = false,
        disabled = false,
        disabledItemsFocusable = false,
        disableListWrap = false,
        disablePortal = false,
        filterOptions,
        filterSelectedOptions = false,
        forcePopupIcon = 'auto',
        freeSolo = false,
        fullWidth = false,
        getLimitTagsText = (more) => `+${more}`,
        getOptionDisabled,
        getOptionLabel = (x) => x,
        getOptionSelected,
        groupBy,
        handleHomeEndKeys = !props.freeSolo,
        id: idProp,
        includeInputInList = false,
        inputValue: inputValueProp,
        limitTags = -1,
        ListboxComponent = 'ul',
        ListboxProps,
        loading = false,
        loadingText = 'Loading…',
        multiple = false,
        noOptionsText = 'No options',
        onChange,
        onClose,
        onHighlightChange,
        onInputChange,
        onOpen,
        open,
        openOnFocus = false,
        openText = 'Open',
        options,
        PaperComponent = Paper,
        PopperComponent: PopperComponentProp = Popper,
        popupIcon = <ArrowDropDownIcon />,
        renderGroup: renderGroupProp,
        renderInput,
        renderOption: renderOptionProp,
        renderTags,
        selectOnFocus = !props.freeSolo,
        size = 'medium',
        value: valueProp,
        ...other
    } = props;
    /* eslint-enable no-unused-vars */

    const PopperComponent = disablePortal ? DisablePortal : PopperComponentProp;

    const {
        getRootProps,
        getInputProps,
        getInputLabelProps,
        getPopupIndicatorProps,
        getClearProps,
        getTagProps,
        getListboxProps,
        getOptionProps,
        value,
        dirty,
        id,
        popupOpen,
        focused,
        focusedTag,
        anchorEl,
        setAnchorEl,
        inputValue,
        groupedOptions,
    } = useAutocomplete({ ...props, componentName: 'Autocomplete' });

    let startAdornment;

    if (multiple && value.length > 0) {
        const getCustomizedTagProps = (params) => ({
            className: clsx(classes.tag, {
                [classes.tagSizeSmall]: size === 'small',
            }),
            disabled,
            ...getTagProps(params),
        });

        if (renderTags) {
            startAdornment = renderTags(value, getCustomizedTagProps);
        } else {
            startAdornment = value.map((option, index) => (
                <Chip
                    label={getOptionLabel(option)}
                    size={size}
                    {...getCustomizedTagProps({ index })}
                    {...ChipProps}
                />
            ));
        }
    }

    if (limitTags > -1 && Array.isArray(startAdornment)) {
        const more = startAdornment.length - limitTags;
        if (!focused && more > 0) {
            startAdornment = startAdornment.splice(0, limitTags);
            startAdornment.push(
                <span className={classes.tag} key={startAdornment.length}>
                    {getLimitTagsText(more)}
                </span>,
            );
        }
    }

    const defaultRenderGroup = (params) => (
        <li key={params.key}>
            <ListSubheader className={classes.groupLabel} component='div'>
                {params.group}
            </ListSubheader>
            <ul className={classes.groupUl}>{params.children}</ul>
        </li>
    );

    const renderGroup = renderGroupProp || defaultRenderGroup;
    const renderOption = renderOptionProp || getOptionLabel;

    const renderListOption = (option, index) => {
        const optionProps = getOptionProps({ option, index });

        return (
            <li {...optionProps} className={classes.option}>
                {renderOption(option, {
                    selected: optionProps['aria-selected'],
                    inputValue,
                })}
            </li>
        );
    };

    const hasClearIcon = !disableClearable && !disabled;
    const hasPopupIcon = (!freeSolo || forcePopupIcon === true) && forcePopupIcon !== false;

    return <Root className={clsx({ [classes.fullWidth]: fullWidth })}>
        <div
            ref={ref}
            className={clsx(
                classes.root,
                {
                    [classes.focused]: focused,
                    [classes.fullWidth]: fullWidth,
                    [classes.hasClearIcon]: hasClearIcon,
                    [classes.hasPopupIcon]: hasPopupIcon,
                },
                className,
            )}
            {...getRootProps(other)}
        >
            {renderInput({
                id,
                disabled,
                fullWidth: true,
                size: size === 'small' ? 'small' : undefined,
                InputLabelProps: getInputLabelProps(),
                InputProps: {
                    ref: setAnchorEl,
                    className: classes.inputRoot,
                    startAdornment,
                    endAdornment: (
                        <div className={classes.endAdornment}>
                            {hasClearIcon ? (
                                <IconButton
                                    {...getClearProps()}
                                    aria-label={clearText}
                                    title={clearText}
                                    className={clsx(classes.clearIndicator, {
                                        [classes.clearIndicatorDirty]: dirty,
                                    })}
                                    size='large'>
                                    {closeIcon}
                                </IconButton>
                            ) : null}

                            {hasPopupIcon ? (
                                <IconButton
                                    {...getPopupIndicatorProps()}
                                    disabled={disabled}
                                    aria-label={popupOpen ? closeText : openText}
                                    title={popupOpen ? closeText : openText}
                                    className={clsx(classes.popupIndicator, {
                                        [classes.popupIndicatorOpen]: popupOpen,
                                    })}
                                    size='large'>
                                    {popupIcon}
                                </IconButton>
                            ) : null}
                        </div>
                    ),
                },
                inputProps: {
                    className: clsx(classes.input, {
                        [classes.inputFocused]: focusedTag === -1,
                    }),
                    disabled,
                    ...getInputProps(),
                },
            })}
        </div>
        {popupOpen && anchorEl ? (
            <PopperComponent
                className={clsx(classes.popper, {
                    [classes.popperDisablePortal]: disablePortal,
                })}
                style={{
                    width: anchorEl ? anchorEl.clientWidth : null,
                }}
                role='presentation'
                anchorEl={anchorEl}
                open
            >
                <PaperComponent className={classes.paper}>
                    {loading && groupedOptions.length === 0 ? (
                        <div className={classes.loading}>{loadingText}</div>
                    ) : null}
                    {groupedOptions.length === 0 && !freeSolo && !loading ? (
                        <div className={classes.noOptions}>{noOptionsText}</div>
                    ) : null}
                    {groupedOptions.length > 0 ? (
                        <ListboxComponent
                            className={classes.listbox}
                            {...getListboxProps()}
                            {...ListboxProps}
                        >
                            {groupedOptions.map((option, index) => {
                                if (groupBy) {
                                    return renderGroup({
                                        key: option.key,
                                        group: option.group,
                                        children: option.options.map((option2, index2) =>
                                            renderListOption(option2, option.index + index2),
                                        ),
                                    });
                                }
                                return renderListOption(option, index);
                            })}
                        </ListboxComponent>
                    ) : null}
                </PaperComponent>
            </PopperComponent>
        ) : null}
    </Root>;
});

Autocomplete.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * If `true`, the portion of the selected suggestion that has not been typed by the user,
     * known as the completion string, appears inline after the input cursor in the textbox.
     * The inline completion string is visually highlighted and has a selected state.
     */
    autoComplete: PropTypes.bool,
    /**
     * If `true`, the first option is automatically highlighted.
     */
    autoHighlight: PropTypes.bool,
    /**
     * If `true`, the selected option becomes the value of the input
     * when the Autocomplete loses focus unless the user chooses
     * a different option or changes the character string in the input.
     */
    autoSelect: PropTypes.bool,
    /**
     * Control if the input should be blurred when an option is selected:
     *
     * - `false` the input is not blurred.
     * - `true` the input is always blurred.
     * - `touch` the input is blurred after a touch event.
     * - `mouse` the input is blurred after a mouse event.
     */
    blurOnSelect: PropTypes.oneOfType([PropTypes.oneOf(['mouse', 'touch']), PropTypes.bool]),
    /**
     * Props applied to the [`Chip`](/api/chip/) element.
     */
    ChipProps: PropTypes.object,
    /**
     * Override or extend the styles applied to the component.
     * See [CSS API](#css) below for more details.
     */
    classes: PropTypes.object,
    /**
     * @ignore
     */
    className: PropTypes.string,
    /**
     * If `true`, the input's text will be cleared on blur if no value is selected.
     *
     * Set to `true` if you want to help the user enter a new value.
     * Set to `false` if you want to help the user resume his search.
     */
    clearOnBlur: PropTypes.bool,
    /**
     * If `true`, clear all values when the user presses escape and the popup is closed.
     */
    clearOnEscape: PropTypes.bool,
    /**
     * Override the default text for the *clear* icon button.
     *
     * For localization purposes, you can use the provided [translations](/guides/localization/).
     */
    clearText: PropTypes.string,
    /**
     * The icon to display in place of the default close icon.
     */
    closeIcon: PropTypes.node,
    /**
     * Override the default text for the *close popup* icon button.
     *
     * For localization purposes, you can use the provided [translations](/guides/localization/).
     */
    closeText: PropTypes.string,
    /**
     * If `true`, the popup will ignore the blur event if the input is filled.
     * You can inspect the popup markup with your browser tools.
     * Consider this option when you need to customize the component.
     */
    debug: PropTypes.bool,
    /**
     * The default input value. Use when the component is not controlled.
     */
    defaultValue: PropTypes.any,
    /**
     * If `true`, the input can't be cleared.
     */
    disableClearable: PropTypes /* @typescript-to-proptypes-ignore */.bool,
    /**
     * If `true`, the popup won't close when a value is selected.
     */
    disableCloseOnSelect: PropTypes.bool,
    /**
     * If `true`, the input will be disabled.
     */
    disabled: PropTypes.bool,
    /**
     * If `true`, will allow focus on disabled items.
     */
    disabledItemsFocusable: PropTypes.bool,
    /**
     * If `true`, the list box in the popup will not wrap focus.
     */
    disableListWrap: PropTypes.bool,
    /**
     * Disable the portal behavior.
     * The children stay within it's parent DOM hierarchy.
     */
    disablePortal: PropTypes.bool,
    /**
     * A filter function that determines the options that are eligible.
     *
     * @param {T[]} options The options to render.
     * @param {object} state The state of the component.
     * @returns {T[]}
     */
    filterOptions: PropTypes.func,
    /**
     * If `true`, hide the selected options from the list box.
     */
    filterSelectedOptions: PropTypes.bool,
    /**
     * Force the visibility display of the popup icon.
     */
    forcePopupIcon: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.bool]),
    /**
     * If `true`, the Autocomplete is free solo, meaning that the user input is not bound to provided options.
     */
    freeSolo: PropTypes /* @typescript-to-proptypes-ignore */.bool,
    /**
     * If `true`, the input will take up the full width of its container.
     */
    fullWidth: PropTypes.bool,
    /**
     * The label to display when the tags are truncated (`limitTags`).
     *
     * @param {number} more The number of truncated tags.
     * @returns {ReactNode}
     */
    getLimitTagsText: PropTypes.func,
    /**
     * Used to determine the disabled state for a given option.
     *
     * @param {T} option The option to test.
     * @returns {boolean}
     */
    getOptionDisabled: PropTypes.func,
    /**
     * Used to determine the string value for a given option.
     * It's used to fill the input (and the list box options if `renderOption` is not provided).
     *
     * @param {T} option
     * @returns {string}
     */
    getOptionLabel: PropTypes.func,
    /**
     * Used to determine if an option is selected, considering the current value.
     * Uses strict equality by default.
     *
     * @param {T} option The option to test.
     * @param {T} value The value to test against.
     * @returns {boolean}
     */
    getOptionSelected: PropTypes.func,
    /**
     * If provided, the options will be grouped under the returned string.
     * The groupBy value is also used as the text for group headings when `renderGroup` is not provided.
     *
     * @param {T} options The options to group.
     * @returns {string}
     */
    groupBy: PropTypes.func,
    /**
     * If `true`, the component handles the "Home" and "End" keys when the popup is open.
     * It should move focus to the first option and last option, respectively.
     */
    handleHomeEndKeys: PropTypes.bool,
    /**
     * This prop is used to help implement the accessibility logic.
     * If you don't provide this prop. It falls back to a randomly generated id.
     */
    id: PropTypes.string,
    /**
     * If `true`, the highlight can move to the input.
     */
    includeInputInList: PropTypes.bool,
    /**
     * The input value.
     */
    inputValue: PropTypes.string,
    /**
     * The maximum number of tags that will be visible when not focused.
     * Set `-1` to disable the limit.
     */
    limitTags: PropTypes.number,
    /**
     * The component used to render the listbox.
     */
    ListboxComponent: PropTypes.elementType,
    /**
     * Props applied to the Listbox element.
     */
    ListboxProps: PropTypes.object,
    /**
     * If `true`, the component is in a loading state.
     */
    loading: PropTypes.bool,
    /**
     * Text to display when in a loading state.
     *
     * For localization purposes, you can use the provided [translations](/guides/localization/).
     */
    loadingText: PropTypes.node,
    /**
     * If `true`, `value` must be an array and the menu will support multiple selections.
     */
    multiple: PropTypes /* @typescript-to-proptypes-ignore */.bool,
    /**
     * Text to display when there are no options.
     *
     * For localization purposes, you can use the provided [translations](/guides/localization/).
     */
    noOptionsText: PropTypes.node,
    /**
     * Callback fired when the value changes.
     *
     * @param {object} event The event source of the callback.
     * @param {T|T[]} value The new value of the component.
     * @param {string} reason One of "create-option", "select-option", "remove-option", "blur" or "clear".
     */
    onChange: PropTypes.func,
    /**
     * Callback fired when the popup requests to be closed.
     * Use in controlled mode (see open).
     *
     * @param {object} event The event source of the callback.
     * @param {string} reason Can be: `"toggleInput"`, `"escape"`, `"select-option"`, `"blur"`.
     */
    onClose: PropTypes.func,
    /**
     * Callback fired when the highlight option changes.
     *
     * @param {object} event The event source of the callback.
     * @param {T} option The highlighted option.
     * @param {string} reason Can be: `"keyboard"`, `"auto"`, `"mouse"`.
     */
    onHighlightChange: PropTypes.func,
    /**
     * Callback fired when the input value changes.
     *
     * @param {object} event The event source of the callback.
     * @param {string} value The new value of the text input.
     * @param {string} reason Can be: `"input"` (user input), `"reset"` (programmatic change), `"clear"`.
     */
    onInputChange: PropTypes.func,
    /**
     * Callback fired when the popup requests to be opened.
     * Use in controlled mode (see open).
     *
     * @param {object} event The event source of the callback.
     */
    onOpen: PropTypes.func,
    /**
     * Control the popup` open state.
     */
    open: PropTypes.bool,
    /**
     * If `true`, the popup will open on input focus.
     */
    openOnFocus: PropTypes.bool,
    /**
     * Override the default text for the *open popup* icon button.
     *
     * For localization purposes, you can use the provided [translations](/guides/localization/).
     */
    openText: PropTypes.string,
    /**
     * Array of options.
     */
    options: PropTypes.array.isRequired,
    /**
     * The component used to render the body of the popup.
     */
    PaperComponent: PropTypes.elementType,
    /**
     * The component used to position the popup.
     */
    PopperComponent: PropTypes.elementType,
    /**
     * The icon to display in place of the default popup icon.
     */
    popupIcon: PropTypes.node,
    /**
     * Render the group.
     *
     * @param {any} option The group to render.
     * @returns {ReactNode}
     */
    renderGroup: PropTypes.func,
    /**
     * Render the input.
     *
     * @param {object} params
     * @returns {ReactNode}
     */
    renderInput: PropTypes.func.isRequired,
    /**
     * Render the option, use `getOptionLabel` by default.
     *
     * @param {T} option The option to render.
     * @param {object} state The state of the component.
     * @returns {ReactNode}
     */
    renderOption: PropTypes.func,
    /**
     * Render the selected value.
     *
     * @param {T[]} value The `value` provided to the component.
     * @param {function} getTagProps A tag props getter.
     * @returns {ReactNode}
     */
    renderTags: PropTypes.func,
    /**
     * If `true`, the input's text will be selected on focus.
     * It helps the user clear the selected value.
     */
    selectOnFocus: PropTypes.bool,
    /**
     * The size of the autocomplete.
     */
    size: PropTypes.oneOf(['medium', 'small']),
    /**
     * The value of the autocomplete.
     *
     * The value must have reference equality with the option in order to be selected.
     * You can customize the equality behavior with the `getOptionSelected` prop.
     */
    value: PropTypes.any,
};

export default Autocomplete;
