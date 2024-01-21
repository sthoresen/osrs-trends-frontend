import React from 'react';
import { Line } from 'react-chartjs-2';

export default function Chart(props) {
    /*
    props.chosenChart: Dict-like object with one entry from ChartsData, with id, name, data, labels etc.
    */

    let chosenChart = props.chosenChart;

    let labels, options, data;

    options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Trend Chart',
            },
        },
    };

    let dateOptions = { day: 'numeric', month: 'numeric', year: '2-digit' };
    labels = chosenChart['labels'].map((d) => new Date(d * 1000).toLocaleDateString('en-US', dateOptions));

    let crossings = Array(labels.length).fill(null);
    let bottoms = Array(labels.length).fill(null);
    let tops = Array(labels.length).fill(null);

    let d1 = chosenChart['data'];

    chosenChart['crossings'].forEach((e) => {
        crossings[e[0]] = e[1];
    });

    chosenChart['extremes'].forEach((e) => {
        if (e[2]) {
            tops[e[0]] = e[1];
        } else {
            bottoms[e[0]] = e[1];
        }
    });


    let legend_data1 = chosenChart['name'];
    let d2 = Array(labels.length).fill(chosenChart['median']);

    data = {
        labels,
        datasets: [

            {
                label: 'crosses',
                data: crossings,
                borderColor: 'rgb(32, 89, 228)',
                backgroundColor: 'rgba(32, 89, 228, 0.85)',
                showLine: false,
                pointRadius: 7,
            },
            {
                label: 'tops',
                data: tops,
                borderColor: 'rgb(55, 228, 32)',
                backgroundColor: 'rgba(55, 228, 32, 0.85)',
                showLine: false,
                pointRadius: 7,
            },
            {
                label: 'bottoms',
                data: bottoms,
                borderColor: 'rgb(228, 32, 32)',
                backgroundColor: 'rgba(228, 32, 32, 0.85)',
                showLine: false,
                pointRadius: 7,
            },
            {
                label: legend_data1,
                data: d1,
                borderColor: 'rgb(0, 0, 0)',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                pointRadius: 2,
                borderWidth: 1,
            },
            {
                label: 'Mean',
                data: d2,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                borderWidth: 1,
                pointRadius: 0,
            },
        ],
    };

    return (
        <div>
            <Line options={options} data={data} />
        </div>
    );
};