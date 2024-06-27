import './css/VolcanoDetail.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Map, Marker } from 'pigeon-maps';
import { useAuth } from './AuthContext';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const VolcanoDetail = () => {
    const { volcanoId } = useParams();
    const { isAuthenticated, token } = useAuth();
    const [volcano, setVolcano] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);
        setError('');
        const fetchData = async () => {
            try {
                const requestOptions = isAuthenticated && token ? {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                } : {};
                const response = await fetch(`http://4.237.58.241:3000/volcano/${volcanoId}`, requestOptions);
                if (!response.ok) {
                    const errData = await response.json();
                    throw new Error(errData.message || "An error occurred while fetching the data.");
                }
                const data = await response.json();
                setVolcano(data);
            } catch (error) {
                console.error('Fetching error:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [volcanoId, token, isAuthenticated]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    if (!volcano) {
        return <div className="volcano-details-container">No volcano data available.</div>;
    }
    const chartData = {
        labels: ['5km', '10km', '30km', '100km'],
        datasets: [{
            label: 'Population',
            data: [volcano.population_5km, volcano.population_10km, volcano.population_30km, volcano.population_100km],
            backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(75, 192, 192, 0.5)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
            borderWidth: 1
        }]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: { display: true, text: 'Population Density at Different Distances', font: { size: 20 } }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: { display: true, text: 'Population' },
                ticks: { callback: value => value.toLocaleString() }
            },
            x: { title: { display: true, text: 'Distance from Volcano (km)' } }
        }
    };

    return (
        <div className="volcano-details-container">
            <div className="info-and-map">
                <div className="volcano-text-details">
                    <h1>{volcano.name}</h1>
                    <p>Country: {volcano.country}</p>
                    <p>Region: {volcano.region}</p>
                    <p>Subregion: {volcano.subregion}</p>
                    <p>Last Eruption: {volcano.last_eruption}</p>
                    <p>Summit: {volcano.summit} m</p>
                    <p>Elevation: {volcano.elevation} ft</p>
                </div>
                <div className="volcano-map">
                <Map
    center={[parseFloat(volcano.latitude), parseFloat(volcano.longitude)]}
    zoom={3}
    style={{ width: '100%', height: '100%' }} // Ensure the map uses full container dimensions
>
    <Marker width={50} anchor={[parseFloat(volcano.latitude), parseFloat(volcano.longitude)]} />
</Map>
                </div>
            </div>
            {isAuthenticated && (
                <div className="population-chart">
                    <Bar data={chartData} options={chartOptions} />
                </div>
            )}
        </div>
    );
};

export default VolcanoDetail;
