import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, Box, Stack, Pagination } from '@mui/material';
import { getActivities } from "../../redux/actions/actions/activities";
import styles from '../styles/DashBoard.module.css'
import CreateActivities from './CreateActivities';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';



const initialState = {
    name: '',
    order: '',
    orderBy: '',
    min: null,
    max: null,
    page: 1,
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 5,
};


export default function ActivitiesAdmin() {
    const dispatch = useDispatch();

    const [filter, setFilter] = useState(initialState);
    const [open, setOpen] = useState(false);
    const [filterSelect, setFilterSelect] = useState({
        type: 'text',
        name: 'name',
    })
    const [data, setData] = useState({})

    useEffect(() => {
        dispatch(getActivities(filter));
    }, [filter, dispatch])

    const allActivities = useSelector(state => state.allActivities);

    const handleOpen = (row) => {
        setOpen(true)
        row && setData(row)
    };
    const handleClose = () => setOpen(false);

    const handlePagination = (event, page) => {
        setFilter({ ...filter, page: page })
    }

    const handleChange = (event) => {
        if (event.target.name === "sorting") {
            let values = event.target.value.split('-')
            setFilter({ ...filter, order: values[1], orderBy: values[0] })
        } else {
            setFilter({ ...filter, [event.target.name]: event.target.value })
        }
    }

    const handleFilter = (event) => {
        const { value } = event.target

        if (['name'].includes(value)) {
            setFilterSelect({ type: 'text', name: value, })
        } else if (['min', 'max'].includes(value)) {
            setFilterSelect({ type: 'number', name: value, })
        }
    }

    const handleClear = () => {
        setFilter(initialState)
    }


    return (
        <div className={`w-75 mx-auto p-4 mt-4 mb-4 ${styles.tableContainer}`}>
            <div className="row p-3 rounded bg-light2 m-0">
                <div className="col-3 d-flex flex-column align-items-start">
                    <span className="fw-semibold">Sort by</span>
                    <select name="sorting" onChange={handleChange} className="form-select " aria-label="Default select example">
                        <option value="name-ASC">Alphabetical, A-Z </option>
                        <option value="name-DESC">Alphabetical, Z-A </option>
                        <option value="price-ASC">Cheap</option>
                        <option value="price-DESC">Expensive</option>
                    </select>
                </div>
                <div className="col-7 d-flex flex-column align-items-start">
                    <span className="fw-semibold">Filter by</span>
                    <div className="input-group">
                        <select onChange={handleFilter} className={`form-select ${styles.filterSelect}`}>
                            <option value="name">Name</option>
                            <option value="min">Minimum price</option>
                            <option value="max">Maximum price</option>
                        </select>
                        <input type={filterSelect.type} class={`form-control ${styles.filterInput}`} name={filterSelect.name}
                            onKeyDown={e => e.key === "Enter" && handleChange(e)} />
                        <button className="btn" onClick={handleClear}>
                            <DeleteOutlineIcon />
                        </button>
                    </div>
                </div>
                <div className="col-2 d-flex align-items-end justify-content-end">
                    <button onClick={handleOpen} className='btn btn-outline-primary ml-auto'>Add Data</button>
                </div>
            </div>
            <div className=" d-flex flex-wrap mt-2 pl-2 gap-2">
                {
                    Object.entries(filter).map((e) => {
                        if (!['page', 'order', 'orderBy'].includes(e[0]) && e[1]) {
                            return (<span style={{ width: '100px' }} className="badge bg-primary fw-light fs-6">{e[0]}: {e[1]}</span>)
                        }

                    })
                }
            </div>
            <div>
                <TableContainer className='mt-2' component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow className="bg-light1">
                                <TableCell className="fw-semibold">id</TableCell>
                                <TableCell className="fw-semibold">Name</TableCell>
                                <TableCell className="fw-semibold">Price</TableCell>
                                <TableCell className="fw-semibold">Schedule</TableCell>
                                <TableCell className="fw-semibold">Available</TableCell>
                                <TableCell className="fw-semibold">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {allActivities?.rows?.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell size="small">{row.id}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell >{row.price}</TableCell>
                                    <TableCell >{row.schedule}</TableCell>
                                    <TableCell >{row.available ? "yes" : "no"}</TableCell>
                                    <TableCell ><button onClick={() => handleOpen(row)} className='btn btn-primary'>Edit</button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <Stack className='mt-3 w-100' spacing={2}>
                <Pagination onChange={handlePagination} page={Number(allActivities.page)} className='mx-auto' count={allActivities.totalPages} shape="rounded" />
            </Stack>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <CreateActivities handleClose={handleClose} data={data} />
                </Box>

            </Modal>
        </div >
    )
}