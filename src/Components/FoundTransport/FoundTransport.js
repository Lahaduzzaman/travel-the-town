import React from 'react';
import './FoundTransport.css'
import peopleIcon from '../../images/peopleicon.png';
import { fareChart } from '../../fakeData/fareChart';


const FoundTransport = (props) => {
    const { key = "bk1", destination } = props.transportAndDestination
    console.log('destination', key, destination)
    const foundTransport = fareChart.filter(transport => transport.key === key)
    return (
        <div className="found">
            <div className="route">
                <ul>
                    <li>{destination.pick}</li>
                    <li>{destination.drop}</li>
                </ul>
            </div>
            {
                foundTransport.map(transport => (
                    <div className="rides">
                        <div className="ride">
                            <img src={transport.image} alt="" className="ride-image" />
                            <p className="ride-type">{transport.type}</p>
                            <p className="passenger"><img src={peopleIcon} alt="" />{transport.passenger}</p>
                            <p className="fare">${transport.fare}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default FoundTransport;