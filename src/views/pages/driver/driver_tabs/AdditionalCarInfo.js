import { baseURL } from 'api/config';
import ImagePreview from '../ImagePreview';
import { ValidatedField } from 'components/input';
import { useFormikContext } from 'formik';
import React from 'react'
import { Col, Row } from 'reactstrap'
import { useTranslation } from 'utility/language';
import { useImagePreview } from 'hooks';

function AdditionalCarInfo({images=[]}) {


  const t = useTranslation()
const formik = useFormikContext()
  const {preview:p8, handleImageChange:h8}= useImagePreview(baseURL+formik.getFieldProps('driver_image8')?.value)
  const {preview:p9, handleImageChange:h9}= useImagePreview(baseURL+formik.getFieldProps('driver_image9')?.value)
  const {preview:p10, handleImageChange:h10}= useImagePreview(baseURL+formik.getFieldProps('driver_image10')?.value)
  const {preview:p11, handleImageChange:h11}= useImagePreview(baseURL+formik.getFieldProps('driver_image11')?.value)
  const {preview:p12, handleImageChange:h12}= useImagePreview(baseURL+formik.getFieldProps('driver_image12')?.value)
  const {preview:p13 , handleImageChange:h13}= useImagePreview(baseURL+formik.getFieldProps('driver_image13')?.value)

  return (
    <Row xs={1} sm={1} md={1} lg={2} xl={2}>
      <Col>
      <ValidatedField

          name="car_type"
          label={t("car_type")}
          placeholder={t("car_type")}
          type="string"
          
          
        />
          <ValidatedField
          name="car_seat_count"
          label={t("car_seats_number")}
          placeholder={t("car_seats_number")}
          type="string"
          
          
        />
        <div  style={{margin:"10px" , opacity:0}} >.</div>
          <ValidatedField
          id="driver_image8"
          type="file"
          label={t("car_front_side_image")}
          name="driver_image8"
          accept="image/*"
          onChange={(e) => {
            h8(e);
            formik.setFieldValue("driver_image8", e.target.files[0]);
          }}
        />
        <ImagePreview preview={p8} id="8" />
        
      </Col>
      <Col>
      <ValidatedField
          name="car_model"
          label={t("car_model")}
          placeholder={t("car_model")}
          type="string"
          
          
        />
          <ValidatedField
          name="car_color"
          label={t("car_color")}
          placeholder={t("car_color")}
          type="string"
          
          
        />
        <div  style={{margin:"10px" , opacity:0}} >.</div>
          <ValidatedField
          id="driver_image9"
          type="file"
          label={t("car_back_side_image")}
          name="driver_image9"
          accept="image/*"
          onChange={(e) => {
            h9(e);
            formik.setFieldValue("driver_image9", e.target.files[0]);
          }}
        />
        <ImagePreview preview={p9}  id="9"/>
      </Col>
      <Col>
      <div  style={{margin:"10px" , opacity:0}} >.</div>
          <ValidatedField
          id="driver_image10"
          type="file"
          label={t("car_right_side_image")}
          name="driver_image10"
          accept="image/*"
          onChange={(e) => {
            h10(e);
            formik.setFieldValue("driver_image10", e.target.files[0]);
          }}
        />
        <ImagePreview preview={p10} id="10" />
        <div  style={{margin:"10px" , opacity:0}} >.</div>
          <ValidatedField
          id="driver_image11"
          type="file"
          label={t("car_internal_front_side_image")}
          name="driver_image11"
          accept="image/*"
          onChange={(e) => {
            h11(e);
            formik.setFieldValue("driver_image11", e.target.files[0]);
          }}
        />
        <ImagePreview preview={p11}  id="11"/>
        
      </Col>
      <Col>
      <div  style={{margin:"10px" , opacity:0}} >.</div>
          <ValidatedField
          id="driver_image12"
          type="file"
          label={t("car_left_side_image")}
          name="driver_image12"
          accept="image/*"
          onChange={(e) => {
            h12(e);
            formik.setFieldValue("driver_image12", e.target.files[0]);
          }}
        />
        <ImagePreview preview={p12}  id="13"/>
        <div  style={{margin:"10px" , opacity:0}} >.</div>
          <ValidatedField
          id="driver_image13"
          type="file"
          label={t("car_internal_back_side_image")}
          name="driver_image13"
          accept="image/*"
          onChange={(e) => {
            h13(e);
            formik.setFieldValue("driver_image13", e.target.files[0]);
          }}
        />
        <ImagePreview preview={p13}  id="13" />
       
      </Col>
    </Row>
  )
}

export default AdditionalCarInfo