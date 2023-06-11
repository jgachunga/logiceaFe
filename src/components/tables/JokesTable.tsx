import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { requests } from '../../services/api';
import { useEffect, useState } from 'react';
import {  Grid, TablePagination, TextField } from '@mui/material';
import transformKeysToLowercase from '../../hooks/TransformToLower';
import { dateForHumans } from '../../hooks/useTransformDate';
import { useNavigate } from 'react-router-dom';
import { LocalStorage } from '../../hooks/useLocalStorage';



export default function JokesTable({ isLight }: { isLight: boolean }) {
    const [jokesData, setJokesData] = useState<any[]>();
    const [count, setCount] = useState<number>(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const navigate = useNavigate()

    const StyledTableCell = styled(TableCell)(() => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: isLight ? "#f7f7f7" : "#4942E4",
            color: !isLight ? "#f7f7f7" : "#4942E4",
            borderBottom: 'none',
            fontWeight: 'bold'
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,

        },
    }));


    const handleChangePage = (event: any, newPage: number) => {
        event.preventDefault();
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const [searchTerm, setSearchTerm] = useState<any>('');
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const fetchJokes = async () => {
        try {
            const response = await requests.get('/jokes')
            let transformedarr = transformKeysToLowercase(response)
            setJokesData(transformedarr)
            setCount(response.length)
        } catch (error) {
        }
    }


    const filteredData = jokesData?.filter((item) => {
        let newDate = dateForHumans(item?.createdat)
        return newDate?.toString().toLowerCase().includes(searchTerm) || item?.views?.toString().includes(searchTerm.toString())
    });


    const handleForm = (row: any) => {
        navigate(`/edit-form/${row.id}`)
        LocalStorage(
            `jokesObject-${row.id}`, JSON.stringify(row), "save"
        )
    }


    useEffect(() => {
        fetchJokes()
    }, [])

    return (
        <div className={`  ${isLight ? "bg-gray" : "bg-darkmode"} w-full h-screen mx-auto p-4`}>
            <TableContainer component={Paper} elevation={0}>
                <Grid container spacing={2} sx={{ m: 2 }}>
                    <Grid item xs={2}>
                        <TextField
                            label="Search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </Grid >
                </Grid >
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow >
                            <StyledTableCell>Title</StyledTableCell>
                            <StyledTableCell align="center">Author</StyledTableCell>
                            <StyledTableCell align="center">Created Date</StyledTableCell>
                            <StyledTableCell align="center">Views</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {typeof (filteredData) !== undefined &&
                            filteredData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {

                                    return (
                                        <TableRow key={row.id}
                                            className='basic'
                                        >

                                            <TableCell component="th" scope="row"
                                                className='table-title'
                                                sx={{ borderLeft: 'none !important' }}
                                                onClick={() => handleForm(row)}
                                            >

                                                {row.title ? row.title : 'No Title'}
                                            </TableCell>
                                            <TableCell align="center">{row.author ? row.author : 'No Author'}</TableCell>
                                            <TableCell align="center">{row.createdat ? dateForHumans(row.createdat) : "No Date"}</TableCell>
                                            <TableCell style={{
                                                color:

                                                    parseInt(row.views) <= 25 ? 'tomato' :
                                                        parseInt(row.views) <= 50 ? 'orange' :
                                                            parseInt(row.views) <= 75 ? 'yellow' :
                                                                parseInt(row.views) <= 100 ? 'green' : ''

                                            }}

                                                align="center">{row.views ? row.views : "No Views"}</TableCell>
                                        </TableRow>
                                    )
                                })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                sx={{ color: isLight ? "#4942E4" : "#f7f7f7" }}
                rowsPerPageOptions={[5, 10]}
                component="div"
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
}