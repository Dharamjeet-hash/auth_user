import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Paper, Typography, Table, TableHead, TableBody, TableRow, TableCell, TableSortLabel, TableContainer, Box } from '@mui/material';
import { fetchNearestUsers } from '../../utils/apiReq/users'

function NearestUsers(){
    const [nearestUsers, setNearestusers] = useState([])
    const apiUrl = process.env.REACT_APP_API_URL
    useEffect(()=>{
        fetchNearestUsers().then((res)=>{
            if(res?.status == 200){
                setNearestusers(res?.data?.users)
            }
        }).catch(()=>{

        })
    },[])
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                <TableRow>
                <TableCell colSpan={4}>
                    <Typography variant="h5" gutterBottom>
                        Nearest Users
                    </Typography>
                </TableCell>
                </TableRow>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Mobile</TableCell>
                        <TableCell>Profile Pic</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {nearestUsers?.map((item,index)=>{
                        return (
                            <TableRow key={index}>
                                <TableCell>{item?.name}</TableCell>
                                <TableCell>{item?.email}</TableCell>
                                <TableCell>{item?.mobile}</TableCell>
                                <TableCell>
                                    <Box component="img" 
                                    sx={{
                                        height: 50,
                                        width: 50,
                                        maxHeight: { xs: 233, md: 167 },
                                        maxWidth: { xs: 350, md: 250 },
                                    }}
                                    src={apiUrl+'/'+item?.profilePic}/>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                    {/* Add more rows as needed */}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default NearestUsers;