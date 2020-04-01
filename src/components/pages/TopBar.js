import React, {useEffect, useState} from 'react';

import {Dropdown} from 'primereact/dropdown';
import PropTypes from 'prop-types';
import {toogleClick} from "../../util/MenuEventSubject";
import {isDesktop} from "../../util/util";
import {Dialog} from "primereact/dialog";
import {Calendar} from "primereact/calendar";
import CloseIcon from '@material-ui/icons/Close';
import moment from "moment";
import MetricFilterComponent from "./data/MetricFilterComponent";
import Chip from "@material-ui/core/Chip";
import {filterFields} from "../../util/mock/BreakdownFilterAPI";
import * as _ from 'lodash';
import {makeStyles} from '@material-ui/core/styles';
import MUIButton from '@material-ui/core/Button';
import FilterListIcon from '@material-ui/icons/FilterList';
import {withRouter} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
}));

function TopBar({timeFilterConfiguration, metricFilterConfiguration, ...props}) {

    const filterComponent = (props.filterToolShow) ?
        /*<FilterComponent timeFilterConfiguration={timeFilterConfiguration} metricFilterConfiguration={metricFilterConfiguration}/>*/
        <></>
        : (<div/>);
    console.log('TopBar init');
    const firstTitle = props.firstTitle ? <h5 style={{fontWeight: 'normal'}}>{props.firstTitle}</h5> : <></>;
    const secondTitle = props.secondTitle ? <h5 style={{fontWeight: 'normal'}}>{props.secondTitle}</h5> : <></>;

    const rightTitle1 = props.rightTitleTop ? <h5 style={{fontWeight: 'normal'}}>{props.rightTitleTop}</h5> : <></>;
    const rightTitle2 = props.rightTitleMiddle ?
        <h1 style={{fontWeight: 'normal'}}>{props.rightTitleMiddle}</h1> : <></>;
    const rightTitle3 = props.rightTitleBottom ?
        <h5 style={{fontWeight: 'normal'}}>{props.rightTitleBottom}</h5> : <></>;

    const rightComponentIsActive = props.rightComponent ? true : false;
    const menuToggleButton = !isDesktop() &&
        <button className="p-link layout-menu-button p-button" style={{marginTop: 16, marginLeft: 1}}
                onClick={toogleClick}>
            <span className="pi pi-bars"/>
        </button>;


    return (
        <div className="topbarContainer">
            {menuToggleButton}

            <div className="topbarContentContainer">
                <div className="header">
                    <div style={{float: 'left', width: '100%'}}>
                        {firstTitle}
                        <h1>{props.title}</h1>
                        {secondTitle}
                    </div>
                    <div style={{float: 'right', textAlign: 'right', width: '100%'}}>
                        {
                            rightComponentIsActive ? props.rightComponent : <div>
                                {rightTitle1}
                                {rightTitle2}
                                {rightTitle3}
                            </div>
                        }
                    </div>

                </div>
                {filterComponent}
            </div>
        </div>
    );
}

/*function FilterComponent({timeFilterConfiguration, metricFilterConfiguration, ...props}) {
    console.log('FilterComponent init');
    const classes = useStyles();

    const [dialogConf, setDialogConf] = useState({
        open: false
    });


    const onHide = () => {
        setDialogConf({
            ...dialogConf,
            open: false
        })
    };
    const openDialog = () => {
        setDialogConf({
            ...dialogConf,
            open: true
        })
    };

    useEffect(() => {
        onHide()
    }, [metricFilterConfiguration.selectedFilters]);

    const filterDialog = <Dialog header="Choose a Filter" style={{width: '50vw'}} visible={dialogConf.open}
                                 onHide={onHide} multiFieldSelectable={true}>
        <MetricFilterComponent metric={"all"} onFilterUpdate={metricFilterConfiguration.onFilterUpdate}
                               selectedFilters={metricFilterConfiguration.selectedFilters}/>

    </Dialog>;

    const fieldChip = (x, index) => <div style={{marginLeft: 10}} key={"chip-" + index}>
        <span style={{display: 'block'}}>{_.find(filterFields, q => q.field === x.field).title}</span>
        <Chip label={`${x.value}`} style={{minWidth: 150, marginTop: 5, justifyContent: 'space-between'}}
              onDelete={() => {
                  metricFilterConfiguration.onFilterUpdate(metricFilterConfiguration.selectedFilters.filter(f => f !== x))
              }} color="secondary" variant="outlined"
        />
    </div>;
    return (<div className="filterbarComponent">

        <div className="filterbar"><h3>Filters</h3>
            <MUIButton
                variant="outlined"
                disabled={metricFilterConfiguration.selectedFilters.length >= 2}
                className={classes.button}
                startIcon={<FilterListIcon/>}
                onClick={openDialog}>
                Add a Filter
            </MUIButton>


        </div>
        <div className="filterContent" style={{paddingTop: 40, display: 'flex'}}>
            {metricFilterConfiguration.selectedFilters.map((x, i) => fieldChip(x, i))}
        </div>
        <div className="timeFilterBar">
            <TimeFilterComponent timeFilterConfiguration={timeFilterConfiguration}/>
        </div>

        {
            filterDialog
        }
    </div>)
}*/


/*const TimeFilterComponent = ({timeFilterConfiguration}) => {
    const defaultState = () => ({
        startDate: timeFilterConfiguration.startDate,
        endDate: timeFilterConfiguration.endDate,
        customRangeMode: timeFilterConfiguration.customRangeMode,
        calendarValue: timeFilterConfiguration.customRangeMode ? [moment(timeFilterConfiguration.startDate)._d, moment(timeFilterConfiguration.endDate)._d] : [moment()._d, moment()._d]
    });

    const [state, setState] = useState(defaultState());
    let timeFilterRanges = [
        {label: 'Last 6 Hours', value: '6:hours'},
        {label: 'Last 24 Hours', value: '24:hours'},
        {label: 'Last 3 Days', value: '3:days'},
        {label: 'Last 7 Days', value: '7:days'},
        {label: 'Last 30 Days', value: '30:days'},
        {label: 'Custom Range', value: 'custom'}
    ];

    useEffect(() => {
        setState({
            ...state,
            ...defaultState()
        })
    }, [timeFilterConfiguration.startDate, timeFilterConfiguration.endDate, timeFilterConfiguration.customRangeMode]);


    const handleDropdownChange = (value) => {
        if (value === "custom") {
            setState({
                ...state,
                startDate: moment().add(-3, "days").unix() * 1000,
                endDate: moment().unix() * 1000,
                customRangeMode: true
            });
            setTimeout(() => {
                const elem = document.getElementById('calendarComponent');
                if (elem) elem.focus()
            }, 50)

        } else {
            timeFilterConfiguration.onChange(value);
            setState({
                ...state,
                startDate: value,
                endDate: undefined,
                customRangeMode: false
            });

        }

    };


    const onBlur = () => {
        console.log('onBlur called', state);
        /!*const startDate = state.customRangeMode ? state.startDate[0] : state.startDate;
        const endDate = state.customRangeMode ? state.startDate[1] : undefined;
        timeFilterConfiguration.onChange(startDate, endDate)*!/
        /!*if(state.endDate){
            timeFilterConfiguration.onChange(state.startDate, state.endDate, true)
        }*!/
    };

    const minDate = moment().add(-90, 'days')._d;
    const maxDate = moment()._d;
    console.log('TimeFilter render', state.startDate, state.endDate, state.calendarValue);
    return (
        <div>
            <h3>Timeframe</h3>
            {
                state.customRangeMode ?
                    <div className="p-grid">
                        <div className="p-col-10">
                            <Calendar value={state.calendarValue} dateFormat="M dd"
                                      onChange={(e) => {
                                          console.log('date changed', e.value);
                                          setState({
                                              ...state,
                                              calendarValue: e.value
                                          });
                                          if (e.value[0] && e.value[1]) {
                                              const values = e.value.map(x => moment(x).unix() * 1000);
                                              setState({
                                                  ...state,
                                                  startDate: values[0],
                                                  endDate: values[1]
                                              });
                                              timeFilterConfiguration.onChange(values[0], values[1], true)

                                          }


                                      }}
                                      selectionMode="range" readonlyInput={true} inputId={"calendarComponent"}
                                      placeholder="Start Date - End Date" onBlur={onBlur} minDate={minDate}
                                      maxDate={maxDate}/>
                        </div>
                        <div className="p-col-2">
                            <CloseIcon style={{cursor: 'pointer', fontSize: 35}} onClick={() => {
                                timeFilterConfiguration.onChange('24h', undefined, false)
                                setState({
                                    ...state,
                                    startDate: '24h',
                                    customRangeMode: false
                                })
                            }}/>
                        </div>


                    </div>
                    : <Dropdown options={timeFilterRanges} value={state.startDate}
                                onChange={event => handleDropdownChange(event.value)}
                                autoWidth={false}/>
            }

        </div>
    )
};*/


TopBar.propTypes = {
    title: PropTypes.string.isRequired,
    firstTitle: PropTypes.string,
    secondTitle: PropTypes.string,
    filterToolShow: PropTypes.bool,
    rightTitleTop: PropTypes.string,
    rightTitleMiddle: PropTypes.string,
    rightTitleBottom: PropTypes.string,

};
TopBar.defaultProps = {
    firstTitle: undefined,
    secondTitle: undefined,
    rightTitleTop: undefined,
    rightTitleMiddle: undefined,
    rightTitleBottom: undefined,
    filterToolShow: true,
};


export default withRouter(TopBar);