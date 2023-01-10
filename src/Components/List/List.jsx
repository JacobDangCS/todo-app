import { Pagination } from "@mantine/core";
import { useContext, useState } from 'react'
import { SettingsContext } from '../../Context/Settings';


// const useStyles = createStyles((theme) => {
// //Create Stylization of To Do cards
// });

const List = ({list, toggleComplete}) => {

    //const {classes} = useStyles();
    const {pageItems, showComplete} = useContext(SettingsContext);
    const [page, setPage] = useState(1);

    const listToRender = showComplete ? list : list.fitler(item => !item.complete);

    const listStart = pageItems * (page - 1);

    const listEnd = listStart + pageItems;

    const pageCount = Math.ceil(listToRender.length / pageItems);

    const displayList = listToRender.slice(listStart, listEnd);

    return (
        <>
        {displayList.map(item => (
            <div key={item.id}>
              <p>{item.text}</p>
              <p><small>Assigned to: {item.assignee}</small></p>
              <p><small>Difficulty: {item.difficulty}</small></p>
              <div onClick={() => toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
              <hr />
            </div>
          ))}

        <Pagination page={page} onChange={setPage} total={pageCount}/>  
        </>
    )
}


export default List;