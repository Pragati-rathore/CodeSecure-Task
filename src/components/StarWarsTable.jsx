import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPeople } from "../store/features/peopleSlice";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableSortLabel,
  Box,
  Grid,
  Typography
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HelpIcon from "@mui/icons-material/Help";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { fetchItemDetails } from '../store/features/itemsSlice';
import RenderArrayCell from "./RenderArrayCell";
import HomeId from "./Homeid";
import StarShips from "./Starships";
import Vehicles from "./Vehicles";
import Species from "./Species";

const StyledTableCell = styled(TableCell)(({ theme , align}) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: align || 'center',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily:"Titillium Web",
    fontWeight:"bold",
    textAlign: align || 'center'
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
    
  },

  "&:last-child td, &:last-child th": {
    border: 0,
    textAlign:"center"
  },
}));

const StarWarsTable = () => {
  const dispatch = useDispatch();
  const people = useSelector((state) => state.people.people);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderDirection, setOrderDirection] = useState("asc");
  const [valueToOrderBy, setValueToOrderBy] = useState("name");
  const totalCount = useSelector((state) => state.people.total);
  const status = useSelector((state) => state.people.status);
  const nextPg = useSelector((state) => state.people.nextPg);
  const previousPg = useSelector((state) => state.people.previousPg);
  const [next ,setnext] = useState(null)



  const columns = [
    { id: "name", label: "Name" },
    { id: "height", label: "Height" },
    { id: "mass", label: "Mass" },
    { id: "eye_color", label: "Eye Color" },
    { id: "gender", label: "Gender" },
    { id: "hair_color", label: "Hair Color" },
    { id: "films", label: "Films" },
    { id: "skin_color", label: "Skin Color" },
   
    { id: "homeworld", label: "Homeworld" },
    { id: "starships", label: "Starships" },
    { id: "vehicles", label: "Vehicles" },
    { id: "species", label: "Species" },
  ];

  useEffect(() => {
    // dispatch(fetchPeople(page + 1));
    dispatch(fetchPeople(1)); 

  }, []);

  const handleRequestSort = (property) => {
    console.log(property);
    const isAscending = valueToOrderBy === property && orderDirection === "asc";
    setOrderDirection(isAscending ? "desc" : "asc");
    setValueToOrderBy(property);
  };

 
  const sortedItems = [...people].sort((a, b) => {
    let valueA = a[valueToOrderBy];
    let valueB = b[valueToOrderBy];

    if (!isNaN(parseFloat(valueA)) && !isNaN(parseFloat(valueB))) {
      valueA = parseFloat(valueA);
      valueB = parseFloat(valueB);
    }

    if (valueA < valueB) return orderDirection === "asc" ? -1 : 1;
    if (valueA > valueB) return orderDirection === "asc" ? 1 : -1;
    return 0;
  });

 
  const handleChangePage = ( event ,newPage) => {
    setPage(newPage); // newPage is zero-based
    dispatch(fetchPeople(newPage + 1)); 
  };
  
  const handleChangeRowsPerPage = (event , newPage) => {
    console.log("prev")
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    dispatch(fetchPeople(newPage+1 ));
  };

  const renderTextCell = (value) => value;

  
{/* <RenderArrayCell array={array} /> */}
 
// const renderArrayCell = (array) => {
//   //sconst dispatch = useDispatch();
//   //const itemsDetails = useSelector((state) => state.items.itemsDetails);

//   useEffect(() => {
//     array.forEach((itemId) => {
//       if (!itemsDetails[itemId]) {
//         dispatch(fetchItemDetails(itemId));
//       }
//     });
//   }, [array, dispatch, itemsDetails]);

//   return (
//     <ul style={{ listStyleType: "none", padding: 0 }}>
//       {array.map((itemId, index) => {
//         const itemDetails = itemsDetails[itemId];
//         const content = itemDetails ? itemDetails.name : "Loading..."; // Adjust according to your data structure
//         return <li key={index}>{content}</li>;
//       })}
//     </ul>
//   );}


  const renderSpeciesCell = (species) =>
    species.length > 0 ? <AccountCircleIcon /> : <HelpIcon />;


    function renderCellContent(id, data) {
      switch (id) {
        case "films":
          return <RenderArrayCell array={data} />;
        // case "species":
        //   return renderSpeciesCell(data); // Assuming this is a function returning JSX
        case "homeworld":
          return <HomeId array={data}/>;
          case "starships":
            return <StarShips array={data}/>;
            case "vehicles":
            return <Vehicles array={data}/>;
            case "species":
              return <Species array={data}/>;
        default:
          return renderTextCell(data); // Assuming this is a function returning JSX
      }
    }
    

  if (status === "loading") {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <FontAwesomeIcon icon={faSpinner} spin style={{ fontSize: "24px" }} />
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Loading...
        </Typography>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Failed to fetch data
        </Typography>
      </div>
    );
  }

  return (
    <>
      <Box p={2} >
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <StyledTableCell
                    key={index}
                    align="center"
                    // align={column.id === "name" ? "inherit" : "center"}
                  >
                    <TableSortLabel
                      active={valueToOrderBy === column.id}
                      direction={
                        valueToOrderBy === column.id ? orderDirection : "asc"
                      }
                      onClick={() => handleRequestSort(column.id)}
                      style={{
                        color:
                          valueToOrderBy === column.id
                            ? "rgb(80 145 226)"
                            : "inherit", 
                      }}
                      sx={{
                        color:
                          valueToOrderBy === column.id
                            ? "rgb(80, 145, 226)"
                            : "inherit", 
                        "&:hover": {
                          color: "rgb(80, 145, 226)",
                        },
                        "& .MuiTableSortLabel-icon": {
                          color:
                            valueToOrderBy === column.id
                              ? "rgb(80, 145, 226)"
                              : "inherit",
                        },
                      }}
                    >
                      {column.label}
                    </TableSortLabel>
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedItems
                
                .map((row, index) => (
                  <StyledTableRow key={index}>
                    {columns.map(({ id }) => (
                      <StyledTableCell
                      align="center"
                        key={id}
                        
                      >
                       {renderCellContent(id, row[id])}
                      </StyledTableCell>
                    ))}
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ marginTop: "20px" }}
        >
          <Box p={2}> 
           <TablePagination
         
          rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={-1} // Use totalCount for the total number of items
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </Box>
        
        </Grid>
      </Box>
    </>
  );
};

export default StarWarsTable
