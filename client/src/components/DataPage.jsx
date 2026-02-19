import { useState } from 'react';

const DataPage = ({ data }) => {
    const [filters, setFilters] = useState({ text: '', yearMin: '', yearMax: '' });

    const filteredData = data.filter(item => {
        const matchesText = (item.city?.toLowerCase() || "").includes(filters.text.toLowerCase()) || 
                           (item.country_txt?.toLowerCase() || "").includes(filters.text.toLowerCase());
        
        const year = parseInt(item.iyear);
        const matchesMin = !filters.yearMin || year >= parseInt(filters.yearMin);
        const matchesMax = !filters.yearMax || year <= parseInt(filters.yearMax);
        
        return matchesText && matchesMin && matchesMax;
    });

    return (
        <div className="page-container">
            <h2>Terror Dataset Explorer</h2>
            
            <div className="filters-container">
                <input 
                    type="text" 
                    placeholder="Search City/Country..." 
                    onChange={e => setFilters({...filters, text: e.target.value})} 
                />
                <input 
                    type="number" 
                    placeholder="Year >" 
                    onChange={e => setFilters({...filters, yearMin: e.target.value})} 
                />
                <input 
                    type="number" 
                    placeholder="Year <" 
                    onChange={e => setFilters({...filters, yearMax: e.target.value})} 
                />
            </div>

            <div className="table-container">
                <table className="terror-table">
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Country</th>
                            <th>City</th>
                            <th>Attack Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.iyear}</td>
                                    <td>{item.country_txt}</td>
                                    <td>{item.city || "Unknown"}</td>
                                    <td>{item.attacktype1_txt}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>
                                    {data.length === 0 ? "Loading data from server..." : "No matches found."}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DataPage;