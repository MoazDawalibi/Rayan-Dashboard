import { CheckBox } from '@mui/icons-material';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

export const FancyCheckbox = ({name ,my_array, id}) => {
const handelChange = (vale)=>{

    my_array.push(id)
}
    return (
        <FormGroup>
        <FormControlLabel control={<Checkbox defaultChecked={false} onChange={handelChange} />} label={name}  />
      </FormGroup>
    )
}
  