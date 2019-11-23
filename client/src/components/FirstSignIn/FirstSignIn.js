import React from 'react';
import {Button, CssBaseline, TextField, Container, Grid, Typography} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import DateFnsUtils from '@date-io/date-fns';

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers'

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function FirstSignIn({onSubmit, onSkip}) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        dateOfBirth: new Date(2000, 1,1),
        address: '',
        grade: 1,
        class: '',
        introduction: '',
        workExperience: '',
        funFacts: ''
    });

    const handleChange = (e) => {
        setState({...state, [e.target.name]: e.target.value})
    };

    const handleDateChange = date => {
        setState({...state, dateOfBirth: date})
    }

    const handleSubmit = () => {
        onSubmit(state.dateOfBirth, state.address, state.introduction, state.grade, state.class, state.workExperience, state.funFacts);
    };

    return (
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Typography variant='h6' component='h1'>
                    Almost done! you can fill in additional fields to specify you more.
                    You don't have to fill everything.
                </Typography>
                <div className={classes.paper}>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        margin='normal'
                                        fullWidth
                                        id='dateOfBirth'
                                        name='dateOfBirth'
                                        label='Date of birth'
                                        format='mm/dd/yyyy'
                                        value={state.dateOfBirth}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date'
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="address"
                                    label="Address"
                                    name="address"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="grade"
                                    label="Grade"
                                    name="grade"
                                    type='number'
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="class"
                                    label="Class"
                                    name="class"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    multiline
                                    variant='outlined'
                                    id="introduction"
                                    label="Introduce yourself briefly"
                                    name="introduction"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    multiline
                                    variant='outlined'
                                    id="workExperience"
                                    label="Your work experience"
                                    name="workExperience"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    multiline
                                    variant='outlined'
                                    id="funFacts"
                                    label="Fun facts about yourself"
                                    name="funFacts"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={handleSubmit}
                                >
                                    I'm done!
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    fullWidth
                                    variant='contained'
                                    color='primary'
                                    className={classes.submit}
                                    onClick={onSkip}
                                >
                                    I'll do it later
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
    );
}
//TODO: bio가 뭔지 알아내야해...!
export default FirstSignIn;