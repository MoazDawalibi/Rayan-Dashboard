import React from "react";
import { Card, CardImg, CardBody, Input } from "reactstrap";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { useFormikContext } from "formik";
import { useTranslation } from "utility/language";

export const SingleImage = ({ src, onDelete, onEdit, index }) => {
  const t = useTranslation();
  const formik = useFormikContext();
  const images = formik.values.auction_additional_images;
  let thisImage = {};
  if (images && Array.isArray(images) && images.length > 0) {
    thisImage = images[index];
  }

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    formik.setFieldValue(
      "auction_additional_images",
      formik.values.auction_additional_images.map((img, idx) =>
        index !== idx
          ? img
          : {
              ...img,
              additional_image_sort: newSort,
            }
      )
    );
  };

  return (
    <Card
      style={{
        border: "1px solid lightgray",
        height: "300px",
        width: "300px",
      }}
    >
      <CardImg
        alt="slider"
        src={src}
        top
        style={{
          height: "150px",
          objectFit: "contain",
          maxWidth: "100%",
          padding: "0.5rem",
          paddingTop: "1rem",
        }}
      />
      <CardBody>
        <div className="mb-1">
          <label>{t("image_sort")}</label>
          <Input
            onChange={handleSortChange}
            value={thisImage?.additional_image_sort || ""}
            type="number"
            placeholder={t("image_sort")}
          />
        </div>
        <div className="d-flex justify-content-around align-items-center">
          <IconButton onClick={onEdit}>
            <EditIcon fontSize="large" />
          </IconButton>
          <IconButton onClick={onDelete}>
            <DeleteForeverIcon fontSize="large" />
          </IconButton>
        </div>
      </CardBody>
    </Card>
  );
};
