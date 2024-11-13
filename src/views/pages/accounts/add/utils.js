export const   convet_data_to_select =(array)=>{

    let new_array = []
    new_array = array.map(e =>({label:e.name , value:e.name}));
    return new_array
}