import React from 'react'

const СontentSwitcher = ({ label, onChange, tooltip }) => (
  <div>
    {label && <span>{label}</span>}
    <input aria-label='switch' onChange={onChange} type='checkbox' />
    {tooltip && <span>{tooltip}</span>}
  </div>
)

export default СontentSwitcher
