import React from "react";
import ImageUploading from "react-images-uploading";
import { useFormikContext } from "formik";
import AddIcon from "@mui/icons-material/Add";
import "./index.css";
import { SingleImage } from "./SingleImage";
import { MAX_NUMBER_OF_AUCTION_ADDITIONAL_IMAGES } from "configs/global";

const dataUrl = "add_auctions_additional_images";
const maxNumber = MAX_NUMBER_OF_AUCTION_ADDITIONAL_IMAGES;

const AdditionalImagesForm = ({ images, setImages }) => {
  const formik = useFormikContext();

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);

    if (imageList.length === 0) {
      formik.setFieldValue("auction_additional_images", []);
      return;
    }

    //Delete Operation -- Do nothing because there is a handleDelete function
    if (addUpdateIndex === undefined) {
      return;
    }

    const formImages = formik.values.auction_additional_images;
    //Add Operation
    if (imageList.length > formImages.length) {
      const newImages = [...formImages];
      const numOfNewImages = addUpdateIndex.length;
      for (let i = 0; i < numOfNewImages; i++) {
        const img = imageList[formImages.length + i];
        newImages.push({
          additional_image: img.file,
          additional_image_sort: 1,
        });
      }
      formik.setFieldValue("auction_additional_images", newImages);
    }
    //Update Operation
    else if (imageList.length === formImages.length) {
      const newImages = formImages.map((img, index) => {
        if (addUpdateIndex.includes(index)) {
          return {
            ...img,
            additional_image: imageList[index].file,
          };
        } else {
          return img;
        }
      });
      formik.setFieldValue("auction_additional_images", newImages);
    }
  };

  const handleDelete = (index) => {
    formik.setFieldValue(
      "auction_additional_images",
      formik.values.auction_additional_images.filter((i, idx) => index !== idx)
    );
  };

  return (
    <ImageUploading
      value={images}
      onChange={onChange}
      maxNumber={maxNumber}
      dataURLKey={dataUrl}
      multiple
    >
      {({
        imageList,
        onImageUpload,
        onImageUpdate,
        onImageRemove,
        dragProps,
      }) => (
        <div className="py-1 d-flex flex-wrap" style={{ gap: "1.5em" }}>
          {imageList.map((image, index) => (
            <div key={index}>
              <SingleImage
                index={index}
                src={image[dataUrl]}
                onDelete={() => {
                  handleDelete(index);
                  onImageRemove(index);
                }}
                onEdit={() => onImageUpdate(index)}
              />
            </div>
          ))}
          {imageList.length < maxNumber && (
            <div
              style={{ justifyContent: "center" }}
              className="image-item cursor-pointer"
              {...dragProps}
              onClick={onImageUpload}
            >
              <AddIcon fontSize="large" />
            </div>
          )}
        </div>
      )}
    </ImageUploading>
  );
};

export default AdditionalImagesForm;
