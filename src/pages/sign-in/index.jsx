import * as yup from 'yup'
import Swal from 'sweetalert2'
import Lottie from 'lottie-react'
import { useFormik } from 'formik'
import styles from './styles.module.scss'
import { useNavigate } from 'react-router-dom'
import { signIn } from '../../redux/slices/auth'
import { useState, useEffect, Fragment } from 'react'
import ecommerce from '../../assets/lotties/ecommerce.json'

const SignIn = () => {
  const navigate = useNavigate()
  const [isValid, setIsValid] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const [viewPassword, setViewPassword] = useState(false)
  const [valuesSignIn, setValuesSignIn] = useState({
    email: '',
    password: '',
    remember: false
  })

  const validateSchema = yup.object({
    email: yup
      .string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please enter a valid email'
      )
      .required('Email is required')
  })

  const formik = useFormik({
    enableReinitialize: isLoaded,
    initialValues: valuesSignIn,
    validationSchema: validateSchema,
    validate: values => validateValues(values, 'remember'),
    onSubmit: async (values, { resetForm }) => {
      console.log(values)
      resetForm()
      await signIn(values.email, values.password)
        .then(() => {
          resetForm()
          navigate('/ecommerce')
        })
        .catch(error => {
          if (error.code === 'auth/wrong-password') {
            Swal.fire({
              timer: 1500,
              icon: 'error',
              title: 'Oops...',
              showConfirmButton: false,
              text: 'Incorrect e-mail or password'
            })
          } else {
            Swal.fire({
              timer: 1500,
              icon: 'error',
              title: 'Oops...',
              showConfirmButton: false,
              text: 'Could not sign in, try again'
            })
          }
        })
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
                I don&apos;t have an account!{' '}
                <span
                  onClick={() => {
                    navigate('/sign-up')
                  }}
                  className={styles.text_sign_up_link}
                >
                  Sign up
                </span>
              </p>
            </div>
            <div className={styles.container_sign_in_separate}>
              <h1 className={styles.title_sign_in}>Welcome to back</h1>
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
                    setValuesSignIn({ ...valuesSignIn, email: e.target.value })
                  }}
                  className={styles.input_sign_in}
                />
                <span className={`material-icons ${styles.icon_sign_in}`}>
                  person
                </span>
                {formik.touched.email && formik.errors.email && (
                  <span className='errors-formik'>{formik.errors?.email}</span>
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
                    setValuesSignIn({
                      ...valuesSignIn,
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
              <div className={styles.container_remember}>
                <div className={styles.container_input_remember}>
                  <input
                    id='remember'
                    type='checkbox'
                    {...formik.getFieldProps('remember')}
                    checked={formik.values.remember}
                    value={String(formik.values.remember)}
                    onChange={e => {
                      formik.handleChange(e)
                      setValuesSignIn({
                        ...valuesSignIn,
                        remember: e.target.checked
                      })
                    }}
                    className={styles.remember_checkbox}
                  />
                  <label htmlFor='remember' className={styles.text_sign_up}>
                    Recordarme
                  </label>
                </div>
                <div>
                  <span className={styles.text_sign_up_link}>
                    ¿Olvidaste tu contraseña?
                  </span>{' '}
                </div>
              </div>
              <button
                type='submit'
                disabled={isValid}
                className={`${styles.button_sign_in} ${
                  isValid && styles.isValid
                }`}
              >
                Sign in
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

export default SignIn
