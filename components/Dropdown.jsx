import React, { PropTypes, Component } from 'react'
import classNamesBind from 'classnames/bind'
import styles from '@klarna/ui-css-components/src/components/input.scss'
import * as programmaticFocus from '../lib/features/programmaticFocus'
import * as fieldStates from '../lib/features/fieldStates'
import * as inlinedIcon from '../lib/features/inlinedIcon'
import { position, size } from '../lib/features/stacking'
import { handleKeyDown } from '../lib/features/keyboardEvents'

const classNames = classNamesBind.bind(styles)

export default class Dropdown extends Component {

  componentDidMount () {
    programmaticFocus.maybeFocus(document)(this.props.focus, this.refs.select)
  }

  componentDidUpdate () {
    programmaticFocus.maybeFocus(document)(this.props.focus, this.refs.select)
  }

  render () {
    const {
      big,
      centered,
      className,
      disabled,
      giant,
      icon,
      label,
      loading,
      onBlur,
      onChange,
      onClick,
      onFocus,
      options,
      square,
      value,
      ...props
    } = this.props

    const problem = props.error || props.warning
    const selectedOption = options.find((option) => String(option.value) === String(value))

    const classes = {
      dropdown: classNames('cui__dropdown--native', {
          'is-centered': centered,
          'is-loading': loading,
          'is-selected': value != null && value !== '',
          big,
          giant,
          square
        },
        fieldStates.getClassName(this.props),
        position.getClassName(this.props),
        programmaticFocus.getClassName(this.props),
        size.getClassName(this.props),
        className),
      label: classNames(problem ? 'cui__dropdown--native__floating-label' : 'cui__dropdown--native__label'),
      currentOption: classNames('cui__dropdown--native__current-option'),
      select: classNames('cui__dropdown--native__select')
    }

    return (
      <div
        className={classes.dropdown}
        onClick={onClick}
      >
        <label className={classes.label}>{label}</label>
        {
          value &&
          <div className={classes.currentOption}>{selectedOption.label}</div>
        }
        <select
          className={classes.select}
          defaultValue={value || ''}
          disabled={disabled}
          onBlur={onBlur}
          onChange={onChange || function () {}}
          onFocus={onFocus}
          onKeyDown={handleKeyDown(this.props)}
          ref='select'
          {...props}
        >
          {
            options.map(({value, label}) => {
              return (
                <option key={value} value={value}>
                  {label}
                </option>
              )
            })
          }
        </select>
      </div>
    )
  }
}

Dropdown.optionShape = PropTypes.shape({
  label: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired
})

Dropdown.propTypes = {
  big: PropTypes.bool,
  centered: PropTypes.bool,
  giant: PropTypes.bool,
  label: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  options: PropTypes.arrayOf(Dropdown.optionShape).isRequired,
  value: PropTypes.any,
  ...inlinedIcon.propTypes,
  ...fieldStates.propTypes,
  ...handleKeyDown.propTypes,
  ...position.propTypes,
  ...programmaticFocus.propTypes,
  ...size.propTypes
}

Dropdown.defaultProps = {
  big: false,
  centered: false,
  giant: false,
  loading: false,
  ...inlinedIcon.defaultProps,
  ...fieldStates.defaultProps,
  ...position.defaultProps,
  ...handleKeyDown.defaultProps,
  ...size.defaultProps
}
