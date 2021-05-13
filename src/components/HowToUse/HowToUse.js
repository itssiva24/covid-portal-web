import {
    List,
    ListItem,
    ListItemText,
    makeStyles,
    Typography,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { withAuthorization } from "../../contexts";

const condition = (authUser) => !!authUser;

const useStyles = makeStyles((theme) => ({
    link: {
        color: theme.palette.primary.main,
        textDecoration: "none",
    },
}));

export default withAuthorization(
    condition,
    ROUTES.SIGNIN
)(() => {
    const classes = useStyles();

    return (
        <>
            <Typography
                variant="h5"
                style={{
                    textAlign: "center",
                    margin: 20,
                }}
            >
                How To Use
            </Typography>

            <List component="ul">
                <ListItem component="li">
                    <ListItemText>
                        <Typography component="span">
                            1. All Requests will be visible on the{" "}
                        </Typography>
                        <Link className={classes.link} to={ROUTES.HOME}>
                            Home Page
                        </Link>
                        .
                    </ListItemText>
                </ListItem>
                <ListItem component="li">
                    <ListItemText>
                        <Typography component="span">
                            2. To make a new Request, go to{" "}
                        </Typography>
                        <Link className={classes.link} to={ROUTES.NEW_REQUEST}>
                            New Request Page
                        </Link>
                        <Typography component="span">
                            {" "}
                            and enter the necessary fields, upload necessary
                            documents/images.
                        </Typography>
                    </ListItemText>
                </ListItem>
                <ListItem component="li">
                    <ListItemText>
                        <Typography component="span">
                            3. Once you have made a request it will be visible
                            on the{" "}
                        </Typography>
                        <Link className={classes.link} to={ROUTES.MY_REQUESTS}>
                            My Requests page
                        </Link>
                        <Typography component="span">
                            . You can check the status there.
                        </Typography>
                    </ListItemText>
                </ListItem>
                <ListItem component="li">
                    <ListItemText>
                        <Typography component="span">
                            4. Volunteers will be assigned for every request and
                            they will provide all the necessary information and
                            help with the process.
                        </Typography>
                    </ListItemText>
                </ListItem>
                <ListItem component="li">
                    <ListItemText>
                        <Typography component="span">
                            5. Once the request is resolved, it'll be be removed
                            from the Requests page.
                        </Typography>
                    </ListItemText>
                </ListItem>
            </List>
        </>
    );
});
