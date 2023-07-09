import * as yup from 'yup'
import Lottie from 'lottie-react'
import { useFormik } from 'formik'
import styles from './styles.module.scss'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signUp } from '../../redux/slices/auth'
import ecommerce from '../../assets/lotties/ecommerce.json'
import React, { useState, useEffect, Fragment } from 'react'

const SignUp = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isValid, setIsValid] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const [viewPassword, setViewPassword] = useState(false)
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false)
  const [valuesSignUp, setValuesSignUp] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })

  const validateSchema = yup.object({
    email: yup
      .string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Enter a valid email address'
      )
      .required('E-mail is required'),
    password: yup.string().required('Password is required'),
    confirmPassword: yup
      .string()
      .required('Password is required')
      .oneOf([yup.ref('password')], 'Passwords do not match')
  })

  const formik = useFormik({
    enableReinitialize: isLoaded,
    initialValues: valuesSignUp,
    validationSchema: validateSchema,
    validate: values => validateValues(values),
    onSubmit: async (values, { resetForm }) => {
      dispatch(
        signUp(values.email, values.password, () => {
          resetForm()
          navigate('/ecommerce')
        })
      )
    }
  })

  const validateValues = (values, exception) => {
    Object.entries(values).some(value => {
      if (value[0] !== exception) {
        if (!value[1] || value[1] === '') {
          setIsValid(true)
          return true
        } else {
          setIsValid(false)
          return false
        }
      }
    })
  }

  useEffect(() => {
    setIsLoaded(true)
    setTimeout(() => {
      setIsLoaded(false)
    }, 2000)
  }, [])

  return (
    <Fragment>
      <div className={styles.container_sign_in}>
        <div className={styles.container_form}>
          <div className={styles.container_form_border}>
            <div className={styles.container_sign_up}>
              <p className={styles.text_sign_up}>
                I have an account!{' '}
                <span
                  onClick={() => {
                    navigate('/')
                  }}
                  className={styles.text_sign_up_link}
                >
                  Sign in
                </span>
              </p>
            </div>
            <div className={styles.container_sign_in_separate}>
              <h1 className={styles.title_sign_in}>Create your account</h1>
            </div>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
              className={styles.form_sign_in}
            >
              <div className={styles.container_relative}>
                <label htmlFor='email' className={styles.label_sign_in}>
                  Email
                </label>
                <input
                  id='email'
                  type='email'
                  placeholder='Enter your email'
                  {...formik.getFieldProps('email')}
                  value={formik.values.email}
                  onChange={e => {
                    formik.handleChange(e)
                    setValuesSignUp({ ...valuesSignUp, email: e.target.value })
                  }}
                  className={styles.input_sign_in}
                />
                <span className={`material-icons ${styles.icon_sign_in}`}>
                  person
                </span>
                {formik.touched.email && formik.errors.email && (
                  <span
                    className='errors-formik'
                    data-testid='error-message-email'
                  >
                    {formik.errors?.email}
                  </span>
                )}
              </div>
              <div className={styles.container_relative}>
                <label htmlFor='password' className={styles.label_sign_in}>
                  Password
                </label>
                <input
                  id='password'
                  type={viewPassword ? 'text' : 'password'}
                  placeholder='****************'
                  {...formik.getFieldProps('password')}
                  value={formik.values.password}
                  onChange={e => {
                    formik.handleChange(e)
                    setValuesSignUp({
                      ...valuesSignUp,
                      password: e.target.value
                    })
                  }}
                  className={styles.input_sign_in}
                />
                <span
                  className={`material-icons ${styles.icon_sign_in}`}
                  onClick={() => {
                    setViewPassword(!viewPassword)
                  }}
                >
                  {viewPassword ? 'visibility_off' : 'visibility'}
                </span>
              </div>
              <div className={styles.container_relative}>
                <label
                  htmlFor='confirmPassword'
                  className={styles.label_sign_in}
                >
                  Confirm Password
                </label>
                <input
                  id='confirmPassword'
                  type={viewConfirmPassword ? 'text' : 'password'}
                  placeholder='****************'
                  {...formik.getFieldProps('confirmPassword')}
                  value={formik.values.confirmPassword}
                  onChange={e => {
                    formik.handleChange(e)
                    setValuesSignUp({
                      ...valuesSignUp,
                      confirmPassword: e.target.value
                    })
                  }}
                  className={styles.input_sign_in}
                />
                <span
                  className={`material-icons ${styles.icon_sign_in}`}
                  onClick={() => {
                    setViewConfirmPassword(!viewConfirmPassword)
                  }}
                >
                  {viewConfirmPassword ? 'visibility_off' : 'visibility'}
                </span>
              </div>
              <button
                type='submit'
                disabled={isValid}
                className={`${styles.button_sign_in} ${
                  isValid && styles.isValid
                }`}
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
        <div className={styles.container_background}>
          <div className={styles.container_title_background}>
            <h1 className={styles.title_background}>
              Discover the perfect products for your lifestyle.
            </h1>
          </div>
          <Lottie
            animationData={ecommerce}
            className={styles.container_animation}
          />
        </div>
      </div>
    </Fragment>
  )
}

export default SignUp
