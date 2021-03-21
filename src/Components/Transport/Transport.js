import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { linkStyle } from '../Header/Header';


const Transport = (props) => {
    const { type, image, key } = props.transport;
    return (
        <Card className="my-3 p-3 rounded my-sm-3 w-sm-50" variant="dark">
            <Link style={linkStyle} to={"/destination/" + key}>
                <Card.Img src={image} variant="top" className="img-thumbnail" />
            </Link>
            <Card.Body>
                <Link style={linkStyle} to={"/destination/" + key}>
                    <Card.Title as='h3' className="text-center py-3">
                        <strong>{type.toUpperCase()}</strong>
                    </Card.Title>
                </Link>
            </Card.Body>

        </Card>
    );
};

export default Transport;