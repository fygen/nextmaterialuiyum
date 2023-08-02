"use client"
import React from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { Button, Card, CardContent, Stack, TextField } from '@mui/material';

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
            <Card variant="outlined">
                  <CardContent>

                        <form onSubmit={handleSubmit(onSubmit)}>
                              <Stack spacing={2} sx={{ width: '100%' }}>
                                    <Controller
                                          name="name"
                                          control={control}
                                          defaultValue=""
                                          render={({ field }) => <TextField {...field} label="Name" />}
                                    />
                                    <Controller
                                          name="age"
                                          control={control}
                                          defaultValue={0}
                                          render={({ field }) => <TextField {...field} type="number" label="Age" />}
                                    />

                                    {fields.map((item, index) => (
                                          <div key={item.id}>
                                                <Stack direction="row" spacing={2}>
                                                      <Controller
                                                            name={`hobbies.${index}.name` as const}
                                                            control={control}
                                                            defaultValue=""
                                                            render={({ field }) => <TextField {...field} label={`Hobby ${index + 1}`} />}
                                                      />
                                                      <Button variant="outlined" onClick={() => remove(index)}>Remove</Button>
                                                </Stack>
                                          </div>
                                    ))}

                                    <Button variant="outlined" onClick={() => append({ name: '' })}>Add Hobby</Button>

                                    <Button variant="outlined" type="submit">Submit</Button>
                                    <Button variant="outlined" type="button" onClick={() => reset(defaultValues)}>
                                          Reset
                                    </Button>
                              </Stack>
                        </form>
                  </CardContent>
            </Card>
      );
};

export default MyForm;