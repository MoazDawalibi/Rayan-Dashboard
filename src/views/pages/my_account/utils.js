import * as Yup from "yup"
export const initialValues = (user,data) => {
    return {
        full_name: user?.full_name,
        email: user?.email,
        phone: user?.phone,
        password: user.password,
        password_confirmation:user.password,
        wallet:data

    }
}
const phoneRegExp = /^\+?\d+.{4,15}$/gm;
const nameRegExp = /^([^0-9]*)$/;

export const validationSchema = Yup.object({
    full_name: Yup.string().required("_required.name").matches(nameRegExp, "validation.invalid_name"),
    phone: Yup.string().required("_required.phone").matches(phoneRegExp, "validation.invalid_phone"),
    email: Yup.string()
        .email("_validation.invalid_email")
        .required("_required.email"),
    password_confirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], "validation.confirm_password")


})
