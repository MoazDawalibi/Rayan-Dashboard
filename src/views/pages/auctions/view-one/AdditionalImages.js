import React from "react";
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import { useTranslation } from "utility/language";
import AdditionalImagesForm from "../forms/AdditionalImagesForm";
import { Formik, Form } from "formik";
import { ExistingImage } from "./ExistingImage";
import { LoadingButton } from "components/input/LoadingButton";
import { buildFormData } from "api/helpers";
import ProgressBar from "components/ProgressBar";
import AuthComponent from "components/AuthComponent";

import { MAX_NUMBER_OF_AUCTION_ADDITIONAL_IMAGES } from "configs/global";
const maxNumber = MAX_NUMBER_OF_AUCTION_ADDITIONAL_IMAGES;

const AdditionalImages = ({ auction, mutation }) => {
  const t = useTranslation();
  const [deletedImages, setDeletedImages] = React.useState([]);
  const [images, setImages] = React.useState([]);
  const resetRef = React.useRef(null);

  React.useEffect(() => {
    if (mutation.isSuccess) {
      resetRef.current.click();
      setDeletedImages([]);
      setImages([]);
    }
  }, [mutation.isSuccess]);

  const handleSubmit = (values) => {
    const delete_additional_images = {};
    deletedImages.forEach((id, index) => {
      delete_additional_images[index + 1] = {
        image_id: id,
      };
    });

    const dataToSend = {
      ...values,
      auction_id: auction.id,
      delete_additional_images,
    };

    const formData = new FormData();
    buildFormData(formData, dataToSend);
    mutation.mutate(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("additional_images")}</CardTitle>
      </CardHeader>
      <CardBody>
        <div className="d-flex flex-wrap">
          {auction.images.length === 0 && (
            <div
              className="d-flex w-100 align-items-center justify-content-center"
              style={{ height: "10rem" }}
            >
              <h3>{t("no_images")}</h3>
            </div>
          )}
          {auction.images.map((img) => (
            <ExistingImage
              key={img.id}
              image={img}
              deletedImages={deletedImages}
              onDelete={() => setDeletedImages((arr) => [...arr, img.id])}
            />
          ))}
        </div>
        <hr />
        <AuthComponent>
          <Formik
            onSubmit={handleSubmit}
            initialValues={{ auction_additional_images: [] }}
          >
            {(formik) => (
              <Form>
                {auction.images.length < maxNumber && (
                  <>
                    <h4>{t("add_new_images")}</h4>
                    <AdditionalImagesForm
                      images={images}
                      setImages={setImages}
                    />
                  </>
                )}

                <button
                  ref={resetRef}
                  type="reset"
                  style={{ display: "none" }}
                ></button>
                <ProgressBar
                  value={mutation.percentCompleted}
                  isLoading={mutation.isLoading}
                  isError={mutation.isError}
                  isSuccess={mutation.isSuccess}
                />
                <div className="d-flex justify-content-center align-items-center">
                  <LoadingButton
                    type="submit"
                    color="primary"
                    isLoading={mutation.isLoading}
                  >
                    {t("save")}
                  </LoadingButton>
                </div>
              </Form>
            )}
          </Formik>
        </AuthComponent>
      </CardBody>
    </Card>
  );
};

export default AdditionalImages;
