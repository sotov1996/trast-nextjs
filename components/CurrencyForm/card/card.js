import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 185,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard({ handleClickOpen, currency }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Валюта
        </Typography>
        <Typography variant="h5" component="h2">RUB: {currency.RUB}</Typography>
        <Typography variant="h5" component="h2">BLR: {currency.BLR}</Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Изменить Валюту
        </Button>
      </CardActions>
    </Card>
  );
}