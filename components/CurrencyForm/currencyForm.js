import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import SimpleCard from './card/card.js'

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [currency, setCurrency] = React.useState({});
  const [defaultCurrency, setDefaultCurrency] = React.useState({});

  useEffect(() => {
    getCurrency()
  }, [])

  const getCurrency = async () => {
    const response = await axios.get(`/api/getCurrency`)
    if(response.data.length){
        setCurrency(response.data[0])
        setDefaultCurrency(response.data[0])
        return
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrency(defaultCurrency)
  };

  const handleUpdate = (e) => {
    setCurrency({ ...currency, [e.target.name]: e.target.value });
  }

  const handleSave = async (e) => {
    await axios.post(`/api/currency`, { currency })
    setDefaultCurrency(currency)
    setOpen(false);
  };

  return (
    <div>
        <SimpleCard handleClickOpen={handleClickOpen} currency={defaultCurrency} />
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Валюта</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="RUB"
            label="RUB"
            type="number"
            onChange={handleUpdate}
            value={ currency ? currency.RUB : null }
            fullWidth
          />
          <TextField
            margin="dense"
            name="BLR"
            label="BLR"
            type="number"
            onChange={handleUpdate}
            value={ currency ? currency.BLR : null }
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Отмена
          </Button>
          <Button onClick={handleSave} color="primary">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}