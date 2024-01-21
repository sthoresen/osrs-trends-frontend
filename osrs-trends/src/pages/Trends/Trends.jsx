import React from "react";
import { useState } from 'react'

import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import chartsData from '@data/ChartDataOut.json' assert { type: 'json' }

import { gpFormat, volumeFormat, percentFormat, nameRemoveId, limitFormat } from '@src/utils'
import Chart from '@components/Chart/Chart';

const Trends = () => {

    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

    const chartsDataAr = Object.keys(chartsData).map(function (k) {
        return chartsData[k];
    });


    let tableData = [];
    for (let i = 0; i < chartsDataAr.length; i++) {
        let s = chartsDataAr[i];
        let d = {};
        d['name'] = s['name'] + '@' + i;
        d['price to mean'] = s['mean_dif'];
        d['mean crosses'] = s['n_cross'];
        d['price to peak'] = s['peak_dif'];
        d['price'] = s['price'];
        d['mean'] = s['median'];
        d['vol'] = s['vol'];
        d['limit'] = s['lim'];
        d['id'] = s['id'];
        tableData.push(d);
    }

    let table_status = tableData.length > 0 ? tableData[0]['id'] : -1;

    const [chartId, setChartId] = useState(table_status);
    const [rowData, setRowData] = useState(tableData);
    const [colDefs, setColDefs] = useState([
        {
            field: 'name',
            // simple string comparator
            comparator: (valueA, valueB, nodeA, nodeB, isDescending) => {
                if (valueA == valueB) return 0;
                return (valueA > valueB) ? 1 : -1;
            },
            valueFormatter: nameRemoveId
        },
        {
            field: 'price to mean',
            // simple number comparator
            comparator: (valueA, valueB, nodeA, nodeB, isDescending) => valueA - valueB,
            valueFormatter: percentFormat
        },
        {
            field: 'mean crosses',
            // simple number comparator
            comparator: (valueA, valueB, nodeA, nodeB, isDescending) => valueA - valueB,
            sort: 'desc',
        },
        {
            field: 'price to peak',
            // simple number comparator
            comparator: (valueA, valueB, nodeA, nodeB, isDescending) => valueA - valueB,
            valueFormatter: percentFormat
        },
        {
            field: 'price',
            // simple number comparator
            comparator: (valueA, valueB, nodeA, nodeB, isDescending) => valueA - valueB,
            valueFormatter: gpFormat
        },
        {
            field: 'mean',
            comparator: (valueA, valueB, nodeA, nodeB, isDescending) => valueA - valueB,
            valueFormatter: gpFormat
        },
        {
            field: 'vol',
            comparator: (valueA, valueB, nodeA, nodeB, isDescending) => valueA - valueB,
            valueFormatter: volumeFormat
        },
        {
            field: 'limit',
            comparator: (valueA, valueB, nodeA, nodeB, isDescending) => {

                if (valueA instanceof String && valueB instanceof String) return 0;
                if (valueA instanceof String) return -1/valueB;
                if (valueB instanceof String) return valueA;
                return valueA - valueB;
            },
            valueFormatter: limitFormat
        }
    ]);


    function onRowClick(event) {
        const [name, id] = event.data['name'].split('@');
        setChartId(id);
        event.node.setSelected(true);
    }

    var disableChart = (-1 == chartId);
    
    const [gridApi, setGridApi] = useState(null);
    const onGridReady = (params) => {
        setGridApi(params.api);
        params.api.sizeColumnsToFit();
    };

    const getRowId = (event) => {
        return event.data['id'];
    };

    const onFirstDataRendered = (params) => {
        //Show the chart for the top row after default sort
        const [, id] = params.api.getModel().getRow(0).data['name'].split('@');
        setChartId(id);
        params.api.getModel().getRow(0).setSelected(true);
    };

    const getRowStyle = (params) => {
        let selected_id = chartId;
        let [, node_id] = params.data['name'].split('@'); 
        return {
            background: node_id === selected_id ? '#8faadc' : 'white', // Change the color to a darker shade when selected
            color: node_id === selected_id ? 'white' : 'black', // Adjust text color for better contrast
        };
    };

    return (

        <div>
            <div className="ag-theme-quartz AG">
                {/* The AG Grid component */}
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    rowSelection='single'
                    onCellClicked={onRowClick}
                    onGridReady={onGridReady}
                    getRowId={getRowId}
                    onFirstDataRendered={onFirstDataRendered}
                    getRowStyle={getRowStyle}
                    pagination={true}
                />
            </div>
            {!disableChart &&
                <Chart chosenChart={chartsDataAr[chartId]} />
            }

        </div>
    );
}
export default Trends;