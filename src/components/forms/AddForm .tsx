import { Button, Grid, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalStorage } from '../../hooks/useLocalStorage';
import { ArrowBack } from '@mui/icons-material';
import { requests } from '../../services/api';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddForm({ isLight }: { isLight: boolean }) {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        views: '',
    })
    const navigate = useNavigate()
    const [date, setDate] = React.useState<Dayjs | null>(dayjs(new Date()));

    const handleChange = (e: any) => {
        setFormData((prevState: any) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleAddForm = async () => {
        const data = { ...formData, createdat: date }
        try {
            if (!formData?.title || !formData?.author || !formData?.views || !date) {
                toast.warning("Fill all details")
            } else {
                const response = await requests.post(`/jokes`,data)
                navigate("/jokes-table")
                toast.success("Joke added successfully")
            }

        } catch (error) {
            console.log("error", error)
            toast.error("Something went wrong")
        }
    }
    const handleBack = () => {
        navigate(-1)
    }


    return (
        <div className={`  ${isLight ? "bg-gray" : "bg-darkmode"} w-full h-screen mx-auto items-center flex justify-center p-4`}>
            <div className="flex justify-center items-center  w-full ">
                <div className={`shadow  ${isLight ? " bg-white" : "bg-lightblue"} w-full md:w-1/2   py-4  grid place-items-center px-4 rounded-sm `}>
                    <div className="flex justify-center my-2">
                        <h1 className="text-midblue text-3xl font-bold">Add a Joke</h1>
                    </div>

                    <Grid container spacing={2}>
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
                                    onClick={handleAddForm}
                                    sx={{ textTransform: 'none' }}
                                    variant="contained">
                                    Submit
                                </Button>
                                <Button
                                    onClick={handleBack}
                                    sx={{ textTransform: 'none' }}
                                    variant="contained"
                                    startIcon={<ArrowBack />}>
                                    Back to Jokes
                                </Button>
                            </Stack>

                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    )
}

export default AddForm 
