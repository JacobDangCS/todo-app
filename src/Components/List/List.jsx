import { Pagination } from "@mantine/core";
import { useContext, useState } from 'react'
import { SettingsContext } from '../../Context/Settings';


const useStyles = createStyles((theme) => {
//Create Stylization of To Do cards
});

const List = ({list, toggleComplete, deleteItem}) => {

    const {classes} = useStyles();
    const {itemPage, showComplete} = useContext(SettingsContext);
    const [page, setPage] = useState();

}


//Set up Pagination

export default List;