import { Button, Grid, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import { DatePicker,LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { LocalStorage } from '../../hooks/useLocalStorage';
import { ArrowBack, Delete } from '@mui/icons-material';
import { requests } from '../../services/api';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditForm({ isLight }: { isLight: boolean}) {
    const { id } = useParams();
    const jokes = LocalStorage(`jokesObject-${id}`);
    const [formData, setFormData] = useState(jokes)
    const [date, setDate] = React.useState<Dayjs | null>(dayjs(formData.createdat));
    const navigate = useNavigate()
    const handleChange = (e: any) => {
        setFormData((prevState: any) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    console.log("response--------------", jokes)
    const handleEditForm = async () => {
        let data={...formData, createdat: date}
        try {
            const response = await requests.put(`/jokes/${id}`,
                data
            )
            navigate("/jokes-table")
            toast.success("Joke edited successfully")
           

        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    const handleDeleteJoke = async () => {
        try {
            const response = await requests.delete(`/jokes/${id}`,
                formData
            )
            navigate("/")
        } catch (error) {
        }
    }
    const handleBack = () => {
        navigate("/")
    }


    return (
        <div className={`  ${isLight ? "bg-gray" : "bg-darkmode"} w-full h-screen mx-auto items-center flex justify-center p-4`}>
            <div className="flex justify-center items-center  w-full ">
                <div className={`shadow  ${isLight ? " bg-white" : "bg-lightblue"} w-full md:w-1/2   py-4   px-4 rounded-sm `}>
                    <div className="flex justify-between my-2">
                        <div className="">
                            <h1 className="text-midblue text-3xl font-bold">Update a Joke</h1>
                        </div>
                       
                        <Button
                            onClick={handleBack}
                            sx={{ textTransform: 'none' }}
                            variant="contained"
                            startIcon={<ArrowBack />}>
                            Back to Jokes
                        </Button>
                    </div>
                    <hr />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {/* <Button
                        onClick={handleBack}
                        sx={{ textTransform: 'none' }}
                        variant="contained"
                        startIcon={<ArrowBack />}>
                        Back to Jokes
                    </Button> */}
                </Grid>
                <Grid item xs={6}>
                    <Typography sx={{ mb: .5 }}>Title</Typography>
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        fullWidth
                        name='title'
                        onChange={handleChange}
                        value={formData?.title}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Typography sx={{ mb: .5 }}>Author</Typography>
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        fullWidth
                        name='author'
                        onChange={handleChange}
                        value={formData?.author}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Typography sx={{ mb: .5 }}>Date</Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker', 'DatePicker']}>

                                    <DatePicker
                                        sx={{ width: '100%' }}

                                        value={date}
                                        onChange={(newValue) => setDate(newValue)}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>

                </Grid>
                <Grid item xs={6}>
                    <Typography sx={{ mb: .5 }}>Views</Typography>
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        fullWidth
                        value={formData?.views}
                        name='views'
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Stack spacing={2} direction="row" sx={{ display: 'flex', justifyContent: "flex-end", }}>
                        <Button
                            onClick={handleEditForm}
                            sx={{ textTransform: 'none' }}
                            variant="contained">
                            Submit
                        </Button>
                        <Button
                            onClick={handleDeleteJoke}
                            sx={{ textTransform: 'none',backgroundColor: 'red !important',color: '#fff'}}
                            variant="outlined"
                            startIcon={<Delete  sx={{ color:"white"}}/>}>
                            Delete Jokes
                        </Button>
                    </Stack>

                </Grid>
            </Grid>
</div>
</div>
        </div>
    )
}

export default EditForm
