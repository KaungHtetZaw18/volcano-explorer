import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './css/VolcanoList.css';

function VolcanoList() {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [populationWithin, setPopulationWithin] = useState('');
    const [rowData, setRowData] = useState([]);
    const navigate = useNavigate();

    const API_URL = process.env.REACT_APP_API_URL;

    const columnDefs = [
        { headerName: "Name", field: "name", sortable: true, filter: true, cellRenderer: 'agGroupCellRenderer' },
        { headerName: "Region", field: "region", sortable: true, filter: true },
        { headerName: "Subregion", field: "subregion", sortable: true, filter: true }
    ];

    useEffect(() => {
        fetch(`${API_URL}/countries`)
            .then(response => response.json())
            .then(data => setCountries(data))
            .catch(error => console.error('Error fetching countries', error));
    }, [API_URL]);

    const fetchVolcanoes = () => {
        let url = `${API_URL}/volcanoes`;
        const queryParams = [];
        if (selectedCountry) {
            queryParams.push(`country=${encodeURIComponent(selectedCountry)}`);
        }
        if (populationWithin) {
            queryParams.push(`populatedWithin=${encodeURIComponent(populationWithin)}`);
        }
        if (queryParams.length) {
            url += `?${queryParams.join('&')}`;
        }
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (Array.isArray(data)) {
                    setRowData(data);
                } else {
                    console.error('Data fetched is not an array:', data);
                    setRowData([]);
                }
            })
            .catch(error => {
                console.error('Error fetching volcanoes:', error);
                setRowData([]);
            });
    };

    const onGridReady = params => {
        params.api.sizeColumnsToFit();
        window.addEventListener('resize', () => params.api.sizeColumnsToFit());
    };

    const onRowClicked = event => {
        navigate(`/volcano/${event.data.id}`);
    };

    return (
        <div className='container'>
            <div className="volcano-list-container">
                <div className="volcano-controls">
                    <div>
                        <label>Country:</label>
                        <select value={selectedCountry} onChange={e => setSelectedCountry(e.target.value)}>
                            <option value="">Select a Country</option>
                            {countries.map((country) => (
                                <option key={country} value={country}>{country}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Populated within:</label>
                        <select value={populationWithin} onChange={e => setPopulationWithin(e.target.value)}>
                            <option value="">All</option>
                            {['5km', '10km', '30km', '100km'].map((distance) => (
                                <option key={distance} value={distance}>{distance}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <button onClick={fetchVolcanoes}>Search</button>
                    </div>
                </div>
                <AgGridReact
                    className="ag-theme-alpine"
                    columnDefs={columnDefs}
                    rowData={rowData}
                    domLayout='autoHeight'
                    animateRows={true}
                    pagination={true}
                    paginationPageSize={10}
                    onGridReady={onGridReady}
                    onRowClicked={onRowClicked}
                />
            </div>
        </div>
    );
}

export default VolcanoList;
