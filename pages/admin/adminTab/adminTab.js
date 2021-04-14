import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
//import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

export function Alert(props) {
  return <MuiAlert elevation={2} variant="filled" {...props} />;
}

const AdminTab = () => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const [saveLogo, onSaveLogo] = useState();
  const [newUser, setNewUser] = useState(
    {
      brend: "",
      description: "",
      price: ""
    }
  );
  const [openForm, setOpenForm] = React.useState(false);
  const [editUser, setEditUser] = React.useState({});
  const [openFormAdd, setOpenFormAdd] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState({ severity: "", text: "" });

  const columns = [
    { id: 'brend', label: 'Бренд', minWidth: 70 },
    { id: 'product', label: 'Товар', minWidth: 150 },
    { id: 'price', label: 'Цена, руб.', minWidth: 50 },
    { id: 'description', label: 'Описание', minWidth: 350 },
    { id: 'logo', label: 'Картинка', minWidth: 170 },
    { id: 'edit', label: '', minWidth: 50 },
    { id: 'delete', label: '', minWidth: 50 }
  ];

  const API = "/api"

  useEffect(() => {
    fetch(`${API}`)
      .then(result => result.json())
      .then(rowData => {
        setRows(rowData)
      })
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("logo", saveLogo)
    formData.append('brend', newUser.brend);
    formData.append('description', newUser.description);
    formData.append('product', newUser.product);
    formData.append('price', newUser.price);

    await axios.post(`${API}/add`, formData)
      .then(res => {
        if (res.data !== "error") {
          let productData = []
          productData.push(res.data)
          setRows([...rows, ...productData])
          productData = []
          setOpenFormAdd(!openFormAdd)
          setOpenSnackbar(!openSnackbar);
          setSnackbar({ severity: "success", text: "Добавлено" })
          onSaveLogo(null)
          setNewUser({ brend: "", description: "", price: "" })
        } else {
          setSnackbar({ severity: "error", text: `Ошибка: выберите Файл` })
          setOpenSnackbar(!openSnackbar)
        }
      })
      .catch(err => {
        setSnackbar({ severity: "error", text: "Ошибка: введите Цену" })
        setOpenSnackbar(!openSnackbar)
        console.log(err);
      });
  }

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  }

  const handleUpdate = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  }

  const handleImage = (e) => {
    onSaveLogo(e.target.files[0])
  }

  const handleOpen = (column = {}) => {
    setOpenForm(!openForm)
    setEditUser(column)
  }

  const updateUser = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("logo", saveLogo)
    formData.append('brend', editUser.brend);
    formData.append('description', editUser.description);
    formData.append('product', editUser.product);
    formData.append('price', editUser.price);
    formData.append('id', editUser._id);

    await axios.put(`${API}/update`, formData)
      .then(res => {
        if (res.data !== "error") {
          const newRows = rows.map(row => {
            if (editUser._id == row._id) {
              return { ...editUser, ...res.data }
            } else return row
          })
          setRows(newRows)
          setOpenForm(!openForm)
          setOpenSnackbar(!openSnackbar)
          setSnackbar({ severity: "success", text: "Изменено" })
        } else {
          setSnackbar({ severity: "error", text: "Ошибка" })
          setOpenSnackbar(!openSnackbar)
        }
      })
      .catch(err => {
        setSnackbar({ severity: "error", text: "Ошибка" })
        setOpenSnackbar(!openSnackbar)
        console.log(err);
      });
  }

  const hendleAddBrend = () => {
    setOpenFormAdd(!openFormAdd)
  }

  const deleteBrend = async (e, id) => {
    e.preventDefault()
    await axios.get(`${API}/delete/${id}`)
      .then(res => {
        if (res.data !== "error") {
          setRows(res.data)
          setOpenSnackbar(!openSnackbar);
          setSnackbar({ severity: "success", text: "Удалено" })
        } else {
          setSnackbar({ severity: "error", text: "Ошибка" })
          setOpenSnackbar(!openSnackbar)
        }
      })
      .catch(err => {
        setSnackbar({ severity: "error", text: "Ошибка" })
        setOpenSnackbar(!openSnackbar)
        console.log(err);
      });
  }

  const closeSnacbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const getSnackbar = (severity, text) => {
    return (
      <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={closeSnacbar}>
        <Alert className={classes.alert} onClose={closeSnacbar} severity={severity}>
          {text}
        </Alert>
      </Snackbar>
    )
  }


  const setEditForm = () => {
    return (
      <Dialog className="dial" open={openForm} onClose={handleOpen} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Изменить</DialogTitle>
        <DialogContent>
          <form style={{ marginBottom: 20 }}>
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              name="logo"
              onChange={handleImage}
              style={{ marginBottom: 20 }}
            />
            {columns.map(column => {
              if (column.id == "price") {
                return (
                  <TextField
                    id="outlined-number"
                    label={column.label}
                    name={column.id}
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    style={{ marginBottom: 20 }}
                    variant="outlined"
                    value={editUser[column.id]}
                    onChange={handleUpdate}
                  />
                )
              }
              if (column.id != 'edit' && column.id != 'logo' && column.id != 'delete') {
                return (
                  <TextField
                    id="outlined-multiline-static"
                    label={column.label}
                    name={column.id}
                    multiline
                    fullWidth
                    variant="outlined"
                    value={editUser[column.id]}
                    onChange={handleUpdate}
                    style={{ marginBottom: 20 }}
                  />
                )
              }
            })}
            <Button className={classes.btn} variant="contained" color="primary" onClick={(e) => updateUser(e)}>Сохранить</Button>
            <Button className="forma_button" variant="contained" color="primary" style={{ marginLeft: 10 }} onClick={() => setOpenForm(!openForm)}>Отменить</Button>
          </form>
        </DialogContent>
      </Dialog>
    )
  }

  const setAddForm = () => {
    return (
      <Dialog className="dial" open={openFormAdd} onClose={hendleAddBrend} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Добавить товар</DialogTitle>
        <DialogContent>
          <form name="Add brend" style={{ marginBottom: 20 }} onSubmit={handleSubmit}>
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              name="logo"
              onChange={handleImage}
              style={{ marginBottom: 20 }}
            />
            {columns.map(column => {
              if (column.id == "price") {
                return (
                  <TextField
                    id="outlined-number"
                    label={column.label}
                    name={column.id}
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    style={{ marginBottom: 20 }}
                    variant="outlined"
                    value={editUser[column.id]}
                    onChange={handleChange}
                  />
                )
              }
              if (column.id != 'edit' && column.id != 'logo' && column.id != 'delete') {
                return (
                  <TextField
                    id="outlined-multiline-static"
                    label={column.label}
                    name={column.id}
                    multiline
                    fullWidth
                    variant="outlined"
                    value={editUser[column.id]}
                    onChange={handleChange}
                    style={{ marginBottom: 20 }}
                  />
                )
              }
            })}
            <Button
              variant="contained"
              color="primary"
              type="submit">Добавить</Button>
          </form>
        </DialogContent>
      </Dialog>
    )
  }
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardBody>
            <h4 style={{ fontWeight: 400, fontSize: 20 }}>Таблица Товаров</h4>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell className={classes.cell} key={column.id} align={column.align}>
                            {column.id == "edit" ? <Button onClick={() => handleOpen(row)} variant="outlined" color="primary">Изменить</Button> :
                              column.id == "delete" ? <Button onClick={(e) => deleteBrend(e, row._id)} variant="outlined" color="secondary">Удалить</Button> :
                                <div style={{ width: `${column.minWidth}px`, whiteSpace: "pre-wrap", }}>{value}</div>}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
            <Button variant="outlined" color="primary" onClick={hendleAddBrend}>Добавить товар</Button>
            {openFormAdd ? setAddForm() : null}
            {openForm ? setEditForm() : null}
            {getSnackbar(snackbar.severity, snackbar.text)}
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardBody>
            <h4 style={{ fontWeight: 400, fontSize: 20 }}>Таблица Категорий</h4>
            <AdminBrend classes={classes} />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

AdminTab.layout = Admin;

export default AdminTab;

export function AdminBrend({ classes }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const [saveLogo, onSaveLogo] = useState();
  const [newUser, setNewUser] = useState(
    {
      brend: "",
      description: ""
    }
  );

  const [openForm, setOpenForm] = React.useState(false);
  const [openFormAdd, setOpenFormAdd] = React.useState(false);
  const [editUser, setEditUser] = React.useState({});
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState({ severity: "", text: "" });

  const columns = [
    { id: 'brend', label: 'Бренд', minWidth: 100 },
    { id: 'description', label: 'Описание', minWidth: 450 },
    { id: 'logo', label: 'Картинка', minWidth: 100 },
    { id: 'edit', label: '', minWidth: 100 },
    { id: 'delete', label: '', minWidth: 100 },
  ];

  const API = "/api"

  useEffect(() => {
    fetch(`${API}/adminBrend`)
      .then(result => result.json())
      .then(rowData => {
        setRows(rowData[0])
      })
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("logo", saveLogo)
    formData.append('brend', newUser.brend);
    formData.append('description', newUser.description);

    await axios.post(`${API}/add-brend`, formData)
      .then(res => {
        if (res.data !== "error") {
          let productData = []
          productData.push(res.data)
          setRows([...rows, ...productData])
          productData = []
          setOpenFormAdd(!openFormAdd)
          setOpenSnackbar(!openSnackbar);
          setSnackbar({ severity: "success", text: "Добавлено" })
          onSaveLogo(null)
          setNewUser({ brend: "", description: "", price: "" })
        } else {
          setSnackbar({ severity: "error", text: "Ошибка: выберите Файл" })
          setOpenSnackbar(!openSnackbar)
        }
      })
      .catch(err => {
        setSnackbar({ severity: "error", text: "Ошибка" })
        setOpenSnackbar(!openSnackbar)
        console.log(err);
      });
  }

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  }

  const handleUpdate = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  }

  const handleImage = (e) => {
    onSaveLogo(e.target.files[0])
  }

  const handleOpen = (column = {}) => {
    setOpenForm(!openForm)
    setEditUser(column)
  }

  const updateUser = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("logo", saveLogo)
    formData.append('brend', editUser.brend);
    formData.append('description', editUser.description);
    formData.append('id', editUser._id);

    await axios.put(`${API}/update-brend`, formData)
      .then(res => {
        if (res.data !== "error") {
          const newRows = rows.map(row => {
            if (editUser._id == row._id) {
              return { ...editUser, ...res.data }
            } else return row
          })
          setRows(newRows)
          setOpenForm(!openForm)
          setOpenSnackbar(!openSnackbar)
          setSnackbar({ severity: "success", text: "Изменено" })
        } else {
          setSnackbar({ severity: "error", text: "Ошибка: выберите Файл" })
          setOpenSnackbar(!openSnackbar)
        }
      })
      .catch(err => {
        setSnackbar({ severity: "error", text: "Ошибка" })
        setOpenSnackbar(!openSnackbar)
        console.log(err);
      });
  }

  const hendleAddBrend = () => {
    setOpenFormAdd(!openFormAdd)
  }

  const setEditForm = () => {
    return (
      <Dialog className="dial" open={openForm} onClose={() => setOpenForm(!openForm)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Изменить</DialogTitle>
        <DialogContent>
          <form style={{ marginBottom: 20 }}>
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              name="logo"
              onChange={handleImage}
              style={{ marginBottom: 20 }}
            />
            {columns.map(column => {
              if (column.id != 'edit' && column.id != 'logo' && column.id != 'delete') {
                if (column.id == "price") {
                  return (
                    <TextField
                      id="outlined-number"
                      label={column.label}
                      name={column.id}
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      value={editUser[column.id]}
                      onChange={handleUpdate}
                      style={{ marginBottom: 20 }}
                      variant="outlined"
                    />
                  )
                }
                return (
                  <TextField
                    key={column.id}
                    id="outlined-multiline-static"
                    label={column.label}
                    name={column.id}
                    multiline
                    fullWidth
                    variant="outlined"
                    value={editUser[column.id]}
                    onChange={handleUpdate}
                    style={{ marginBottom: 20 }}
                  />
                )
              }
            })}
            <Button className="forma_button" variant="contained" color="primary" onClick={(e) => updateUser(e)}>Сохранить</Button>
            <Button className="forma_button" variant="contained" color="primary" style={{ marginLeft: 10 }} onClick={() => setOpenForm(!openForm)}>Отменить</Button>
          </form>
        </DialogContent>
      </Dialog>
    )
  }

  const setAddForm = () => {
    return (
      <Dialog className="dial" open={openFormAdd} onClose={hendleAddBrend} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Добавить категорию</DialogTitle>
        <DialogContent>
          <form name="Add brend" style={{ marginBottom: 20 }} onSubmit={handleSubmit}>
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              name="logo"
              onChange={handleImage}
              style={{ marginBottom: 20 }}
            />
            {columns.map(column => {
              if (column.id != 'edit' && column.id != 'logo' && column.id != 'delete') {
                if (column.id == "price") {
                  return (
                    <TextField
                      id="outlined-number"
                      label={column.label}
                      name={column.id}
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      style={{ marginBottom: 20 }}
                      variant="outlined"
                      value={newUser[column.id]}
                      onChange={handleChange}
                    />
                  )
                }
                return (
                  <TextField
                    key={column.id}
                    id="outlined-multiline-static"
                    label={column.label}
                    name={column.id}
                    multiline
                    fullWidth
                    variant="outlined"
                    value={newUser[column.id]}
                    onChange={handleChange}
                    style={{ marginBottom: 20 }}
                  />
                )
              }
            })}
            <Button
              variant="contained"
              color="primary"
              type="submit">Добавить</Button>
          </form>
        </DialogContent>
      </Dialog>
    )
  }

  const closeSnacbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const deleteBrend = async (id) => {

    await axios.get(`${API}/delete-brend/${id}`)
      .then(res => {
        if (res.data !== "error") {
          setRows(res.data)
          setOpenSnackbar(!openSnackbar);
          setSnackbar({ severity: "success", text: "Удалено" })
        } else {
          setSnackbar({ severity: "error", text: "Ошибка" })
          setOpenSnackbar(!openSnackbar)
        }
      })
      .catch(err => {
        setSnackbar({ severity: "error", text: "Ошибка" })
        setOpenSnackbar(!openSnackbar)
        console.log(err);
      });
  }

  const getSnackbar = (severity, text) => {
    return (
      <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={closeSnacbar}>
        <Alert className={classes.alert} onClose={closeSnacbar} severity={severity}>
          {text}
        </Alert>
      </Snackbar>
    )
  }

  return (
    <>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
            return (
              <TableRow key={row._id} hover role="checkbox" tabIndex={-1}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell style={{}} key={`${column.id}${row._id}`} align={column.align}>
                      {column.id == "edit" ? <Button onClick={() => handleOpen(row)} variant="outlined" color="primary">Изменить</Button> :
                        column.id == "delete" ? <Button onClick={() => deleteBrend(row._id)} variant="outlined" color="secondary">Удалить</Button> : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <Button variant="outlined" color="primary" onClick={hendleAddBrend}>Добавить категорию</Button>
      {openFormAdd ? setAddForm() : null}
      {openForm ? setEditForm() : null}
      {getSnackbar(snackbar.severity, snackbar.text)}
    </>
  );
}