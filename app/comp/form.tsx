"use client"
import React from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { Button, TextField } from '@mui/material';

interface Hobby {
  name: string;
}

interface FormData {
  name: string;
  age: number;
  hobbies: Hobby[];
}

const defaultValues: FormData = {
  name: '',
  age: 0,
  hobbies: [],
};

const MyForm: React.FC = () => {
  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'hobbies',
  });

  const onSubmit = (data: FormData) => {
    console.log(data); 
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field }) => <TextField id="filled-basic" {...field} label="Name" />}
      />
      <Controller
        name="age"
        control={control}
        defaultValue={0}
        render={({ field }) => <TextField id="standard-basic"  {...field} type="number" label="Age" />}
      />

      {fields.map((item, index) => (
        <div key={item.id}>
          <Controller
            name={`hobbies.${index}.name` as const}
            control={control}
            defaultValue=""
            render={({ field }) => <TextField {...field} label={`Hobby ${index + 1}`} />}
          />
          <Button onClick={() => remove(index)}>Remove</Button>
        </div>
      ))}

      <Button variant="outlined" onClick={() => append({ name: '' })}>Add Hobby</Button>

      <Button variant="outlined" type="submit">Submit</Button>
      <Button variant="outlined" type="button" onClick={() => reset(defaultValues)}>
        Reset
      </Button>
    </form>
  );
};

export default MyForm;