import React from 'react'
import {
  col12,
  col6,
  formControl,
  formControlTextarea,
  formItem,
} from '@components/contact/contact.css'
import { cx } from '@utils/cn'

interface ContactFormFieldProps {
  type: 'text' | 'email' | 'textarea'
  name: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  halfWidth?: boolean
}

export const ContactFormField: React.FC<ContactFormFieldProps> = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  halfWidth = false,
}) => {
  const widthClass = halfWidth ? col6 : col12

  return (
    <div className={cx(formItem, widthClass, 'padd-15')}>
      <div className="form-group">
        {type === 'textarea' ? (
          <textarea
            className={cx(formControl, formControlTextarea)}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
          ></textarea>
        ) : (
          <input
            type={type}
            className={formControl}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
          />
        )}
      </div>
    </div>
  )
}
