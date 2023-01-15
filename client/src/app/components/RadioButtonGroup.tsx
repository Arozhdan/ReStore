import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

interface IProps {
  options: { value: string; label: string }[];
  onChange: (event: any) => void;
  selectedValue: string;
}

export const RadioButtonGroup = ({
  options,
  onChange,
  selectedValue,
}: IProps) => {
  return (
    <FormControl>
      <RadioGroup onChange={onChange} value={selectedValue}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
