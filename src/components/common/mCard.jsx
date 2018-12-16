import React, { Component } from "react";
import { getCompanies } from "../../services/companyService";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  card: {
    maxWidth: 400,
    marginTop: 15,
    marginLeft: 15
  },
  avatar: {
    backgroundColor: red[500]
  },
  button: {
    margin: theme.spacing.unit
  }
});

class MCard extends Component {
  state = {
    companies: [],
    errors: {}
  };

  async componentDidMount() {
    const { data: companies } = await getCompanies();
    this.setState({ companies });
  }

  handleManage = id => {
    window.location = `/employees/${id}`;
  };

  render() {
    const { classes, name, phone, avatar, notes, id } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Google" className={classes.avatar}>
              {avatar}
            </Avatar>
          }
          title={name}
          subheader={phone}
        />
        <CardContent>
          <Typography component="p">{notes}</Typography>
        </CardContent>
        <CardActions>
          <Button
            className={classes.button}
            color="primary"
            size="small"
            onClick={() => this.handleManage(id)}
          >
            Manage
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(MCard);
