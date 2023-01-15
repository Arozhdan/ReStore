import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";

interface IProps {
  items: string[];
  checked: string[];
  onChange: (items: string[]) => void;
}

export default function CheckboxButtons({ items, checked, onChange }: IProps) {
  const [checkedItems, setCheckedItems] = useState(checked || []);

  const handleChange = (value: string) => {
    const currentIndex = checkedItems.findIndex((item) => item === value);
    let newCheckedItems: string[] = [];
    if (currentIndex === -1) newCheckedItems = [...checkedItems, value];
    else newCheckedItems = checkedItems.filter((item) => item !== value);

    setCheckedItems(newCheckedItems);
    onChange(newCheckedItems);
  };

  return (
    <FormGroup>
      {items.map((item) => (
        <FormControlLabel
          key={item}
          control={
            <Checkbox
              checked={checked.indexOf(item) !== -1}
              onClick={() => handleChange(item)}
            />
          }
          label={item}
        />
      ))}
    </FormGroup>
  );
}
