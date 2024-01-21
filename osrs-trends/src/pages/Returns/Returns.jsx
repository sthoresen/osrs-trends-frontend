import { useState } from 'react'
import '@pages/Returns/Returns.css'

import roiData1 from '@data/scoring1.json' assert { type: 'json' }
import roiData20 from '@data/scoring20.json' assert { type: 'json' }
import roiData100 from '@data/scoring100.json' assert { type: 'json' }
import roiData500 from '@data/scoring500.json' assert { type: 'json' }
import roiData10000 from '@data/scoring10000.json' assert { type: 'json' }

import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme

import { gpFormat, volumeFormat } from '@src/utils'


function Returns() {
    const [optionBankroll, setBankroll] = useState('500m')
    const [optionPeriod, setPeriod] = useState('Months')

    const roiData1Ar = Object.keys(roiData1).map(function (k) {
        return roiData1[k];
    });
    const roiData20Ar = Object.keys(roiData20).map(function (k) {
        return roiData20[k];
    });
    const roiData100Ar = Object.keys(roiData100).map(function (k) {
        return roiData100[k];
    });
    const roiData500Ar = Object.keys(roiData500).map(function (k) {
        return roiData500[k];
    });
    const roiData10000Ar = Object.keys(roiData10000).map(function (k) {
        return roiData10000[k];
    });

    const [colDefs, setColDefs] = useState([
        {
            field: 'score',
            // simple number comparator
            comparator: (valueA, valueB, nodeA, nodeB, isDescending) => valueA - valueB
        },
        {
            field: 'name',
            // simple string comparator
            comparator: (valueA, valueB, nodeA, nodeB, isDescending) => {
                if (valueA == valueB) return 0;
                return (valueA > valueB) ? 1 : -1;
            }
        },
        {
            field: 'return',
            sort: 'desc',
            comparator: (valueA, valueB, nodeA, nodeB, isDescending) => {
                if (valueA == valueB) return 0;
                if (valueA == 'None') return -1;
                if (valueB == 'None') return 1;

                let a = Number(valueA.slice(0, -1));
                let b = Number(valueB.slice(0, -1));
                return (a > b) ? 1 : -1;
            }
        },
        {
            field: 'price',
            // simple number comparator
            comparator: (valueA, valueB, nodeA, nodeB, isDescending) => valueA - valueB,
            valueFormatter: gpFormat
        },
        {
            field: 'median',
            comparator: (valueA, valueB, nodeA, nodeB, isDescending) => valueA - valueB,
            valueFormatter: gpFormat
        },
        {
            field: 'vol_stable',
            comparator: (valueA, valueB, nodeA, nodeB, isDescending) => valueA - valueB,
            valueFormatter: volumeFormat
        },
        {
            field: 'limit',
            comparator: (valueA, valueB, nodeA, nodeB, isDescending) => valueA - valueB
        }
    ]);

    const [rowData, setRowData] = useState(roiData1Ar);

    const onGridReady = (params) => {
        params.api.sizeColumnsToFit();
    };

    return (
        <>
            <div className="config-container3">
                <h1 className="config-title3">Config</h1>
                <div className="optionsBar3">
                    <div className="horizontal-option3">
                        <p className="option-label3">Bankroll</p>
                        <div className="dropdown3">
                            <button className="dropbtn3">{optionBankroll}</button>
                            <div className="dropdown-content3">
                                <a onClick=
                                    {() => {
                                        setBankroll('1m');
                                        setRowData(roiData1Ar);
                                    }} href="#">1m</a>
                                <a onClick=
                                    {() => {
                                        setBankroll('20m');
                                        setRowData(roiData20Ar);
                                    }} href="#">20m</a>
                                <a onClick=
                                    {() => {
                                        setBankroll('100m');
                                        setRowData(roiData100Ar);
                                    }} href="#">100m</a>
                                <a onClick=
                                    {() => {
                                        setBankroll('500m');
                                        setRowData(roiData500Ar);
                                    }} href="#">500m</a>
                                <a onClick=
                                    {() => {
                                        setBankroll('10b');
                                        setRowData(roiData10000Ar);
                                    }} href="#">10b</a>
                            </div>
                        </div>
                    </div>

                    <div className="horizontal-option3">
                        <p className="option-label3">Holding period</p>
                        <div className="dropdown3">
                            <button className="dropbtn3">{optionPeriod}</button>
                            <div className="dropdown-content3">
                                <a onClick={() => setPeriod('Days')} href="#">Days</a>
                                <a onClick={() => setPeriod('Weeks')} href="#">Weeks</a>
                                <a onClick={() => setPeriod('Months')} href="#">Months</a>
                                <a onClick={() => setPeriod('Years')} href="#">Years</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="ag-theme-quartz AG">
                {/* The AG Grid component */}
                <AgGridReact className="grid"
                    rowData={rowData}
                    columnDefs={colDefs}
                    pagination={true}
                    onGridReady={onGridReady}
                />
            </div>

        </>
    )
}

export default Returns
