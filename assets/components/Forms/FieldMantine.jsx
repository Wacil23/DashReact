import { Input } from '@mantine/core'
import React from 'react'

function FieldMantine({ name, label, component, value, onChange, className='', type = "text", error = "", placeholder, togglePassword, mask='', loading }) {
    return (
      <div>
        <Input.Wrapper id={name} label={label} className={className} required>
            <Input id={name} type={type} component={component} placeholder={placeholder} value={value} onChange={onChange} mask={mask} />
        </Input.Wrapper>
    </div>
  )
}

export default FieldMantine