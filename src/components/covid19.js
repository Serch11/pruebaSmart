import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import axios from 'axios';
import CardColumns from "react-bootstrap/CardColumns";

import GoogleMapReact from 'google-map-react';




function HomeCovid() {

    const [latest, setLatest] = useState([]);
    const [results, setResults] = useState([]);


    useEffect(() => {
        axios
            .all([
                axios.get('https://disease.sh/v3/covid-19/all'),
                axios.get('https://corona.lmao.ninja/v2/countries')
            ])
            .then(responseArr => {
                setLatest(responseArr[0].data);
                setResults(responseArr[1].data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);
    const date = new Date(parseInt(latest.updated));
    const lastUpdate = date.toString();




    const countriesLocations = results.map((data, i) => {
        return (
            <div
                lat={data.countryInfo.lat}
                lng={data.countryInfo.long}
                style={{
                    color:"red",
                    backgroundColor:"#FFF",
                    height:"25px",
                    width:"35px",
                    textAlign:"center",
                    borderRadius:"30px",
                    
                }}
                >
                <img height="10px" src={data.countryInfo.flag}/>
                <br/>
                {data.cases}
            </div>
        );
    });



    return (
        <div>
            <CardDeck>
                <Card bg="secondary" text={"white"} className="text-center" style={{ margin: '10px' }}>

                    <Card.Body>
                        <Card.Title>Casos</Card.Title>
                        <Card.Text>{latest.active}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small text="white">Last updated {lastUpdate}</small>
                    </Card.Footer>
                </Card>
                <Card bg="danger" text={"white"} className="text-center" style={{ margin: '10px' }}>

                    <Card.Body>
                        <Card.Title>Muertos</Card.Title>
                        <Card.Text>
                            {latest.deaths}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small text="white">Last updated  {lastUpdate}</small>
                    </Card.Footer>
                </Card>
                <Card bg="success" text={"white"} className="text-center" style={{ margin: '10px' }}>
                    <Card.Body>
                        <Card.Title>Recuperados</Card.Title>
                        <Card.Text>{latest.recovered}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small text="white">Last updated  {lastUpdate}</small>
                    </Card.Footer>
                </Card>
            </CardDeck>
            <br />

            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyAbatDd69Mms_f72t_ZMOsq0dJC0r-pTNw' }}
                    defaultCenter={{
                        lat: 4,
                        lng: -72
                    }}
                    defaultZoom={3}
                >  
                  
                    {countriesLocations}
                </GoogleMapReact>
            </div>


        </div>
    )
}


export default HomeCovid;