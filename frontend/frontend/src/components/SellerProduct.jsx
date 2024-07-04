import React, { useState } from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { 
  Button, 
  FormControl, 
  FormLabel, 
  Input, 
  VStack, 
  HStack, 
  Text, 
  Image, 
  SimpleGrid,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Product name is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number().positive('Price must be positive').required('Price is required'),
  bulkPrices: Yup.array().of(
    Yup.object().shape({
      quantity: Yup.number().positive('Quantity must be positive').required('Quantity is required'),
      price: Yup.number().positive('Price must be positive').required('Price is required'),
    })
  ),
  minOrder: Yup.number().positive('Minimum order must be positive').required('Minimum order is required'),
  sizes: Yup.array().of(Yup.string()),
  images: Yup.array().of(Yup.mixed()).min(1, 'At least one image is required'),
});

const SellerProductForm = () => {
  const [previewImages, setPreviewImages] = useState([]);

  const initialValues = {
    name: '',
    description: '',
    price: '',
    bulkPrices: [{ quantity: '', price: '' }],
    minOrder: '',
    sizes: [''],
    images: [],
  };

  const handleSubmit = (values, { setSubmitting }) => {
    const formData = new FormData();
    Object.keys(values).forEach(key => {
      if (key === 'images') {
        values[key].forEach(image => formData.append('images', image));
      } else if (key === 'bulkPrices' || key === 'sizes') {
        formData.append(key, JSON.stringify(values[key]));
      } else {
        formData.append(key, values[key]);
      }
    });

    // Here you would typically send formData to your API
    console.log('Form data:', formData);
    setSubmitting(false);
  };

  const handleImageChange = (event, setFieldValue) => {
    const files = Array.from(event.currentTarget.files);
    setFieldValue('images', files);
    
    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, isSubmitting, setFieldValue }) => (
        <Form>
          <VStack spacing={4} align="stretch">
            <FormControl isInvalid={errors.name && touched.name}>
              <FormLabel htmlFor="name">Product Name</FormLabel>
              <Field as={Input} id="name" name="name" />
              <ErrorMessage name="name" component={Text} color="red.500" />
            </FormControl>

            <FormControl isInvalid={errors.description && touched.description}>
              <FormLabel htmlFor="description">Description</FormLabel>
              <Field as={Input} id="description" name="description" />
              <ErrorMessage name="description" component={Text} color="red.500" />
            </FormControl>

            <FormControl isInvalid={errors.price && touched.price}>
              <FormLabel htmlFor="price">Price</FormLabel>
              <Field as={NumberInput} id="price" name="price" min={0} precision={2}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </Field>
              <ErrorMessage name="price" component={Text} color="red.500" />
            </FormControl>

            <FormControl>
              <FormLabel>Bulk Prices</FormLabel>
              <FieldArray name="bulkPrices">
                {({ push, remove }) => (
                  <VStack align="stretch">
                    {values.bulkPrices.map((_, index) => (
                      <HStack key={index}>
                        <Field
                          as={NumberInput}
                          name={`bulkPrices.${index}.quantity`}
                          min={0}
                        >
                          <NumberInputField placeholder="Quantity" />
                        </Field>
                        <Field
                          as={NumberInput}
                          name={`bulkPrices.${index}.price`}
                          min={0}
                          precision={2}
                        >
                          <NumberInputField placeholder="Price" />
                        </Field>
                        <Button onClick={() => remove(index)}>Remove</Button>
                      </HStack>
                    ))}
                    <Button onClick={() => push({ quantity: '', price: '' })}>
                      Add Bulk Price
                    </Button>
                  </VStack>
                )}
              </FieldArray>
            </FormControl>

            <FormControl isInvalid={errors.minOrder && touched.minOrder}>
              <FormLabel htmlFor="minOrder">Minimum Order</FormLabel>
              <Field as={NumberInput} id="minOrder" name="minOrder" min={1}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </Field>
              <ErrorMessage name="minOrder" component={Text} color="red.500" />
            </FormControl>

            <FormControl>
              <FormLabel>Sizes</FormLabel>
              <FieldArray name="sizes">
                {({ push, remove }) => (
                  <VStack align="stretch">
                    {values.sizes.map((size, index) => (
                      <HStack key={index}>
                        <Field as={Input} name={`sizes.${index}`} />
                        <Button onClick={() => remove(index)}>Remove</Button>
                      </HStack>
                    ))}
                    <Button onClick={() => push('')}>Add Size</Button>
                  </VStack>
                )}
              </FieldArray>
            </FormControl>

            <FormControl isInvalid={errors.images && touched.images}>
              <FormLabel htmlFor="images">Product Images</FormLabel>
              <Input
                type="file"
                id="images"
                name="images"
                multiple
                onChange={(event) => handleImageChange(event, setFieldValue)}
              />
              <ErrorMessage name="images" component={Text} color="red.500" />
            </FormControl>

            {previewImages.length > 0 && (
              <SimpleGrid columns={3} spacing={4}>
                {previewImages.map((preview, index) => (
                  <Image key={index} src={preview} alt={`Preview ${index + 1}`} boxSize="100px" objectFit="cover" />
                ))}
              </SimpleGrid>
            )}

            <Button type="submit" colorScheme="blue" isLoading={isSubmitting}>
              Add Product
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default SellerProductForm;