import '@toast-ui/chart/dist/toastui-chart.min.css';
import { ColumnChart } from '@toast-ui/chart';
import '@toast-ui/chart/dist/toastui-chart.css';
import { useEffect } from 'react';

function RetailSales() {
	const data = {
		categories: ['FY20', 'FY21', 'FY22'],
		series: [
			{
				name: 'IKEA sales',
				data: [39.6, 41.9, 44.6],
			},
		],
	};

	const options = {
		chart: {
			width: 800,
			height: 450,

			animation: {
				duration: 300,
			},
			title: {
				text: 'IKEA Retail Sales',

				fontFamily: 'pretendard',
				fontSize: 35,
				fontWeight: 600,
				color: '#cacaca',
			},
		},
		series: {
			bar: {
				widthRatio: 0.2,
			},
			stack: {
				type: 'normal',
			},
			dataLabels: {
				visible: true,

				stackTotal: {
					visible: true,
					formatter: function (value) {
						return 'EUR ' + value + ' billion';
					},
				},
			},
		},
		xAxis: {
			title: 'Year',
		},
		yAxis: {
			title: 'billion',
		},
		legend: {
			visible: false,
		},
		theme: {
			series: {
				colors: ['#263238'],
			},
			chart: {
				fontFamily: 'pretendard',
				backgroundColor: 'rgba(0,0,0,0)',
			},
			xAxis: {
				title: {
					fontFamily: 'pretendard',
					fontSize: 16,
					fontWeight: 400,
					color: '#000',
				},
				label: {
					fontFamily: 'pretendard',
					fontSize: 16,
					fontWeight: 400,
					color: '#fff',
				},
				width: 1,
				color: '#fff',
			},
			yAxis: {
				title: {
					fontFamily: 'pretendard',
					fontSize: 16,
					fontWeight: 400,
					color: '#000',
				},
				label: {
					fontFamily: 'pretendard',
					fontSize: 16,
					fontWeight: 400,
					color: 'grey',
				},
				width: 1,
				color: '#fff',
			},

			exportMenu: {
				button: {
					backgroundColor: '#263238',
					xIcon: {
						color: '#ffffff',
					},
					dotIcon: {
						color: '#ffffff',
					},
				},
				panel: {
					header: {
						fontSize: 16,
						fontFamily: 'pretendard',
						color: '#fff',
						backgroundColor: '#263238',
					},
					body: {
						fontSize: 16,
						fontFamily: 'pretendard',
						color: '#fff',
						backgroundColor: '#263238',
					},
				},
			},
		},
	};

	useEffect(() => {
		const chartInstance = new ColumnChart({
			el: document.getElementById('chart'),
			data,
			options,
		});

		return () => {
			chartInstance.destroy();
		};
	}, []);

	return (
		<>
			<div className='retailSalesSection'>
				<div className='sectionNum'>1</div>
				<div className='borderLine' />
				<div className='retailChartTitWrap'>
					<h3>
						IKEA retail sales reached
						<br /> EUR 44.6 billion
					</h3>
					<p>
						IKEA retail sales benefited as the world re-opened after closures related to the pandemic. On the other hand, inflation and supply chain issues impacted FY22 sales and led to rising costs
						and higher prices. That means sales have grown in money, but sales quantities have not kept up.
					</p>
				</div>

				<div className='retailChartWrap'>
					<div id='chart' />
					<p className='chartDesc'>
						The total FY22 IKEA retail sales reached EUR 44.6 billion compared <br /> to EUR 41.9 billion in FY21. The IKEA financial year runs from <br /> 1 September to 31 August.
					</p>
				</div>
			</div>
		</>
	);
}

export default RetailSales;
