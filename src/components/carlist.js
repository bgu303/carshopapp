import React, { useState, useEffect } from "react";
import { API_URL } from "../constants"
import { AgGridReact } from 'ag-grid-react';
import AddCar from "./addcar"
import EditCar from "./editcar"

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from '@mui/material/Button';

function CarList() {

    const [cars, setCars] = useState([]);
    const [columnDefs] = useState([
        {field: "brand", sortable: true, filter: true},
        {field: "model", sortable: true, filter: true},
        {field: "color", sortable: true, filter: true},
        {field: "fuel", sortable: true, filter: true, width: 120},
        {field: "year", sortable: true, filter: true, width: 120},
        {field: "price", sortable: true, filter: true, width: 120},
        {
            width: 120,
            cellRenderer: params => <EditCar data={params.data} updateCar={updateCar}/>
        },
        {
            cellRenderer: params => <Button color="error" size="small" onClick={() => deleteCar(params.data)}>Delete</Button>
        }
    ])

    const deleteCar = (data) => {
        if (window.confirm("Are u sure?")) {
            fetch(data._links.car.href, {method: "DELETE"})
            .then(response => {
                if (response.ok) {
                    getCars()
                }
            })
        }
    
    }

    const addCar = (car) => {
        fetch(API_URL + '/cars', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(car)
        })
        .then(response => {
            if(response.ok)
                getCars();
            else
                alert("Something went wrong");
        })
        .catch(err => console(err))
    }

    const updateCar = (car, url) => {
        fetch(url, {
            method: "PUT",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(car)
        })
        .then(response => {
            if (response.ok)
                getCars();
            else
                alert("Something went wrong")
        })
        .catch(err => console.log(err))
    }

    const getCars = () => {
        fetch(API_URL + "/cars")
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                alert("Something went wrong fetching the data.")
            }
        })
        .then(responseData => setCars(responseData._embedded.cars))
        .catch(err => console.log(err))
    }
    
    useEffect(() => {
        getCars()
    }, [])

    return(
        <>
            <AddCar addCar={addCar}/>
            <div className="ag-theme-material" style={{height: 500, width: "80%", margin: "auto"}}>
                <AgGridReact
                    rowData={cars}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={10}>
                </AgGridReact>
            </div>
        </>
    )
}


export default CarList;