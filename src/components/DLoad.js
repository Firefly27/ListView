import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Input, Image } from 'semantic-ui-react'
export default function Posts() {
    const [APIData, setAPIData] = useState([])
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const myParent = {
        position: 'relative'
    }
    const myChild = {
        display: 'flex',
        width: '40px',
        height: '40px',
        background: 'black',
        color: 'white',
        borderRadius: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        position:'absolute',
        top:'-15px',
        right:'-10px',
        zIndex:'2'
    }
    useEffect(() => {
        axios.get(`https://reqres.in/api/users?page=2`)
            .then((response) => {
                console.log(response);
                setAPIData(response.data['data']);
            })
    }, [])

    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = APIData.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else{
            setFilteredResults(APIData)
        }
    }

    return (
        <div style={{ padding: 20 }}>
            <title>GREENDZINE TECHNOLOGIES</title>
            <Input icon='search'
                placeholder='Search...'
                onChange={(e) => searchItems(e.target.value)}
            />
            <Card.Group itemsPerRow={3} style={{ marginTop: 30 , marginBottom: 30}}>
                {searchInput.length > 1 ? (
                    filteredResults.map((item) => {
                        return (
                            <Card >
                                    <div style = {myParent}>
                                    <div style = {myChild}><span>{item.id}</span></div>
                                    </div>
                                <Card.Content>
                                    <Image
                                        size='small'
                                        src= {item.avatar}
                                        centered
                                    />
                                    </Card.Content>
                                    <Card.Content>
                                    <Card.Header>{item.first_name}</Card.Header>
                                </Card.Content>
                            </Card>
                        )
                    })
                ) : (
                    APIData.map((item) => {
                        return (
                                <Card >
                                    <div style = {myParent}>
                                    <div style = {myChild}><span>{item.id}</span></div>
                                    </div>
                                <Card.Content>
                                    <Image
                                        size='small'
                                        src= {item.avatar}
                                        centered
                                    />
                                    </Card.Content>
                                    <Card.Content>
                                    <Card.Header>{item.first_name}</Card.Header>
                                </Card.Content>
                                </Card>
                        )
                    })
                )}
            </Card.Group>
        </div>
    )
}