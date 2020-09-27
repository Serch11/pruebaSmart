import React, { Component, useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';
import CardColumns from "react-bootstrap/CardColumns";
import Columns from 'react-columns'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';



function CovidColombia() {

    const [latest, setLatest] = useState([]);
    const [results, setResults] = useState([]);
    const [searchCountries, setSearchCountries] = useState("Colombia");

    useEffect(() => {
        axios
            .all([
                axios.get('https://disease.sh/v3/covid-19/jhucsse'),
                axios.get('https://disease.sh/v3/covid-19/jhucsse')
            ])
            .then(responseArr => {
                setLatest(responseArr[0].data);
                setResults(responseArr[1].data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);
    const filterCountry = results.filter(item => {
        return searchCountries !== '' ? item.country === (searchCountries) : item.country.toLowerCase().includes(searchCountries);
    })
    const countries = filterCountry.map((data, i) => {
        return (
            <Card
                key={i}
                bg={"light"}
                text={"dark"}
                className="text-center"
                style={{ margin: "10px" }}
            >

                <Card.Body>
                    <Card.Title>{data.country}</Card.Title>
                    <Card.Text><h2><b>{data.province}</b></h2></Card.Text>
                    <Card.Text><b>Casos:</b>{data.stats.confirmed}</Card.Text>
                    <Card.Text><b>Deaths:</b>{data.stats.deaths}</Card.Text>
                    <Card.Text><b>Recovered:</b>{data.stats.recovered}</Card.Text>
                    <Card.Text>{data.cases}</Card.Text>
                </Card.Body>
            </Card>
        );
    });
    var queries = [
        {
            columns: 2,
            query: "min-width: 500px",
        },
        {
            columns: 3,
            query: "min-width: 1000px",
        },
    ];
    const date = new Date(parseInt(latest.updated));
    const lastUpdate = date.toString();

    const countriesLocations = results.map((data, i) => {
        return (


            <div
                lat={data.coordinates.latitude}
                lng={data.coordinates.longitude}
                style={{
                    color: "red",
                    backgroundColor: "#FFF",
                    height: "25px",
                    width: "35px",
                    textAlign: "center",
                    borderRadius: "30px",
                    border: "1px solid red",

                }}
            >


                {data.province}
                <br />
                {data.stats.confirmed}

            </div>
        );
    });



    return (
        <div>
            <CardDeck>
                <Card bg="secondary" text={"white"} className="text-center" style={{ margin: '10px' }}>

                    <Card.Body>
                        <div style={{ height: '30vh', width: '100%' }}>
                            <GoogleMapReact
                                bootstrapURLKeys={{ key: 'AIzaSyAbatDd69Mms_f72t_ZMOsq0dJC0r-pTNw' }}
                                defaultCenter={{
                                    lat: 4,
                                    lng: -72
                                }}
                                defaultZoom={7}
                            >

                                {countriesLocations}
                            </GoogleMapReact>
                        </div>
                    </Card.Body>
                    <Card.Footer>
                        <small text="white">Last updated {lastUpdate}</small>
                    </Card.Footer>
                </Card>

            </CardDeck>
            <Form>
                <Form.Group controlId="formGroupSearch">
                    <Form.Label><h1 ></h1></Form.Label>

                </Form.Group>
            </Form>
            <Columns queries={queries}>{countries}</Columns>

        </div>
    )
}

export default CovidColombia;