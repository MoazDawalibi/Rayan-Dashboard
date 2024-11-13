import { baseURL } from 'api/config';
import ImagePreview from '../ImagePreview';
import { ValidatedField } from 'components/input';
import { useFormikContext } from 'formik';
import { useImagePreview } from 'hooks';
import React from 'react'
import { Col, Row } from 'reactstrap'
import { useTranslation } from 'utility/language';

function AdditionalDriverInfo({images=[]}) {


  const t = useTranslation()
  const formik = useFormikContext()



  const {preview:p1, handleImageChange:h1}= useImagePreview(baseURL+formik.getFieldProps('driver_image1')?.value)
  const {preview:p2, handleImageChange:h2}= useImagePreview(baseURL+formik.getFieldProps('driver_image2')?.value)
  const {preview:p3, handleImageChange:h3}= useImagePreview(baseURL+formik.getFieldProps('driver_image3')?.value)
  const {preview:p4, handleImageChange:h4}= useImagePreview(baseURL+formik.getFieldProps('driver_image4')?.value)
  const {preview:p5, handleImageChange:h5}= useImagePreview(baseURL+formik.getFieldProps('driver_image5')?.value)
  const {preview:p6, handleImageChange:h6}= useImagePreview(baseURL+formik.getFieldProps('driver_image6')?.value)
  const {preview:p7, handleImageChange:h7}= useImagePreview(baseURL+formik.getFieldProps('driver_image7')?.value)


  return (

    <Row xs={1} sm={1} md={1} lg={2} xl={2}>
      <Col>
      {/* <ValidatedField
          name="license_id"
          label={t("driver_license_number")}
          placeholder={t("driver_license_number")}
          type="string"
          
          required
        />
          <ValidatedField
          name="yearly_id"
          label={t("driver_yearly_id")}
          placeholder={t("driver_yearly_id")}
          type="string"
          
          required
        /> */}
        
        <div  style={{margin:"10px" , opacity:0}} >.</div>
        <ValidatedField
          id="driver_image1"
          type="file"
          label={t("driver_license_front_image")}
          name="driver_image1"
          accept="image/*"
          onChange={(e) => {
            h1(e);
            formik.setFieldValue("driver_image1", e.target.files[0]);
          }}
        />
        <ImagePreview id="1" preview={p1}  />
        
      </Col>
      <Col>
      {/* <ValidatedField
          name="nationality_id"
          label={t("driver_nationality_id")}
          placeholder={t("driver_nationality_id")}
          type="string"
          
          required
        />
          <ValidatedField
          name="residential_card_number"
          label={t("driver_residential_card_number")}
          placeholder={t("driver_residential_card_number")}
          type="string"
          
        /> */}
        <div  style={{margin:"10px" , opacity:0}} >.</div>
         <ValidatedField
          id="driver_image2"
          type="file"
          label={t("driver_license_back_image")}
          name="driver_image2"
          accept="image/*"
          onChange={(e) => {
            h2(e);
            formik.setFieldValue("driver_image2", e.target.files[0]);
          }}
        />
        <ImagePreview id="2" preview={p2}  />
      </Col>
      <Col>
      <div  style={{margin:"10px" , opacity:0}} >.</div>
         <ValidatedField
          id="driver_image3"
          type="file"
          label={t("driver_nationality_image_front")}
          name="driver_image3"
          accept="image/*"
          onChange={(e) => {
            h3(e);
            formik.setFieldValue("driver_image3", e.target.files[0]);
          }}
        />
        <ImagePreview id="3" preview={p3}  />
        <div  style={{margin:"10px" , opacity:0}} >.</div>
          <ValidatedField
          id="driver_image4"
          type="file"
          label={t("driver_yearly_image_front")}
          name="driver_image4"
          accept="image/*"
          onChange={(e) => {
            h4(e);
            formik.setFieldValue("driver_image4", e.target.files[0]);
          }}
        />
        <ImagePreview id="4" preview={p4} />
        <div  style={{margin:"10px" , opacity:0}} >.</div>
          <ValidatedField
          id="driver_image5"
          type="file"
          label={t("driver_residential_card_image")}
          name="driver_image5"
          accept="image/*"
          onChange={(e) => {
            h5(e);
            formik.setFieldValue("driver_image5", e.target.files[0]);
          }}
        />
        <ImagePreview id="5" preview={p5}  />
      </Col>
      <Col>
      <div  style={{margin:"10px" , opacity:0}} >.</div>
         <ValidatedField
          id="driver_image6"
          type="file"
          label={t("driver_nationality_image_back")}
          name="driver_image6"
          accept="image/*"
          onChange={(e) => {
            h6(e);
            formik.setFieldValue("driver_image6", e.target.files[0]);
          }}
        />
        <ImagePreview id="6" preview={p6}  />
        <div  style={{margin:"10px" , opacity:0}} >.</div>
          <ValidatedField
          id="driver_image7"
          type="file"
          label={t("driver_yearly_image_back")}
          name="driver_image7"
          accept="image/*"
          onChange={(e) => {
            h7(e);
            formik.setFieldValue("driver_image7", e.target.files[0]);
          }}
        />
        <ImagePreview id="7" preview={p7}  />
        <div  style={{margin:"10px" , opacity:0}} >.</div>
     
      </Col>
    </Row>
  )
}

export default AdditionalDriverInfo