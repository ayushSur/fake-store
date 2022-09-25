import React, { useCallback, useEffect } from "react";
import "./Users.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUsers } from "../../Store/Actions/Admin";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

function Users() {
  const dispatch = useDispatch();
  const { push } = useHistory();
  const { userList, isLoading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  //Redirect to user details
  const handleRedirectToDetails = useCallback(
    (user) =>
      push({
        pathname: `/users/${user.login.uuid}`,
        state: { user },
      }),
    [push]
  );

  return (
    <div className="Users-container">
      <div className="header">
        <Typography variant="h5" component="h5">
          USERS
        </Typography>
      </div>
      {!isLoading && userList.length > 0 && (
        <TableContainer
          component={Paper}
          elevation={5}
          variant="elevation"
          square
        >
          <Table className="table" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>USER</TableCell>
                <TableCell>EMAIL</TableCell>
                <TableCell>CONTACT</TableCell>
                <TableCell>NATIONALITY</TableCell>
                <TableCell>DOB</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList.map((user) => (
                <TableRow key={user.login.uuid}>
                  <TableCell>
                    <div className="user-image-name">
                      <Avatar
                        component="span"
                        src={user.picture.thumbnail}
                        alt={user.name.first}
                      />
                      <Typography component="span">
                        {user.name.title}&nbsp;{user.name.first}&nbsp;
                        {user.name.last}
                      </Typography>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.cell} / {user.phone}
                  </TableCell>
                  <TableCell>{user.location.country}</TableCell>
                  <TableCell>
                    {new Date(user.dob.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleRedirectToDetails(user)}
                    >
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {isLoading && (
        <div className="loader">
          <CircularProgress />
        </div>
      )}
    </div>
  );
}

export default React.memo(Users);
